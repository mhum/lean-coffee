class TimerController < ApplicationController
	def status
		timer_end_time = Rails.cache.read('timer_end_time')
		timer_running = false

		if timer_end_time > (Time.now.to_f * 1000).to_i
			timer_running = true
		else
			timer_end_time = (Time.now.to_f * 1000).to_i + Rails.cache.read('timer_start_seconds')
		end
		status = {timer_running: timer_running,
				  timer_end_time: timer_end_time}
		render json: status
	end
end
