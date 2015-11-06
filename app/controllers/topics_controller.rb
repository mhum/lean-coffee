class TopicsController < ApplicationController
	def new
		@session = Session.find(params[:session_id])
		topic = @session.topics.create(:votes => 0,
									   :description => 'Enter description',
									   :color => Topic.colors.keys.sample,
									   :stage => "todiscuss")

		WebsocketRails[(params[:session_id]).to_sym].trigger 'new_topic',
			render_to_string(:file => "topics/show", :layout => false, :locals => {:topic => topic})

		render :nothing => true
	end

	def destroy
		Topic.find(params[:id]).destroy

		WebsocketRails[(params[:session_id]).to_sym].trigger 'remove_topic', params[:id]

		render :nothing => true
	end

	def up_vote
		user_votes = session[:user]["sessions"]
			.select { |s| s["id"] == params[:session_id].to_i }
			.first["votes"]

		if (user_votes < 1)
			render :nothing => true
			return
		end

		topic = Topic.find(params[:topic_id])
		topic.votes += 1
		topic.save

		votes = session[:user]["sessions"]
				.select { |s| s["id"] == params[:session_id].to_i }
				.first["votes"] -= 1

		WebsocketRails[(params[:session_id]).to_sym].trigger 'vote_topic', [params[:topic_id], topic.votes]

		render :json => {:votes => votes}
	end

	def down_vote
		user_votes = session[:user]["sessions"]
			.select { |s| s["id"] == params[:session_id].to_i }
			.first["votes"]

		if (user_votes > 1)
			render :nothing => true
			return
		end

		topic = Topic.find(params[:topic_id])

		if ( topic.votes - 1 < 0)
			render :nothing => true
			return
		end

		topic.votes -= 1
		topic.save

		votes = session[:user]["sessions"]
			.select { |s| s["id"] == params[:session_id].to_i }
			.first["votes"] += 1

		WebsocketRails[(params[:session_id]).to_sym].trigger 'vote_topic', [params[:topic_id], topic.votes]

		render :json => {:votes => votes}
	end

	def update_description
		topic = Topic.find(params[:topic_id])
		topic.description = params[:value]
		topic.save

		WebsocketRails[(params[:session_id]).to_sym].trigger 'update_description_topic', [params[:topic_id], params[:value]]

		render :nothing => true
	end

	def update_stage
		topic = Topic.find(params[:topic_id])

		topic.stage   = params[:stage]
		topic.stage_x = params[:x]
		topic.stage_y = params[:y]
		topic.save

		render :nothing => true
	end
end
