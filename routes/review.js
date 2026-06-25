const express = require("express");
const router = express.Router({ mergeParams: true }); // If a parent route has parameters that need to be accessed inside this 
// router's callbacks, set `mergeParams: true` when defining the router.
// Without this, params from the parent route (like `:id`) would be 
// undefined inside this router.
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");     
const { validatReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Post review Route
router.post("/", isLoggedIn, validatReview,wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete(
    "/:reviewId", isLoggedIn, isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;