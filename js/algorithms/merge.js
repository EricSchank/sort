var merge = function(){
  var that = {
    name: "Merge Sort",
    id: "merge_link",
    bestComplexity: "O( n log n )",
    avgComplexity: 'O( n log n )',
    worstComplexity: 'O( n log n )',
    source: 'https://github.com/EricSchank/sort/blob/master/js/algorithms/merge.js',

    i: 0,
    width: 1,

    updateFromWorking: function(){
      for(var x = 0; x < that.work.length; x += 1) {
        that.data[x] = that.work[x];
        $.publish("item:changed", [x, that.data[x]]);
      }
    },

    isFinished: function(){
      return (that.width >= that.data.length);
    },

    isIterationDone: function(){
      return (that.i >= that.data.length) && that.isInnerDone();
    },

    isInnerDone: function(){
      return (that.j >= that.end);
    },

    onInnerDone: function(init){
      that.right = Math.min(that.i + that.width, that.data.length);
      that.end = Math.min(that.i + 2 * that.width, that.data.length);
      that.one = that.i;
      that.two = that.right;
      that.j = that.i;
      if(!init){
        that.i += (2 * that.width);
      }
    },

    onIterationDone: function(){
      that.iterationDone = true;
      that.width *= 2;
      that.i = 0;
      that.updateFromWorking();

      that.stepCount += 1;
      $.publish("iteration:done");
      $.publish("sort:step:finished", that.stepCount);
    },

    merge: function(){
      if(that.one < that.right && (that.two >= that.end || that.data[that.one] <= that.data[that.two])){
        that.work[that.j] = that.data[that.one];
        that.one += 1;
      } else {
        that.work[that.j] = that.data[that.two];
        that.two += 1;
      }
      that.stepCount += 1;
      $.publish("sort:step:finished", that.stepCount);
      $.publish("item:changed", [that.j, that.work[that.j]]);
      that.j += 1;
    },

    step: function(){
      if(that.isFinished()) {
        that.onFinished();
        return true;
      }

      if(that.isIterationDone()) {
        that.onIterationDone();
        return false;
      } else {
        that.iterationDone = false;
      }

      if(that.isInnerDone()) {
        that.onInnerDone();
      }

      that.merge();

      return false;
    },

    setData: function(data) {
      that.data = data;
      that.work = data.slice(0);
      that.iterationDone = false;
      that.stepCount = 0;
      that.width = 1;
      that.i = 0;
      that.onInnerDone();
      $.publish("sort:reset", data);
    }
  };

  return _.extend(that, algorithm());
};
window.sort.registerAlgorithm(merge());
