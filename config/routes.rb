Rails.application.routes.draw do
resources :sessions

  get 'topic/new'

  get 'welcome/index'

 root 'welcome#index'

end
