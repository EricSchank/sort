var gnomeInsertion = function(){
  var that = {
    name: "Gnome-Insertion Sort",
    id: "gnome_insertion_link",
    bestComplexity: 'O( n<span class="superscript">2</span> )',
    avgComplexity: 'O( n<span class="superscript">2</span> )',
    worstComplexity: 'O( n<span class="superscript">2</span> )',
    source: 'https://github.com/EricSchank/sort/blob/master/js/algorithms/gnome-insertion.js',

    x: 0,
    min: 0,
    y: 0,
    lastSwap: 0,
    iterationDone: false,
    data: [],
    stepCount: 0,

    swap: function(left, right) {
      var temp = that.data[right];
      that.data[right] = that.data[left];
      that.data[left] = temp;
    },

    isSettled: function(index) {
      return (index < that.x);
    },

    resetIteration: function() {
      that.iterationDone = false;
    },

    isFinished: function(){
      return (that.x >= that.data.length);
    },

    onFinished: function(){
      that.iterationDone = true;
    },

    isIterationDone: function(){
      return (that.y >= that.data.length);
    },

    onIterationDone: function(){
      that.swap(that.min, that.x);
      that.x += 1;
      that.iterationDone = true;
      that.y = that.x;
      that.min = that.x;
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

      if(that.data[that.min] > that.data[that.y]) {
        that.min = that.y;
      }

      that.y += 1;
      that.stepCount += 1;

      return false;
    },

    setData: function(data) {
      this.data = data;
      this.iterationDone = false;
      this.min = 0;
      this.x = 0;
      this.stepCount = 0;
      this.y = 0;
    }
  };  

  return that;
};
window.sort.registerAlgorithm(gnomeInsertion());
