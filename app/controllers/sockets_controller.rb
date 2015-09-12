class SocketsController < WebsocketRails::BaseController
	def move_topic
		WebsocketRails[:leanCoffee].trigger(:move_topic, message)
	end
end