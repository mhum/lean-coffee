class Topic < ActiveRecord::Base
  belongs_to :session
  has_many :votes, :dependent => :delete_all
  enum color: [ 'cfc', 'ccf', 'ffc', 'fcc', 'fcf' ]
  enum stage: [ 'todiscuss', 'discussing', 'discussed' ]
end
