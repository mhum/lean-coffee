Rails.application.routes.draw do
	match "sessions/:session_id/topics/remove_all", to: "topics#remove_all", via: [:post], as: :remove_all_topics
	resources :sessions do
		resources :topics
	end

	get 'welcome/index'

	root 'welcome#index'

end
