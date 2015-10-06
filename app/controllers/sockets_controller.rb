class SocketsController < WebsocketRails::BaseController

	# Move topic around screen
	def move_topic
		WebsocketRails[(message[:session]).to_s.to_sym].trigger(:move_topic, message)
	end
end