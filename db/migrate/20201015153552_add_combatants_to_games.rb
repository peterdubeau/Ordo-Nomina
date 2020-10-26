class AddCombatantsToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :combatants, :tags, array: true, default: []
  end
end
