WebsocketRails::EventMap.describe do
  subscribe :move_topic,   'sockets#move_topic'
  subscribe :start_timer,  'sockets#start_timer'
  subscribe :pause_timer,  'sockets#pause_timer'
  subscribe :resume_timer, 'sockets#resume_timer'
  subscribe :reset_timer,  'sockets#reset_timer'
end
