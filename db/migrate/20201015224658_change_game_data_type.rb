class ChangeGameDataType < ActiveRecord::Migration[6.0]
  def change
    change_column :games, :combatants, :text
  end
end