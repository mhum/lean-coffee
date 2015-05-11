class TopicController < ApplicationController
  def new
  	render :file => "topic/new", :layout => false
  end
end
