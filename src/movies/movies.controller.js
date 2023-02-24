const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const mapProperties = require('../utils/map-properties');

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
})


async function listShowing(req, res, next) {
    const isShowing = req.query.is_showing;
    if (isShowing) {
        const data = await service.listShowing();
        res.json({ data });
    }
    else {return next();}
}


async function list(req, res, next) {
    const data = await service.list();
    res.json({ data });
}

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId);
    if (movie){
        res.locals.movie = movie;
        return next();
    }
    next({
        status: 404,
        message: `Movie cannot be found.`
    });
}

async function read(req, res, next){
    const {movie} = res.locals;
    res.json({ data: movie });
}

async function readTheaters(req, res, next){
    const data = await service.readTheaters(res.locals.movie.movie_id);
    res.json({ data });
}

async function readReviews(req, res, next){
    const result = await service.readReviews(res.locals.movie.movie_id);
    let resultArray = Object.values(result);
    const data = resultArray.map(({review_id, content, score, critic_id, movie_id, preferred_name, surname, organization_name}) =>{
        return ({
            review_id,
            content,
            score,
            critic_id,
            movie_id,
            critic: {
                critic_id,
                preferred_name,
                surname,
                organization_name,
            }
        })
    })
    res.json({ data });
}

module.exports = {
    list: [asyncErrorBoundary(listShowing), asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
    readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)],
}

