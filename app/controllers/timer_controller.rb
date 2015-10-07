class TimerController < ApplicationController
	# Return status of timer
	def status
		timer = Session.find(params[:session_id]).timers.first

		timer_end_time = timer[:timer_end_time]
		timer_seconds_left = timer[:timer_seconds_left]
		timer_status = timer[:timer_status]

		if timer_status.eql? 'reset'
			timer_end_time = (Time.now.to_f * 1000).to_i + timer[:timer_start_seconds]
		elsif timer_status.eql? 'pause'
			timer_end_time = (Time.now.to_f * 1000).to_i + timer_seconds_left
		elsif timer_end_time < (Time.now.to_f * 1000).to_i
			timer_end_time = (Time.now.to_f * 1000).to_i + timer[:timer_start_seconds]
			timer_status = 'reset'
		end

		status = {timer_status:   timer_status,
				  timer_end_time: timer_end_time}
		render json: status
	end

	# Start countdown timer
	def start

		# Determine end time
		timer = Session.find(params[:session_id]).timers.first

		fin = (Time.now.to_f * 1000).to_i + timer[:timer_start_seconds]
		timer[:timer_end_time] = fin
		timer[:timer_status] ='start'
		timer.save

		# Broadcast end time
		WebsocketRails[(params[:session_id]).to_sym].trigger(:start_timer, fin)

		render :nothing => true
	end

	# Pause countdown timer
	def pause

		# Determine end time
		timer = Session.find(params[:session_id]).timers.first

		end_time = timer[:timer_end_time]
		time_left = end_time - (Time.now.to_f * 1000).to_i
		timer[:timer_seconds_left] = time_left
		timer[:timer_status] ='start'
		timer.save

		# Broadcast pause event
		WebsocketRails[(params[:session_id]).to_sym].trigger(:pause_timer)

		render :nothing => true
	end

	# Resume Countdown timer
	def resume

		# Determine new end time
		timer = Session.find(params[:session_id]).timers.first

		fin = (Time.now.to_f * 1000).to_i + timer[:timer_seconds_left]
		timer[:timer_end_time] = fin
		timer[:timer_status] ='start'
		timer.save

		# Reset time left
		timer[:timer_seconds_left] = 0
		timer.save

		# Broadcast end time
		WebsocketRails[(params[:session_id]).to_sym].trigger(:resume_timer, fin)

		render :nothing => true
	end

	# Reset Countdown Timer
	def reset

		# Determine end time
		timer = Session.find(params[:session_id]).timers.first

		fin = (Time.now.to_f * 1000).to_i + timer[:timer_start_seconds]
		timer[:timer_end_time] = fin
		timer[:timer_status] ='reset'
		timer.save

		# Reset time left
		timer[:timer_seconds_left] = 0
		timer.save

		# Broadcast end time
		WebsocketRails[(params[:session_id]).to_sym].trigger(:reset_timer, fin)

		render :nothing => true
	end

	def update
		timer = Session.find(params[:session_id]).timers.first

		a = [1000, 60000]
		ms = params[:time].split(':').map{ |time| time.to_i * a.pop}.inject(&:+)
		timer[:timer_start_seconds] = ms.to_i

		# Determine end time
		fin = (Time.now.to_f * 1000).to_i + ms
		timer[:timer_end_time] = fin
		timer[:timer_status] ='reset'

		# Reset time left
		timer[:timer_seconds_left] = 0
		timer.save

		# Broadcast end time
		WebsocketRails[params[:session_id]].trigger(:reset_timer, fin)

		render :nothing => true
	end
end
