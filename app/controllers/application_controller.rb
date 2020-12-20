class ApplicationController < ActionController::API
  SECRET_KEY = Rails.env == 'production' ? ENV['SECRET_KEY'] : Rails.application.secrets.secret_key_base.to_s
end
