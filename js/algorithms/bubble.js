var bubble = function(){
  var that = {
    name: "Bubble Sort",
    id: "bubble_link",
    bestComplexity: "O( n )",
    avgComplexity: 'O( n<span class="superscript">2</span> )',
    worstComplexity: 'O( n<span class="superscript">2</span> )',
    source: 'https://github.com/EricSchank/sort/blob/master/js/algorithms/bubble.js',
    
    idx: 0,
    max: 0,

    isFinished: function(){
      return (that.max <= 1);
    },

    isIterationDone: function(){
      return (that.idx >= that.max);
    },

    onIterationDone: function(){
      that.idx = 0;
      that.max = that.lastSwap;
      that.lastSwap = 0;
      that.iterationDone = true;
      $.publish("iteration:done");
      $.publish("item:settled", that.max);
    },

    onIterationInProg: function(){
      that.iterationDone = false;
    },

    onStepDone: function(){
      that.idx += 1;
      that.stepCount += 1;
      $.publish("sort:step:finished", that.stepCount);
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

      $.publish("item:progress", that.idx + 1);
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
      $.publish("sort:reset", data);
    }
  };  

  return _.extend(that, algorithm());
};
window.sort.registerAlgorithm(bubble());
