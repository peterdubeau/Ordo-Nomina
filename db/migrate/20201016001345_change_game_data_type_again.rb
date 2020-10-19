class ChangeGameDataTypeAgain < ActiveRecord::Migration[6.0]
  def change
    change_column :games, :combatants, :string
  end
end
