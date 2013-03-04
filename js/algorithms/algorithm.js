var algorithm = function(){
  var that = {
    lastSwap: 0,
    iterationDone: false,
    data: [],
    stepCount: 0,

    swap: function(left, right) {
      var temp = this.data[right];
      this.data[right] = this.data[left];
      this.data[left] = temp;
      this.lastSwap = right;
      $.publish("item:swapped", [left, right]);
    },

    resetIteration: function() {
      this.iterationDone = false;
      $.publish("iteration:reset");
    },

    onFinished: function(){
      this.iterationDone = true;
      $.publish("iteration:done");
      $.publish("sort:finished");
    },
  };  

  return that;
};
