class Session < ActiveRecord::Base
	has_many :topics, :dependent => :delete_all
	has_many :timers, :dependent => :delete_all
end
