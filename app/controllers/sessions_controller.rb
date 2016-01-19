class SessionsController < ApplicationController
	def index
		@sessions = Session.all

		render json: @sessions
	end

	def new
		@session = Session.new
		@session.title = Date.current.to_s(:month_day_and_year)
		@session.save

		@session.timers.create

		redirect_to @session
	end

	def show
		@session = Session.find(params[:id])

		if (!session[:user])
			session[:user] = {:uuid     => UUIDTools::UUID.random_create.to_s,
							  :sessions => []}
		end

		session[:user].symbolize_keys!
		session_info = session[:user][:sessions].select { |s| s["id"] == @session.id.to_i }

		if (!session_info.empty?)
			@votes = session_info.first["votes"]
		else
			session[:user][:sessions].push({id: @session.id.to_i, votes:2})
			@votes = 2
		end
	end

	def update_title
		session = Session.find(params[:session_id])
		session.title = params[:value]
		session.save

		WebsocketRails[(params[:session_id]).to_sym].trigger 'update_description_session', params[:value]

		render :nothing => true
	end

	def destroy
		Session.destroy(params[:id])

		WebsocketRails[(params[:id]).to_sym].trigger 'delete_session'

		render :nothing => true
	end

	def remove_all
		Session.find(params[:id]).topics.destroy_all

		WebsocketRails[(params[:id]).to_sym].trigger 'remove_all_topics'

		render :nothing => true
	end

	def new_from_existing
		topics = Session.find(params[:id]).topics.where(:stage => 'todiscuss')

		@session = Session.new
		@session.title = Date.current.to_s(:month_day_and_year)
		@session.save

		topics.each { |t|
			Topic.create(t.attributes.merge({
				id: nil,
				session: @session
			}))
		}
		@session.timers.create

		redirect_to @session
	end
end
