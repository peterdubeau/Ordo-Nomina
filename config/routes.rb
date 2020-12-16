Rails.application.routes.draw do
  resources :users
  resources :games
  mount ActionCable.server => '/cable'

  get '/game/:code/', to: 'games#show_by_code'
  get '/game/:code/users', to: 'games#show_users'
  delete '/game/:code', to: 'games#destroy'
  get '/game/:code/sort', to: 'users#sort'
  put '/game/:code/Bsort', to: 'games#backend_sort'
  put '/game/:code/start', to: 'games#start_combat'
  get '/combat/:code/', to: 'games#combat_view'
  put 'game/:code/turn', to: 'games#take_turn'
  put 'game/:code/kill', to: 'games#remove_character'
  put 'game/:code/clear', to: 'games#clear_room'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
