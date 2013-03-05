var countView = function() {
  var that = {
    draw: function(e, count){
      if(e.type === "sort:reset"){
        count = 0;
      }
      $('#step_count').html(count);
    }
  };

  $.subscribe("sort:step:finished", that.draw);
  $.subscribe("sort:reset", that.draw);

  return that;
};
window.sort.views.push(countView());
