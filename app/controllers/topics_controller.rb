class TopicsController < ApplicationController
	def new
		@session = Session.find(params[:session_id])
		topic = @session.topics.create(:votes => 0, 
									   :description => 'Enter description',
									   :color => Topic.colors.keys.sample)
		
		render :file => "topics/show", :layout => false, :locals => {:topic => topic}
	end

	def destroy
		Topic.find(params[:id]).destroy

		render :nothing => true
	end

	def remove_all
		Session.find(params[:session_id]).topics.destroy_all

		render :nothing => true
	end

	def up_vote
		topic = Topic.find(params[:topic_id])
		topic.votes += 1
		topic.save

		render :nothing => true
	end

	def down_vote
		topic = Topic.find(params[:topic_id])
		topic.votes -= 1
		topic.save

		render :nothing => true
	end

	def update_description
		topic = Topic.find(params[:topic_id])
		topic.description = params[:value]
		topic.save

		render :nothing => true
	end
end
