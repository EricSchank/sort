var insertion = function(){
  var that = {
    name: "Insertion Sort",
    id: "insertion_link",
    bestComplexity: "O( n )",
    avgComplexity: 'O( n<span class="superscript">2</span> )',
    worstComplexity: 'O( n<span class="superscript">2</span> )',
    source: 'https://github.com/EricSchank/sort/blob/master/js/algorithms/insertion.js',

    i: 1,
    slot: 1,
    iterationDone: false,
    data: [],
    stepCount: 0,

    swap: function(left, right) {
      var temp = that.data[right];
      that.data[right] = that.data[left];
      that.data[left] = temp;
    },

    isSettled: function(index) {
      return (index < that.i - 1);
    },

    resetIteration: function() {
      that.iterationDone = false;
    },

    isFinished: function(){
      return (that.i >= that.data.length);
    },

    onFinished: function(){
      that.iterationDone = true;
    },

    isIterationDone: function(){
      return (that.slot <= 0 || that.val >= that.data[that.slot - 1]);
    },

    onIterationDone: function(){
      that.data[that.slot] = that.val;
      that.iterationDone = true;
      that.i += 1;
      that.val = that.data[that.i];
      that.slot = that.i;
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
        that.iterationDone = false;
      }

      that.data[that.slot] = that.data[that.slot - 1];
      that.slot -= 1;

      that.stepCount += 1;

      return false;
    },

    setData: function(data) {
      this.data = data;
      this.iterationDone = false;
      this.stepCount = 0;
      this.i = 1;
      this.val = this.data[this.i];
      this.slot = this.i;
    }
  };

  return that;
};
window.sort.registerAlgorithm(insertion());
