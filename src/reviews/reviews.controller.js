const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({
        status: 404,
        message: `Review cannot be found.`
    });
}

async function update(req, res, next) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
    }
    await service.update(updatedReview);
    const data = await service.readWithCritic(updatedReview.review_id);
    res.json({ data });
}

async function destroy(req, res, next) {
    const { review } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}