function sort($, data) {
  var data = (typeof data === 'undefined' ? [] : data);
  var that = {
    algorithm: null,
    finished: false,
    interval: 250,
    entireSort: false,
    rowCount: 10,
    expand: 3,

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
      if(typeof that.algorithm.data !== 'undefined'){
        that.algorithm.setData(data);
      }
      // $(that.container).find('.bar').removeClass('settled');
      that.checkDone();
      that.draw();
    },

    randomize: function(){
      var max = that.rowCount * that.expand;
      that.newDataSet(function(i){
        return Math.floor((Math.random() * max) + 1);
      });
    },

    best: function(){
      that.newDataSet(function(i){ 
        return i * that.expand; 
      });
    },

    worst: function(){
      that.newDataSet(function(i){ 
        return (that.rowCount - i) * that.expand; 
      });
    },

    values: function(){
      return data;
    },

    setContainer: function(container){
      that.container = $(container);
    },

    draw: function(container){
      var c = (typeof container === 'undefined' ? $(that.container) : $(container));
      c.empty();
      var settled = that.algorithm.max;
      for(var i = 0; i < data.length; i += 1) {
        c.append('<div class="bar ' + (i >= settled ? 'settled' : '') + '" style="width: ' + (data[i] * 2) + 'em;"></div>');
      }
    },

    algorithm: function(algorithm){
      that.algorithm = algorithm;
      that.algorithm.setData(data);
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
      that.draw();
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

  return that;
};

var bubble = function(){
  var that = {
    idx: 0,
    max: 0,
    iterationDone: false,
    data: [],

    swap: function(left, right) {
      var temp = that.data[right];
      that.data[right] = that.data[left];
      that.data[left] = temp;
    },

    resetIteration: function() {
      that.iterationDone = false;
    },

    step: function(){
      if(that.max <= 1) {
        that.iterationDone = true;
        return true;
      }

      if(that.idx >= that.max) {
        that.idx = 0;
        that.max -= 1;
        that.iterationDone = true;
        return false;
      } else {
        that.iterationDone = false;
      }

      if(that.data[that.idx] > that.data[that.idx + 1]) {
        that.swap(that.idx, that.idx + 1);
      }

      that.idx += 1;

      return false;
    },

    setData: function(data) {
      this.data = data;
      this.iterationDone = false;
      this.max = data.length;
      this.idx = 0;
    }
  };  

  return that;
};

var s = window.sort = sort(jQuery, []);
s.setContainer('#container');
s.init();
s.algorithm(bubble());
s.draw();
jQuery('#step_link').on('click', s.step);
jQuery('#iter_link').on('click', s.iteration);
jQuery('#run_link').on('click', s.run);
jQuery('#random_link').on('click', s.randomize);
jQuery('#best_link').on('click', s.best);
jQuery('#worst_link').on('click', s.worst);

