class SocketsController < WebsocketRails::BaseController

	# Start move topic around screen
	def move_topic_start
		WebsocketRails[(message[:session]).to_s.to_sym].trigger(:move_topic_start, message)
	end

	# Move topic around screen
	def move_topic
		WebsocketRails[(message[:session]).to_s.to_sym].trigger(:move_topic, message)
	end
	# Stop move topic around screen
	def move_topic_stop
		WebsocketRails[(message[:session]).to_s.to_sym].trigger(:move_topic_stop, message)
	end
end