class AddCombatantsBackToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :combatants, :integer, array: true, default: []
  end
end
