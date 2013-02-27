var bubble = function(){
  var that = {
    name: "Bubble Sort",
    bestComplexity: "O( n )",
    avgComplexity: 'O( n<span class="superscript">2</span> )',
    worstComplexity: 'O( n<span class="superscript">2</span> )',
    
    idx: 0,
    max: 0,
    lastSwap: 0,
    iterationDone: false,
    data: [],
    stepCount: 0,

    swap: function(left, right) {
      var temp = that.data[right];
      that.data[right] = that.data[left];
      that.data[left] = temp;
      that.lastSwap = right;
    },

    isSettled: function(index) {
      return (index >= that.max);
    },

    resetIteration: function() {
      that.iterationDone = false;
    },

    isFinished: function(){
      return (that.max <= 1);
    },

    onFinished: function(){
      that.iterationDone = true;
    },

    isIterationDone: function(){
      return (that.idx >= that.max);
    },

    onIterationDone: function(){
      that.idx = 0;
      that.max = that.lastSwap;
      that.lastSwap = 0;
      that.iterationDone = true;
    },

    onIterationInProg: function(){
      that.iterationDone = false;
    },

    onStepDone: function(){
      that.idx += 1;
      that.stepCount += 1;
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
        that.onIterationInProg();
      }

      if(that.data[that.idx] > that.data[that.idx + 1]) {
        that.swap(that.idx, that.idx + 1);
      }

      that.onStepDone();

      return false;
    },

    setData: function(data) {
      this.data = data;
      this.iterationDone = false;
      this.max = data.length;
      this.idx = 0;
      this.stepCount = 0;
      this.lastSwap = 0;
    }
  };  

  return that;
};