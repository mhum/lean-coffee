class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.text :description
      t.integer :votes
      t.references :session, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
