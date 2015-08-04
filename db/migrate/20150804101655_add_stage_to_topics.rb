class AddStageToTopics < ActiveRecord::Migration
  def change
    add_column :topics, :stage, :integer
  end
end
