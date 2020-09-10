class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :code, :limit => 5
      #t.string :string

      t.timestamps
    end
  end
end
