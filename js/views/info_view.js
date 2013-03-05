var infoView = function(){
  var that = {
    draw: function(e, algorithm){
      $('#sort_name').html(algorithm.name);
      $('#best_complexity').html(algorithm.bestComplexity);
      $('#avg_complexity').html(algorithm.avgComplexity);
      $('#worst_complexity').html(algorithm.worstComplexity);
      $('#source_code').replaceWith('<a href="' + algorithm.source + '" id="source_code">Sample Source Code for ' + algorithm.name + '</a>');
    }
  };

  $.subscribe("sort:algorithm", that.draw);

  return that;
};
window.sort.views.push(infoView());
