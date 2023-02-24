const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceTheaterAndMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    created_at: ["movies", null, "created_at"],
    updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies_theaters", null, "is_showing"],
    theater_id: ["theater", null, "theater_id"],
});

function list() {
    return knex("theaters")
        .join(
            "movies_theaters",
            "movies_theaters.theater_id",
            "theaters.theater_id"
        )
        .join("movies", "movies.movie_id", "movies_theaters.movie_id")
        .select("*")
        .then(reduceTheaterAndMovies);
}

module.exports = {
    list,
};