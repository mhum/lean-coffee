class AddStageCoordsToTopics < ActiveRecord::Migration
  def change
    add_column :topics, :stage_x, :integer
    add_column :topics, :stage_y, :integer
  end
end
