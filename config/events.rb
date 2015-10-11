WebsocketRails::EventMap.describe do
  subscribe :move_topic_start,   'sockets#move_topic_start'
  subscribe :move_topic,         'sockets#move_topic'
  subscribe :move_topic_stop,    'sockets#move_topic_stop'
end
