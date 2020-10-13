class GamesChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find_by code: (params[:code])
    stream_for @game
  end

  def received(data)
    GamesChannel.broadcast_to(@game, { game: @game,  users: @game.users})

  end
  
  # def unsubscribed
  #   # Any cleanup needed when channel is unsubscribed
  #   raise NotImplementedError
  # end
end
