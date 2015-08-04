class SessionsController < ApplicationController
	def index
		@sessions = Session.all
	end
	
	def new
		@session = Session.new
		@session.title = Date.current.to_s(:month_day_and_year)
		@session.save
		
		redirect_to @session
	end

	def show
		@session = Session.find(params[:id])

		@todiscuss  = []
		@discussing = []
		@discussed  = []
		
		@session.topics.each do |topic|
			if topic.todiscuss?
				@todiscuss.push(topic)
			elsif topic.discussing?
				@discussing.push(topic)
			elsif topic.discussed?
				@discussed.push(topic)
			end
		end
	end

	def update_title
		session = Session.find(params[:session_id])
		session.title = params[:value]
		session.save

		render :nothing => true
	end
end
