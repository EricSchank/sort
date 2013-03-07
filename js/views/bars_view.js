var barsView = function(sorter, container) {
  var that = {
    container: (typeof container === 'undefined' ? $(sorter.container) : $(container)),

    itemWidth: function(value){
      return (value * 2 * sorter.expand) + 'em';
    },

    drawItem: function(value){
      return '<div class="bar" style="width: ' + that.itemWidth(value) +'">' + value + '</div>';
    },

    draw: function(){
      var args = Array.prototype.slice.call(arguments);
      var data = args.slice(1);
      that.container.empty();
      for(var i = 0; i < data.length; i += 1) {
        that.container.append(that.drawItem(data[i]));
      }
    },

    itemSwapped: function(e, left, right){
      var leftItem = $(".bar").slice(left, (left + 1));
      var rightItem = $(".bar").slice(right, (right + 1));
      var leftVal = leftItem.html();
      var rightVal = rightItem.html();
      leftItem.html(rightVal);
      leftItem.css('width', that.itemWidth(rightVal));
      rightItem.html(leftVal);
      rightItem.css('width', that.itemWidth(leftVal));
    },

    itemChanged: function(e, idx, newVal){
      var item = $(".bar").slice(idx, (idx + 1));
      item.replaceWith(that.drawItem(newVal));
    },

    itemProgress: function(e, item){
      $(".item-progress").removeClass("item-progress");
      $(".bar").slice(item, (item + 1)).addClass("item-progress");
    },

    sortFinished: function(){
      $(".item-progress").removeClass("item-progress");
      $(".bar").addClass("settled");
    },

    itemSettled: function(e, item){
      $(".bar").slice(item, (item + 1)).addClass("settled");
    }
  };

  $.subscribe("item:progress", that.itemProgress);
  $.subscribe("item:swapped", that.itemSwapped);
  $.subscribe("item:changed", that.itemChanged);
  $.subscribe("item:settled", that.itemSettled);
  $.subscribe("sort:finished", that.sortFinished);
  $.subscribe("sort:reset", that.draw);
  return that;
};