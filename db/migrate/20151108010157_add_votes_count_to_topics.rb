class AddVotesCountToTopics < ActiveRecord::Migration
  def change
    add_column :topics, :votes_count, :integer
  end
end
