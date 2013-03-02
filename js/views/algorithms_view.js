var algorithmsView = function(sorter) {
  return {
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
      $.each(sorter.algors, this.unbind);
      $('#algorithm_list').empty();
      $.each(sorter.algors, this.drawAlgorithm);
    }
  };
};