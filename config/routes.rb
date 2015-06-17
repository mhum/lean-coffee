Rails.application.routes.draw do
	match "sessions/:session_id/topics/remove_all", to: "topics#remove_all", via: [:post]
	match "sessions/:session_id/topics/:topic_id/up_vote", to: "topics#up_vote", via: [:post]
	match "sessions/:session_id/topics/:topic_id/down_vote", to: "topics#down_vote", via: [:post]
	
	resources :sessions do
		resources :topics
	end

	get 'welcome/index'

	root 'welcome#index'

end
