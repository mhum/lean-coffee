$(function() {
  // Instantiate a new WebSocketRails instance
  dispatcher = new WebSocketRails(window.location.host + '/websocket');
  // Subscribe to channel
  channel = dispatcher.subscribe('leanCoffee');

  // New topic
  channel.bind('new_topic', function(data) {
    $(".todiscuss").append(data);
    addTopicListeners();
  })

  // Remove topic
  channel.bind('remove_topic', function(data) {
    $(".topic" ).closest('[data-id='+data+']').remove();
  })

  // Remove all topics
  channel.bind('remove_all_topics', function(data) {
    $(".topic" ).remove();
  })

  // Up/Down Vote
  channel.bind('vote_topic', function(data) {
    var topic = $(".topic" ).closest('[data-id='+data[0]+']')
    topic.find(".votes").text(data[1]);
  })

  // Update Topic Description
  channel.bind('update_description_topic', function(data) {
    $(".topic" )
      .closest('[data-id='+data[0]+']')
      .find('.editable-topic')
      .editable('setValue', data[1], true);
  })

  // Drag topic
  channel.bind('move_topic', function(data) {
    var topic = $(".topic" ).closest('[data-id='+data.id+']')
    if (!topic.hasClass('dragging')) {
      topic.css({
        left: data.x + "px",
        top: data.y + "px"
      });
    }
  })

  // Update Timer
  channel.bind('start_timer', function(data) {
    $('#countdown-clock').countdown(data, function(event) {
        $('#countdown-clock').html(event.strftime('%M:%S'));
    });

    updateTimerBtns('start');
  })

  // Pause Timer
  channel.bind('pause_timer', function(data) {
    $('#countdown-clock').countdown('pause');
    
    updateTimerBtns('pause');
  })

  // Resume Timer
  channel.bind('resume_timer', function(data) {
    $('#countdown-clock').countdown(data, function(event) {
        $('#countdown-clock').html(event.strftime('%M:%S'));
    });

    updateTimerBtns('resume');
  })

  // Reset Timer
  channel.bind('reset_timer', function(data) {
    $('#countdown-clock').countdown(data, function(event) {
        $('#countdown-clock').html(event.strftime('%M:%S'));
    });

    $('#countdown-clock').countdown('pause');

    updateTimerBtns('reset');
  })

});
