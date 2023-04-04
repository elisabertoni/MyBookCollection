exports.up = (knex) => {
  return knex.schema.createTable('Books', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.string('author')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('Books')
}
