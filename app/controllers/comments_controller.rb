class CommentsController < ApplicationController
  respond_to :json

  def show
    head :fail and return unless params[:permalink].present?
    @comments = Reddit.comment(params[:permalink])
    respond_with @comments
  end
end
