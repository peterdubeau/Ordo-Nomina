class ApplicationController < ActionController::API
  SECRET_KEY_BASE = Rails.env == 'production' ? ENV['SECRET_KEY_BASE'] : Rails.application.secrets.secret_key_base.to_s
end
