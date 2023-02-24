const knex = require('../db/connection');
const reduceProperties = require('../utils/reduce-properties');
const mapProperties = require('../utils/map-properties');

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
})

const reduceMovies = reduceProperties("movie_id", {});

async function list(){
    return knex("movies").select('*');
}

async function listShowing(){
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select('m.*')
        .where({is_showing: true})
        .then((result) => reduceMovies(result));
}

async function read(movie_id){
    return knex("movies")
    .select("*")
    .where({movie_id})
    .first();
}

async function readTheaters(movie_id){
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({"m.movie_id": movie_id, "mt.is_showing": true});
}

async function readReviews(movie_id){
    return knex("movies as m")
        .join("reviews as r", "m.movie_id", "r.movie_id")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({"m.movie_id": movie_id});
}

module.exports = {
    list,
    listShowing,
    read,
    readTheaters,
    readReviews,
}