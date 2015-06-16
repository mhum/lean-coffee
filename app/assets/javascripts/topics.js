$(function() {
  $("#add-topic").click(function () {
    $(".to-discuss").append(
      $("<div>").load('/sessions/'+session_id+'/topics/new', addTopicListeners)
    );
  });
  $("#clear-topics").click(function() {
      $(".draggable" ).remove();
  });


  $(".topic-area" ).on("click", ".vote-up", upVote);
  $(".topic-area" ).on("click", ".vote-down", downVote);

  addTopicListeners();
});

function upVote() {
    var votes = $(this).closest(".topic").find(".votes");
    var votes_int = parseInt(votes.text());
    votes.text(votes_int + 1);
}

function downVote() {
  var votes = $(this).closest(".topic").find(".votes");
  var votes_int = parseInt(votes.text());
  if (votes_int - 1 >= 0) {
    votes.text(votes_int - 1);
  } 
}

function addTopicListeners() {
  $(".topic").draggable({
    containment: ".topic-area",
    stack:       ".draggable"
  });

  $(".editable").editable();
}