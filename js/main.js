function sort($, data) {
  var data = (typeof data === 'undefined' ? [] : data);
  var that = {
    algorithm: {},
    algors: [],
    finished: false,
    interval: 250,
    entireSort: false,
    rowCount: 10,
    expand: 3,
    views: [],

    clearTimer: function(){
      if(that.timer){
        window.clearInterval(that.timer);
        that.timer = undefined;
      }
      if(that.algorithm && that.algorithm.resetIteration) {
        that.algorithm.resetIteration();
      }
      that.checkDone();
    },

    newDataSet: function(generateItem){
      that.clearTimer();
      that.finished = false;
      data = [];
      for(var i = 0; i < that.rowCount; i += 1){
        data.push(generateItem(i));
      }
      if(that.algorithm && typeof that.algorithm.data !== 'undefined'){
        that.algorithm.setData(data);
      }
      // $(that.container).find('.bar').removeClass('settled');
      that.checkDone();
    },

    randomize: function(){
      var max = that.rowCount;
      that.newDataSet(function(i){
        return Math.floor((Math.random() * max) + 1);
      });
    },

    best: function(){
      that.newDataSet(function(i){ 
        return (i + 1);
      });
    },

    worst: function(){
      that.newDataSet(function(i){ 
        return (that.rowCount - i); 
      });
    },

    values: function(){
      return data;
    },

    registerAlgorithm: function(algor){
      if(that.algors.length == 0){
        that.setAlgorithm(algor);
      }
      that.algors.push(algor);
      that.algorithmsView.draw();
    },

    registerListeners: function(){
      jQuery('#step_link').on('click', that.step);
      jQuery('#iter_link').on('click', that.iteration);
      jQuery('#run_link').on('click', that.run);

      jQuery('#random_link').on('click', that.randomize);
      jQuery('#best_link').on('click', that.best);
      jQuery('#worst_link').on('click', that.worst);
    },

    setContainer: function(container){
      that.container = $(container);
      $.publish("sort:reset", data);
      that.barsView = barsView(that, container);
      that.algorithmsView = algorithmsView(that);
      that.registerListeners();
      that.init();
    },

    isSettled: function(i){
      return (typeof that.algorithm !== 'undefined' && 
              typeof that.algorithm.isSettled !== 'undefined' && 
              that.algorithm.isSettled(i));
    },

    draw: function(drawBars){
      // if(drawBars){
      //   that.barsView.draw(data);
      // }
      that.algorithmsView.draw();
    },

    setAlgorithm: function(algorithm){
      that.algorithm = algorithm;
      that.algorithm.setData(data);
      $.publish("sort:algorithm", algorithm);
    },

    checkDone: function(){
      var c = $(that.container);
      if(that.finished){
        c.addClass("done");
      } else {
        c.removeClass("done");
      }
    },

    reset: function(){
      that.init();
      that.finished = false;
      that.checkDone();
      that.algorithm.setData(data);
    },

    step: function(){
      that.finished = that.algorithm.step();
      that.draw();
      that.checkDone();
      if(((that.algorithm.iterationDone && !that.entireSort) || that.finished) && typeof that.timer !== 'undefined'){
        that.clearTimer();
      }
      return that.finished;
    },

    iteration: function(){
      that.entireSort = false;
      that.timer = window.setInterval(that.step, that.interval);
    },

    run: function(){
      that.entireSort = true;
      that.timer = window.setInterval(that.step, that.interval);
    },

    sort: function(algorithm){
      while(!that.finished) {
        that.step();
      }
      that.checkDone();
    }

  };

  that.init = that.worst;

  window.sort = that;
  return that;
};


var s = window.sort = sort(jQuery, []);
s.setContainer('#container');
