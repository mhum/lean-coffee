# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151108010157) do

  create_table "sessions", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "timers", force: :cascade do |t|
    t.integer "timer_start_seconds", limit: 8, default: 300000
    t.integer "timer_end_time",      limit: 8, default: 1
    t.integer "timer_seconds_left",  limit: 8, default: 0
    t.string  "timer_status",                  default: "reset"
    t.integer "session_id"
  end

  add_index "timers", ["session_id"], name: "index_timers_on_session_id"

  create_table "topics", force: :cascade do |t|
    t.text     "description"
    t.integer  "session_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "color"
    t.integer  "stage"
    t.integer  "stage_x"
    t.integer  "stage_y"
    t.integer  "votes_count"
  end

  add_index "topics", ["session_id"], name: "index_topics_on_session_id"

  create_table "votes", force: :cascade do |t|
    t.text     "uuid"
    t.integer  "topic_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "votes", ["topic_id"], name: "index_votes_on_topic_id"

end
