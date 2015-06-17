$(function() {
  $("#add-topic").click(function () {
    var session_id = $(".topic-area").data("id");

    $(".to-discuss").append(
      $("<div>").load('/sessions/'+session_id+'/topics/new', addTopicListeners)
    );
  });

  $("#clear-topics").click(removeTopics);

  $(".topic-area" ).on("click", ".vote-up", upVote);
  $(".topic-area" ).on("click", ".vote-down", downVote);

  addTopicListeners();
});

function upVote() {
  var topic = $(this).closest(".topic");
  var session_id = topic.closest(".topic-area").data("id");
  var topic_id = topic.data("id");

  $.post( "/sessions/"+session_id+"/topics/"+topic_id+"/up_vote", function(data) {
      var votes = topic.find(".votes");
      var votes_int = parseInt(votes.text());
      votes.text(votes_int + 1);
  });
}

function downVote() {
  var topic = $(this).closest(".topic");
  var session_id = topic.closest(".topic-area").data("id");
  var topic_id = topic.data("id");
  var votes = topic.find(".votes");
  var votes_int = parseInt(votes.text());

  if (votes_int - 1 < 0) {
    return
  }  

  $.post( "/sessions/"+session_id+"/topics/"+topic_id+"/down_vote", function(data) {
      votes.text(votes_int - 1);
  });
}

function removeTopics() {
  var session_id = $(".topic-area").data("id");

  $.post( "/sessions/"+session_id+"/topics/remove_all", function(data) {
      $(".draggable" ).remove();
  }); 
}

function addTopicListeners() {
  $(".topic").draggable({
    containment: ".topic-area",
    stack:       ".draggable"
  });

  $(".editable").editable({
    type: 'textarea',
    title: 'Update Description',
    pk: function() {
      return $(this).closest(".topic").data("id");
    },
    url: function(params) {
      var session_id = $(this).closest(".topic-area").data("id");

      $.post( "/sessions/"+session_id+"/topics/"+params.pk+"/update_description",params);
    },   
    showbuttons: true
  });
}