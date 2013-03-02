var countView = function(sorter) {
  return {
    draw: function(){
      if(typeof sorter.algorithm.stepCount !== 'undefined'){
        $('#step_count').html(sorter.algorithm.stepCount);
      }
    }
  };
};
