$(document).ready(function() {
  $('#bubble').click(function(e) {
    e.preventDefault();
    $("#main").load('bubble-chart.html');
    });
});
