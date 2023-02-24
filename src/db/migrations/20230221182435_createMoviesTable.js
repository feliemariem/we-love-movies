
exports.up = function(knex) {
    return knex.schema.createTable("movies", (table) => {
        table.increments("movie_id").primary(); // Sets movie_id as the primary key
        table.string("title"); // title of the movie
        table.integer("runtime_in_minutes"); // length of the movie in minutes
        table.string("rating"); // Rating given to the movie
        table.text("description"); // brief description of the movie
        table.string("image_url"); // url to the movie's poster
        table.timestamps(true, true); // Adds created_at and updated_at columns
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable("movies");
};
