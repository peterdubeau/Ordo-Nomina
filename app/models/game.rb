class Game < ApplicationRecord
  has_many :users, dependent: :destroy
end
