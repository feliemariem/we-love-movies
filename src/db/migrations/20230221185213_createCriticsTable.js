exports.up = function(knex) {
    return knex.schema.createTable("critics", (table) => {
        table.increments("critic_id").primary(); // sets critic ID as the primary key
        table.string("preferred_name"); // critic's preferred first name
        table.string("surname"); // critic's last name
        table.string("organization_name"); // the name of the organization the critic works for
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("critics");
};
