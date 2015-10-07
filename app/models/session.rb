class Session < ActiveRecord::Base
	has_many :topics
	has_many :timers
end
