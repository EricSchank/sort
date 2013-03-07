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
      return (that.i >= that.data.length);
    },

    onIterationDone: function(){
      that.iterationDone = true;
      that.width *= 2;
      that.i = 0;
      that.updateFromWorking();

      // that.data[that.slot] = that.val;
      // that.i += 1;
      // that.val = that.data[that.i];
      // that.slot = that.i;
      that.stepCount += 1;
      $.publish("iteration:done");
      $.publish("sort:step:finished", that.stepCount);
      // $.publish("item:progress", that.slot - 1);
    },

    merge: function(right, end){
      var one = that.i;
      var two = right;
      for(var j = that.i; j < end; j += 1){
        if(one < right && (two >= end || that.data[one] <= that.data[two])){
          that.work[j] = that.data[one];
          one += 1;
        } else {
          that.work[j] = that.data[two];
          two += 1;
        }
        that.stepCount += 1;
        $.publish("sort:step:finished", that.stepCount);
      }
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

      that.merge(Math.min(that.i + that.width, that.data.length), Math.min(that.i + 2 * that.width, that.data.length));

      // that.swap(that.slot, that.slot - 1);
      // $.publish("item:progress", that.slot - 1);
      // that.data[that.slot] = that.data[that.slot - 1];
      // that.slot -= 1;

      that.i += (2 * that.width);

      that.stepCount += 1;
      $.publish("sort:step:finished", that.stepCount);

      return false;
    },

    setData: function(data) {
      that.data = data;
      that.work = data.slice(0);
      that.iterationDone = false;
      that.stepCount = 0;
      that.width = 1;
      that.i = 0;
      $.publish("sort:reset", data);
    }
  };

  return _.extend(that, algorithm());
};
window.sort.registerAlgorithm(merge());
