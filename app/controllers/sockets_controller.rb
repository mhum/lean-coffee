class SocketsController < WebsocketRails::BaseController
	
	# Move topic around screen
	def move_topic
		WebsocketRails[:leanCoffee].trigger(:move_topic, message)
	end

	# Start countdown timer
	def start_timer
		
		# Determine end time
		fin = (Time.now.to_f * 1000).to_i + Rails.cache.read('timer_start_seconds')
		Rails.cache.write('timer_end_time',fin)
		Rails.cache.write('timer_status','start')

		# Broadcast end time
		WebsocketRails[:leanCoffee].trigger(:start_timer, fin)
	end

	# Pause countdown timer
	def pause_timer
		
		# Determine end time
		end_time = Rails.cache.read('timer_end_time')
		time_left = end_time - (Time.now.to_f * 1000).to_i
		puts time_left
		Rails.cache.write('timer_seconds_left',time_left)
		Rails.cache.write('timer_status','pause')

		# Broadcast pause event
		WebsocketRails[:leanCoffee].trigger(:pause_timer)
	end

	# Resume Countdown timer
	def resume_timer
		
		# Determine new end time
		fin = (Time.now.to_f * 1000).to_i + Rails.cache.read('timer_seconds_left')
		Rails.cache.write('timer_end_time',fin)
		Rails.cache.write('timer_status','start')

		# Reset time left
		Rails.cache.write('timer_seconds_left',0)

		# Broadcast end time
		WebsocketRails[:leanCoffee].trigger(:resume_timer, fin)
	end

	# Reset Countdown Timer
	def reset_timer
		
		# Determine end time
		fin = (Time.now.to_f * 1000).to_i + Rails.cache.read('timer_start_seconds')
		Rails.cache.write('timer_end_time',fin)
		Rails.cache.write('timer_status','reset')

		# Reset time left
		Rails.cache.write('timer_seconds_left',0)

		# Broadcast end time
		WebsocketRails[:leanCoffee].trigger(:reset_timer, fin)
	end
end