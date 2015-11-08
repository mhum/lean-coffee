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
		session[:user].symbolize_keys!
		user_votes = session[:user][:sessions]
			.select { |s| s["id"] == params[:session_id].to_i }
			.first["votes"]

		if (user_votes < 1)
			render :nothing => true
			return
		end

		topic = Topic.find(params[:topic_id])
		topic.votes.create(:uuid => session[:user][:uuid])

		WebsocketRails[(params[:session_id]).to_sym].trigger 'vote_topic', [params[:topic_id], topic.votes.size]

		user_votes = session[:user][:sessions]
				.select { |s| s["id"] == params[:session_id].to_i }
				.first["votes"] -= 1

		topic_votes = topic.votes.where(:uuid => session[:user][:uuid]).size

		render :json => {:user_votes  => user_votes,
						 :topic_votes => topic_votes}
	end

	def down_vote
		session[:user].symbolize_keys!
		user_votes = session[:user][:sessions]
			.select { |s| s["id"] == params[:session_id].to_i }
			.first["votes"]

		if (user_votes > 1)
			render :nothing => true
			return
		end

		total_votes = Topic.find(params[:topic_id]).votes.size

		if ( total_votes - 1 < 0)
			render :json => {:votes => 0}
			return
		end

		topic = Topic.find(params[:topic_id])
		topic.votes.where(uuid: session[:user][:uuid]).take.destroy
		total_votes -= 1

		WebsocketRails[(params[:session_id]).to_sym].trigger 'vote_topic', [params[:topic_id], total_votes]

		user_votes = session[:user][:sessions]
			.select { |s| s["id"] == params[:session_id].to_i }
			.first["votes"] += 1

		topic_votes = topic.votes.where(:uuid => session[:user][:uuid]).size

		render :json => {:user_votes  => user_votes,
						 :topic_votes => topic_votes}
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
