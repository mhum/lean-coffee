class CreateTimers < ActiveRecord::Migration
  def change
    create_table :timers do |t|
      t.integer :timer_start_seconds, default: 300000, :limit => 8
      t.integer :timer_end_time, default: 1, :limit => 8
      t.integer :timer_seconds_left, default: 0, :limit => 8
      t.string :timer_status, default: 'reset'
      t.references :session, index: true, foreign_key: true
    end
  end
end
