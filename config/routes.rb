Rails.application.routes.draw do
	match "sessions/:session_id/topics/remove_all", to: "topics#remove_all", via: [:post]
	match "sessions/:session_id/topics/:topic_id/up_vote", to: "topics#up_vote", via: [:post]
	match "sessions/:session_id/topics/:topic_id/down_vote", to: "topics#down_vote", via: [:post]
	match "sessions/:session_id/topics/:topic_id/update_description", to: "topics#update_description", via: [:post]
	match "sessions/:session_id/topics/:topic_id/update_stage", to: "topics#update_stage", via: [:post]

	match "sessions/:session_id/update_title", to: "sessions#update_title", via: [:post]

	match "timer/:session_id/status",  to: "timer#status", via: [:get]
	match "timer/:session_id/start",   to: "timer#start",  via: [:post]
	match "timer/:session_id/pause",   to: "timer#pause",  via: [:post]
	match "timer/:session_id/resume",  to: "timer#resume", via: [:post]
	match "timer/:session_id/reset",   to: "timer#reset",  via: [:post]
	match "timer/:session_id/update",  to: "timer#update", via: [:post]

	resources :sessions do
		member do
			post 'remove_all'
		end
		member do
			post 'new_from_existing'
		end
		resources :topics
	end

	get 'welcome/index'

	root 'welcome#index'

end
