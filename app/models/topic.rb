class Topic < ActiveRecord::Base
  belongs_to :session
  enum color: [ 'cfc', 'ccf', 'ffc', 'fcc', 'fcf' ]
end
