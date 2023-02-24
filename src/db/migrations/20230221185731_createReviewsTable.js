
exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary(); // a unique ID for the review
        table.text("content"); // content of the review, written in MD
        table.integer("score"); // numerical representation of the score given to the movie by the critic
        table.integer("critic_id").unsigned().notNullable();
        table
            .foreign("critic_id")
            .references("critic_id")
            .inTable("critics")
            .onDelete("cascade");
        table.integer("movie_id").unsigned().notNullable();
        table
            .foreign("movie_id")
            .references("movie_id")
            .inTable("movies")
            .onDelete("cascade");

        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};


