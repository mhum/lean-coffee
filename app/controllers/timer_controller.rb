class TimerController < ApplicationController
	def status
		timer_end_time = Rails.cache.read('timer_end_time')
		timer_seconds_left = Rails.cache.read('timer_seconds_left')
		timer_running = false

		if (timer_end_time > (Time.now.to_f * 1000).to_i) && (timer_seconds_left == 0)
			timer_running = true
		else
			additional_time = timer_seconds_left != 0 ? timer_seconds_left : Rails.cache.read('timer_start_seconds')
			timer_end_time = (Time.now.to_f * 1000).to_i + additional_time
		end
		status = {timer_running: timer_running,
				  timer_end_time: timer_end_time}
		render json: status
	end

	def update
		a = [1000, 60000]
		ms = params[:time].split(':').map{ |time| time.to_i * a.pop}.inject(&:+)
		Rails.cache.write('timer_start_seconds', ms.to_i)

		# Determine end time
		fin = (Time.now.to_f * 1000).to_i + ms

		# Reset time left
		Rails.cache.write('timer_seconds_left',0)

		# Broadcast end time
		WebsocketRails[:leanCoffee].trigger(:reset_timer, fin)

		render :nothing => true
	end
end
