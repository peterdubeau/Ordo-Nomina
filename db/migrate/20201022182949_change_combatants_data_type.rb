class ChangeCombatantsDataType < ActiveRecord::Migration[6.0]
  def change
    remove_column :games, :combatants
  end
end
