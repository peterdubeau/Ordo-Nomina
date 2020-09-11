class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.boolean :is_admin
      t.bigint :initiative
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
