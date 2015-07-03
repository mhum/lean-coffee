class AddColorToTopics < ActiveRecord::Migration
  def change
    add_column :topics, :color, :integer
  end
end
