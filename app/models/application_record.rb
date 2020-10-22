class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  # primary_scope { order (id: :desc)}
end
