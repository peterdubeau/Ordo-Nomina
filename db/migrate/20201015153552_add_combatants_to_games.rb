class AddCombatantsToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :combatants, array: true, default: []
  end
end
