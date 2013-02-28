function sort($, data) {
  var data = (typeof data === 'undefined' ? [] : data);
  var that = {
    algorithm: {},
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
      if(that.algorithm && typeof that.algorithm.data !== 'undefined'){
        that.algorithm.setData(data);
      }
      // $(that.container).find('.bar').removeClass('settled');
      that.checkDone();
      that.draw();
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

    setContainer: function(container){
      that.container = $(container);
    },

    draw: function(container){
      var c = (typeof container === 'undefined' ? $(that.container) : $(container));
      c.empty();
      for(var i = 0; i < data.length; i += 1) {
        var settled = '';
        if(typeof that.algorithm !== 'undefined' && typeof that.algorithm.isSettled !== 'undefined' && that.algorithm.isSettled(i)){
          settled = 'settled';
        }
        c.append('<div class="bar ' + settled + '" style="width: ' + (data[i] * 2 * that.expand) + 'em;">' + data[i] + '</div>');
      }
      if(typeof that.algorithm.stepCount !== 'undefined'){
        $('#step_count').html(that.algorithm.stepCount);
      }
    },

    setAlgorithm: function(algorithm){
      that.algorithm = algorithm;
      that.algorithm.setData(data);
      $('#sort_name').html(algorithm.name);
      $('#best_complexity').html(algorithm.bestComplexity);
      $('#avg_complexity').html(algorithm.avgComplexity);
      $('#worst_complexity').html(algorithm.worstComplexity);
      $('#source_code').replaceWith('<a href="' + algorithm.source + '" id="source_code">Sample Source Code for ' + algorithm.name + '</a>');
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


var s = window.sort = sort(jQuery, []);
s.setContainer('#container');
s.init();
// s.algorithm(bubble());
s.setAlgorithm(insertion());
s.draw();
jQuery('#step_link').on('click', s.step);
jQuery('#iter_link').on('click', s.iteration);
jQuery('#run_link').on('click', s.run);

jQuery('#random_link').on('click', s.randomize);
jQuery('#best_link').on('click', s.best);
jQuery('#worst_link').on('click', s.worst);

jQuery('#bubble_link').on('click', function(){s.setAlgorithm(bubble());});
jQuery('#gnome_insertion_link').on('click', function(){s.setAlgorithm(gnomeInsertion());});
jQuery('#insertion_link').on('click', function(){s.setAlgorithm(insertion());});
