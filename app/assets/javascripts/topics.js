$(function() {
  $("#add-topic").click(function () {
    $(".to-discuss").append(
      $("<div>").load('/topic/new', function() {
        var topic = $(this);
        topic.draggable({
      		containment: ".drag-area",
      		stack:       ".draggable"
      	});
      	topic.find(".editable").editable();
        topic.find(".vote-up").click(function() {
            var votes = topic.find(".votes");
            var votes_int = parseInt(votes.text());
            votes.text(votes_int + 1);
        });
        topic.find(".vote-down").click(function() {
            var votes = topic.find(".votes");
            var votes_int = parseInt(votes.text());
            if (votes_int - 1 >= 0) {
              votes.text(votes_int - 1);
            }
        });
      })
    );
  });

  $("#clear-topics").click(function() {
      $( ".draggable" ).remove();
  });
});