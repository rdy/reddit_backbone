RedditBackbone::Application.routes.draw do
  resources :reddits
  root :to => 'reddits#index'
end
