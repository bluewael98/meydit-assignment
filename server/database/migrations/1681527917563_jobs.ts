import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Jobs extends BaseSchema {
  protected tableName = 'jobs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 225).notNullable()
      table.string('last_name', 225).notNullable()
      table.string('phone_number', 225).notNullable()
      table.string('email', 225).notNullable()
      table.string('address', 225).notNullable()
      table.string('postcode', 225).notNullable()
      table.string('state', 225).notNullable()
      table.string('clothing_type', 225).notNullable()
      table.string('image', 225).notNullable()
      table.string('description', 225).notNullable()
      table.string('budget', 225).notNullable()
      table.integer('submissions').defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
