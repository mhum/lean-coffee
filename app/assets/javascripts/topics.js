$(function() {
	$("#add-topic").click(function () {
	$(".to-discuss").append('<div class="ui-widget-content draggable"><a href="#" class="editable">Enter descrption</a></div>');
      $( ".draggable" ).draggable({
  		containment: ".drag-area",
  		stack: ".draggable"
  	});
  	$( ".editable" ).editable();
  });

$("#clear-topics").click(function () {
      $( ".draggable" ).remove();
  });
});