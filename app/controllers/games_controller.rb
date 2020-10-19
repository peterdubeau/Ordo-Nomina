class GamesController < ApplicationController
  before_action :set_game, only: [:show, :show_by_code, :update, :destroy, :sort, :backend_sort]

  # GET /games
  def index
    @games = Game.all

    render json: @games
  end

  # GET /games/1
  def show
    render json: @game
  end

  def show_by_code
    render json: @game
  end

  def show_users
    @game = Game.find_by code: (params[:code])
    @users = @game.users.all
    render json: @game, include: :users

    # ActionCable.server.broadcast 'games_channel', @game.users.all

  end

  # POST /games
  def create
    @game = Game.new(game_params)
    
    if @game.save
      render json: @game, includes: :combatants, status: :created
    else
      render json: @game.errors, status: :unprocessable_entity
    end

    ActionCable.server.broadcast 'games_channel', @game

  end

  # PATCH/PUT /games/1
  def update
    # @game = Game.find_by code: (params[:code])
  
    # @game.update(game_params)

    if @game.update(game_params)
      render json: @game
      # .users.sort_by(&:initiative).reverse
    else
      render json: @game.errors, status: :unprocessable_entity
    end

  end

  # DELETE /games/1
  def destroy
    @game.destroy
  end

  def start_combat
    @game = Game.find_by code: (params[:code])
    users = @game.users.all

    names = users.each_with_object({}) do |user, hash|
      hash[user.username] = user.initiative
    end
    # ini = users.each_with_object({}) do |ini, hash|
    #   hash[ini.initiative] = ini.username
    # end
    
    GamesChannel.broadcast_to(@game, {game: @game.code, users: users, type: "list"})
    render json: names

  end

  #SORT /game/:code/Bsort
  def backend_sort

    users = @game.users.all.sort_by(&:initiative).reverse
    users = users.sort
    @users = users

    render json: @users

    GamesChannel.broadcast_to(@game, {game: @game.code, users: @users, type: "sort_players"})

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find_by code: (params[:code])
    end

    # Only allow a trusted parameter "white list" through.
    def game_params
      params.require(:game).permit(:code, :combatants => [])
    end
  end
