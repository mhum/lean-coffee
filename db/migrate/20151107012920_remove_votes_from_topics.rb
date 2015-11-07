class RemoveVotesFromTopics < ActiveRecord::Migration
  def change
    remove_column :topics, :votes, :integer
  end
end
