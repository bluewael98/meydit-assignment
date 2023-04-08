import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Consumers extends BaseSchema {
  protected tableName = 'consumers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('phone_number')
      table.string('address') 
      table.string('postcode')
      table.string('state')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
