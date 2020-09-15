class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "games_#{params[:code]}"
  end

  def unsubscribe
    # Any cleanup needed when channel is unsubscribed
    raise NotImplementedError
  end
end
