const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createFeed = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getFeeds = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFeed = {
  params: Joi.object().keys({
    feedId: Joi.string().custom(objectId),
  }),
};

const updateFeed = {
  params: Joi.object().keys({
    feedId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteFeed = {
  params: Joi.object().keys({
    feedId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFeed,
  getFeeds,
  getFeed,
  updateFeed,
  deleteFeed,
};
