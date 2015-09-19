class SocketsController < WebsocketRails::BaseController
	
	# Move topic around screen
	def move_topic
		WebsocketRails[:leanCoffee].trigger(:move_topic, message)
	end

	# Start countdown timer
	def start_timer
		puts 'START'

		# Determine end time
		fin = (Time.now.to_f * 1000).to_i + Rails.cache.read('timer_start_seconds')
		Rails.cache.write('timer_end_time',fin)

		# Broadcast end time
		WebsocketRails[:leanCoffee].trigger(:start_timer, fin)
	end

	def pause_timer
		puts 'PAUSE'

		end_time = Rails.cache.read('timer_end_time')
		time_left = end_time - (Time.now.to_f * 1000).to_i
		Rails.cache.write('timer_seconds_left',time_left)

		# Broadcast pause event
		WebsocketRails[:leanCoffee].trigger(:pause_timer)
	end

	def resume_timer
		puts 'RESUME'

		# Determine new end time
		fin = (Time.now.to_f * 1000).to_i + Rails.cache.read('timer_seconds_left')
		Rails.cache.write('timer_end_time',fin)

		# Reset time left
		Rails.cache.write('timer_seconds_left',0)

		# Broadcast end time
		WebsocketRails[:leanCoffee].trigger(:resume_timer, fin)
	end

	def reset_timer
		puts 'RESET'

		# Determine end time
		fin = (Time.now.to_f * 1000).to_i + Rails.cache.read('timer_start_seconds')
		Rails.cache.write('timer_end_time',fin)

		# Reset time left
		Rails.cache.write('timer_seconds_left',0)

		# Broadcast end time
		WebsocketRails[:leanCoffee].trigger(:reset_timer, fin)
	end
end