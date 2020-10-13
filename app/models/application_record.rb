class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  # secondary_scope { order (id: :desc)}
end
