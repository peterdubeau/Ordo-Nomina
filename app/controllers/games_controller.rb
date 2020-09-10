class GamesController < ApplicationController
  before_action :set_game, only: [:show, :show_by_code, :update, :destroy]

  # GET /games
  def index
    @games = Game.all

    render json: @games
  end

  # GET /games/1
  # def show
  #   render json: @game
  # end

  def show_by_code
    render json: @game
  end

  def show_users
    @game = Game.find_by code: (params[:code])
    @users = @game.users.all
    render json: @game, include: :users
  end

  # POST /games
  def create
    @game = Game.new(game_params)

    if @game.save
      render json: @game, status: :created, location: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end

    ActionCable.server.broadcast 'games_channel', @game

  end

  # PATCH/PUT /games/1
  def update
    if @game.update(game_params)
      render json: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # DELETE /games/1
  def destroy
    @game.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find_by code: (params[:code])
    end

    # Only allow a trusted parameter "white list" through.
    def game_params
      params.require(:game).permit(:code, :string)
    end
end
