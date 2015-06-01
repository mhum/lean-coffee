class SessionsController < ApplicationController
	def index
		@sessions = Session.all
	end
	def new
		@session = Session.new
		@session.save
		
		redirect_to @session
	end

	def show
		@session = Session.find(params[:id])
	end
end
