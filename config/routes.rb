RedditBackbone::Application.routes.draw do
  resources :reddits
  resource :comment
  root :to => 'reddits#index'
end
