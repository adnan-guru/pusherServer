const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const feedValidation = require("../../validations/feed.validation");
const feedController = require("../../controllers/feed.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth("manageFeeds"),
    validate(feedValidation.createFeed),
    feedController.createFeed
  )
  .get(
    auth("getFeeds"),
    validate(feedValidation.getFeeds),
    feedController.getFeeds
  );

router
  .route("/:feedId")
  .get(
    auth("getFeeds"),
    validate(feedValidation.getFeed),
    feedController.getFeed
  )
  .patch(
    auth("manageFeeds"),
    validate(feedValidation.updateFeed),
    feedController.updateFeed
  )
  .delete(
    auth("manageFeeds"),
    validate(feedValidation.deleteFeed),
    feedController.deleteFeed
  );

module.exports = router;
