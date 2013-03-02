var barsView = function(sorter, container) {
  return {
    container: (typeof container === 'undefined' ? $(sorter.container) : $(container)),
    draw: function(data){
      this.container.empty();
      for(var i = 0; i < data.length; i += 1) {
        var settled = sorter.isSettled(i) ? 'settled' : '';
        this.container.append('<div class="bar ' + settled + '" style="width: ' + (data[i] * 2 * sorter.expand) + 'em;">' + data[i] + '</div>');
      }
    }
  };
};