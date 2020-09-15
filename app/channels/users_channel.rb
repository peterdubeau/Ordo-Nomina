class UsersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "users_channel"
  end

  def unsubscribe
    # Any cleanup needed when channel is unsubscribed
    raise NotImplementedError
  end
end
