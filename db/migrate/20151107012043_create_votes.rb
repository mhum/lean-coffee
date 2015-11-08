class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.text :uuid
      t.references :topic, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
