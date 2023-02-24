const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
})


async function read(review_id){
    return knex("reviews")
    .select("*")
    .where({ review_id })
    .first();
}

async function update(updatedReview){
    return knex("reviews")
    .select("*")
    .where({review_id : updatedReview.review_id})
    .update(updatedReview, "*");
}

async function readWithCritic(review_id){
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": review_id })
    .first()
    .then(addCritic);
}

function destroy(review_id){
    return knex("reviews").where({review_id}).del();
}

module.exports = {
    read,
    update,
    readWithCritic,
    delete: destroy,
}