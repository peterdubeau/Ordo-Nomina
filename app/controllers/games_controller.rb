class GamesController < ApplicationController
  before_action :set_game, only: [:show, :show_by_code, :update, :destroy, :sort, :backend_sort, :take_turn]

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

    ActionCable.server.broadcast "games_channel", @game
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
    GamesChannel.broadcast_to(@game, { type: "delete_game" } )
    @game.destroy
  end

  def clear_room
    @game = Game.find_by code: (params[:code])
    @game.in_combat = false
    GamesChannel.broadcast_to(@game, { game: @game, inCombat: @game.in_combat, type: "to_lobby" } )
    
    if @game.update(game_params)
      @users = @game.users.select {|user| user.is_admin == false}
      @users.each do 
        |x| x.destroy
      end
      render json: @game
    else
      render json: @game.errors, status: :unprocessable_entity
  end

end

  # PUT /game/:code/start
  def start_combat
    @game = Game.find_by code: (params[:code])
    @game.in_combat = true

    if @game.update(game_params)
      users = @game.users.all
      combatants = @game.combatants

      names = users.each_with_object({}) do |user, hash|
        hash[user.id] = user.username
      end

      GamesChannel.broadcast_to(@game, { code: @game.code, users: users, combatants: combatants, inCombat: @game.in_combat, type: "game_start" })
      render json: names
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # GET /combat/:code
  def hashify(hash)
    # hash.split(',')
  end

  def combat_view
    @game = Game.find_by code: (params[:code])
    list = @game
    # new_list = hashify(list)

    render json: list.combatants
  end

  #SORT /game/:code/Bsort
  def backend_sort
    users = @game.users.all.sort_by(&:initiative).reverse
    users = users.sort
    @users = users

    render json: @users

    GamesChannel.broadcast_to(@game, { game: @game.code, users: @users, type: "sort_players" })
  end

  def remove_character
    @game = Game.find_by code: (params[:code])
    if @game.update(game_params)
      render json: @fighters
      GamesChannel.broadcast_to(@game, {code: @game.code, users: @game.users, combatants: @game.combatants, type: "remove_guy" })
    end
  end


  def take_turn
    
    if @game.update(game_params)
      
      @users = @game.users.all
      GamesChannel.broadcast_to(@game, { code: @game.code, combatants: @game.combatants, users: @users, type: "take_turn"})
      render json: @game, include: :users
    end

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
