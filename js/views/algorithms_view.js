var algorithmsView = function(sorter) {
  var that = {
    algors: [],

    drawAlgorithm: function(idx, algor){
      if(idx > 0){
        $('#algorithm_list').append(' &bull; ');
      }

      var link = $('#algorithm_list').append('<a href="#" class="algorithm-link" id="' + algor.id + '">' + algor.name + '</a>');

      link.on('click', '#' + algor.id, function(){
        window.sort.setAlgorithm(algor);
      });
    },

    unbind: function(idx, algor){
      $('#' + algor.id).off('click');
    },

    draw: function(){
      var args = Array.prototype.slice.call(arguments);
      var algors = args.slice(1);
      $.each(that.algors, that.unbind);
      $('#algorithm_list').empty();
      $.each(algors, that.drawAlgorithm);
      that.algors = algors;
    }
  };

  $.subscribe("sort:algorithm:new", that.draw);

  return that;
};
window.sort.views.push(algorithmsView());
