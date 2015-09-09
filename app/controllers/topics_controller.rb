class TopicsController < ApplicationController
	def new
		@session = Session.find(params[:session_id])
		topic = @session.topics.create(:votes => 0, 
									   :description => 'Enter description',
									   :color => Topic.colors.keys.sample,
									   :stage => "todiscuss")
		
		WebsocketRails[:leanCoffee].trigger 'new_topic', 
			render_to_string(:file => "topics/show", :layout => false, :locals => {:topic => topic})

		render :nothing => true
	end

	def destroy
		Topic.find(params[:id]).destroy

		render :nothing => true
	end

	def remove_all
		Session.find(params[:session_id]).topics.destroy_all

		WebsocketRails[:leanCoffee].trigger 'remove_all_topics'

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

	def update_stage
		topic = Topic.find(params[:topic_id])
		if topic.stage != params[:stage]
			topic.stage = params[:stage]
			topic.save
		end

		render :nothing => true
	end
end
