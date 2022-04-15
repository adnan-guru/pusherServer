const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { feedService } = require("../services");
const { Socket } = require("../utils/sockets");

const createFeed = catchAsync(async (req, res) => {
  const feed = await feedService.createFeed(req.body);

  const newFeed = {
    action: "created",
    title: feed.title,
    description: feed.description,
    id: feed._id,
    createdAt: feed.createdAt.toISOString(),
    updatedAt: feed.updatedAt.toISOString(),
  };
  Socket.emit("FEED_CREATED", {
    message: newFeed,
  });

  res.status(httpStatus.CREATED).send(feed);
});

const getFeeds = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await feedService.queryFeeds(filter, options);
  res.send(result);
});

const getFeed = catchAsync(async (req, res) => {
  const feed = await feedService.getFeedById(req.params.feedId);
  if (!feed) {
    throw new ApiError(httpStatus.NOT_FOUND, "Feed not found");
  }
  res.send(feed);
});

const updateFeed = catchAsync(async (req, res) => {
  const feed = await feedService.updateFeedById(req.params.feedId, req.body);
  const newFeed = {
    action: "updated",
    title: feed.title,
    description: feed.description,
    id: feed._id,
    createdAt: new Date().toISOString(),
    updatedAt: feed.updatedAt.toISOString(),
  };
  Socket.emit("FEED_UPDATED", {
    message: newFeed,
  });
  res.send(feed);
});

const deleteFeed = catchAsync(async (req, res) => {
  const feed = await feedService.deleteFeedById(req.params.feedId);
  const newFeed = {
    action: "deleted",
    title: feed.title,
    description: feed.description,
    id: feed._id,
    createdAt: feed.createdAt.toISOString(),
    updatedAt: new Date().toISOString(),
  };
  Socket.emit("FEED_DELETED", {
    message: newFeed,
  });
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFeed,
  getFeeds,
  getFeed,
  updateFeed,
  deleteFeed,
};
