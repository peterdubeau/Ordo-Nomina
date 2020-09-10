Rails.application.routes.draw do
  resources :users
  resources :games
  mount ActionCable.server => '/cable'

  get '/game/:code/', to: 'games#show_by_code'
  get '/game/:code/users', to: 'games#show_users'
  delete '/game/:code', to: 'games#destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
