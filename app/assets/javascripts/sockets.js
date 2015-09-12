$(function() {
  // Instantiate a new WebSocketRails instance
  var dispatcher = new WebSocketRails(window.location.host + '/websocket');
  // Subscribe to channel
  var channel = dispatcher.subscribe('leanCoffee');

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
});
