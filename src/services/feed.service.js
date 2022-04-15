const httpStatus = require("http-status");
const { Feeds } = require("../models");
const ApiError = require("../utils/ApiError");
var app = require("express")();
var http = require("http").Server(app);
const io = require("socket.io")(http);

/**
 * Create a feed
 * @param {Object} feedBody
 * @returns {Promise<User>}
 */
const createFeed = async (feedBody) => {
  return Feeds.create(feedBody);
};

/**
 * Query for Feeds
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFeeds = async (filter, options) => {
  const feeds = await Feeds.paginate(filter, options);

  return feeds;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getFeedById = async (id) => {
  return Feeds.findById(id);
};

/**
 * Update Feed by id
 * @param {ObjectId} feedId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateFeedById = async (feedId, updateBody) => {
  console.log("FEEDID", feedId);
  const feed = await getFeedById(feedId);
  if (!feed) {
    throw new ApiError(httpStatus.NOT_FOUND, "feed not found");
  }
  Object.assign(feed, updateBody);
  await feed.save();

  return feed;
};

/**
 * Delete feed by id
 * @param {ObjectId} feedId
 * @returns {Promise<User>}
 */
const deleteFeedById = async (feedId) => {
  const feed = await getFeedById(feedId);
  if (!feed) {
    throw new ApiError(httpStatus.NOT_FOUND, "feed not found");
  }
  await feed.remove();
  return feed;
};

module.exports = {
  createFeed,
  queryFeeds,
  getFeedById,
  updateFeedById,
  deleteFeedById,
};
