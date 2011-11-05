class RedditsController < ApplicationController
  def index
    @reddits = Reddit.front_page
  end
end
