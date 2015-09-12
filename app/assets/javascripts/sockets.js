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
});
