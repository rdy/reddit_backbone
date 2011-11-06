class RedditsController < ApplicationController
  respond_to :json

  def index
    @reddits = Reddit.front_page
    respond_to do |format|
      format.html { }
      format.json { respond_with @reddits }
    end
  end
end
