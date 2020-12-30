class AddInCombatToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :in_combat, :boolean, default: false
  end
end
