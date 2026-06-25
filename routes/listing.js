const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const { populate } = require("../models/user.js");
const Listing = require("../models/listing.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn, 
    upload.single("listing[image]"),
    validateListing,
    wrapAsync (listingController.crateListing));
//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);
//new route ko show route se upar rakhege taki koi confusion na ho. phele listing new par agar request aayi hai to wahi hamare pas render ho aur fir id ke liye check kiya jaye      

router.route("/:id")  
.get( wrapAsync(listingController.showListing))  
.put(isLoggedIn,isOwner, upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;