class RenameGameColumns < ActiveRecord::Migration[6.0]
  def change
    change_column :games, :room_code, :code
  end
end
