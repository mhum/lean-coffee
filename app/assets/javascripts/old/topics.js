$(function() {
  $.fn.spin.presets.huge = {
    scale: 5
  }

  $.blockUI.defaults.message = null;
  $.blockUI.defaults.overlayCSS.cursor = 'default';
  $.blockUI.defaults.overlayCSS.opacity = 0.2;

  $(document).on("page:fetch", function(){
    $('body').block();
    $('body').spin('huge');
  });

  $(document).on("page:receive", function(){
    $('body').spin(false);
    $('body').unblock();
  });

  $("a.topic-option").click(function() {
   $("#topic-options").dropdown("toggle");
  });

  $(".editable-session").editable({
    placement: 'bottom',
    title: 'Update Title',
    pk: function() {
      return $(".topic-area").data("id");
    },
    url: function(params) {
      $.post( "/sessions/"+params.pk+"/update_title",params);
    },
    showbuttons: true
  });

  $(".topic-area" ).on("click", ".vote-up", upVote);
  $(".topic-area" ).on("click", ".vote-down", downVote);
  $(".topic-area" ).on("click", ".topic-remove", removeTopic);

  $("#add-topic").click(function (event) {
    $('body').block();
    $('body').spin('huge');
  });

  $("#remove-topics").click(function (event) {

  });

  addTopicListeners();
  addAreaListeners();
});

function upVote() {
  var topic = $(this).closest(".topic");

  if (topic.data("loading")) return;

  var session_id = topic.closest(".topic-area").data("id");
  var topic_id = topic.data("id");
  var votes_remaining = $(".votes-remaining").text();

  if (votes_remaining < 1)
    return

  addLoading(topic);
  $.post( "/sessions/"+session_id+"/topics/"+topic_id+"/up_vote",
    function(data){
        $(".votes-remaining").text(data.user_votes);
        $(".topic" ).closest('[data-id='+topic_id+']').find(".topic-votes").text(data.topic_votes);
        removeLoading(topic);
    });
}

function downVote() {
  var topic = $(this).closest(".topic");

  if (topic.data("loading")) return;

  var session_id = topic.closest(".topic-area").data("id");
  var topic_id = topic.data("id");
  var votes = parseInt(topic.find(".total-votes").text());
  var votes_remaining = $(".votes-remaining").text();
  var user_votes = parseInt(topic.find(".topic-votes").text());

  if (votes_remaining > 1) {
    return
  } else if (votes - 1 < 0) {
    return
  } else if (user_votes < 1) {
    return
  }

  addLoading(topic);
  $.post( "/sessions/"+session_id+"/topics/"+topic_id+"/down_vote",
    function(data){
        $(".votes-remaining").text(data.user_votes);
        $(".topic" ).closest('[data-id='+topic_id+']').find(".topic-votes").text(data.topic_votes);
        removeLoading(topic);
    });
}

function removeTopic() {
  var topic = $(this).closest(".topic");
  var session_id = topic.closest(".topic-area").data("id");
  var topic_id = topic.data("id");

  $.ajax({
    url: "/sessions/"+session_id+"/topics/"+topic_id,
    type: "DELETE"
  });
}

function addTopicListeners() {
  $(".topic").draggable({
    containment: ".topic-area",
    stack:       ".draggable",
    start: function (event, ui) {
      if ($(this).hasClass('dragging')) return false
      var topic = {
        id:      $(this).data("id"),
        session: $(".topic-area").data("id")
      }
      dispatcher.trigger('move_topic_start', topic);
    },
    drag: function (event, ui) {
      if ($(this).hasClass('dragging')) return false
      var coord = ui.position;
      var topic = {
        id:      $(this).data("id"),
        x:       coord.left,
        y:       coord.top,
        session: $(".topic-area").data("id")
      }
      dispatcher.trigger('move_topic', topic);
    },
    stop: function (event, ui) {
      if ($(this).hasClass('dragging')) return false
      var topic = {
        id:      $(this).data("id"),
        session: $(".topic-area").data("id")
      }
      dispatcher.trigger('move_topic_stop', topic);
    }
  });

  $(".editable-topic").editable({
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

  $('body').spin(false);
  $('body').unblock();
}

function addAreaListeners() {
  $(".todiscuss").droppable({
    hoverClass: "todiscuss-discussed-hover",
    drop: function(event, ui) {
      updateStage (event, ui, 'todiscuss')
    }
  });

  $(".discussing").droppable({
    hoverClass: "discussing-hover",
    drop: function(event, ui) {
      updateStage (event, ui, 'discussing')
    }
  });

  $(".discussed").droppable({
    hoverClass: "todiscuss-discussed-hover",
    drop: function(event, ui) {
      updateStage (event, ui, 'discussed')
    }
  });
}

function updateStage(event, ui, area) {
  var topic_id = ui.draggable.data("id");
  var session_id = ui.draggable.closest(".topic-area").data("id");
  var coord = ui.position;

  $.post( "/sessions/"+session_id+"/topics/"+topic_id+"/update_stage",
    {'stage':area, 'x':coord.left, 'y':coord.top});
}

function addLoading(el) {
  el.block();
  el.spin({'shadow':true});
}

function removeLoading(el) {
  el.unblock();
  el.spin(false);
}