const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
const { Server } = require("socket.io");

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  var http = require("http").createServer(app);
  // const io = new Server(http, {
  //   cors: {
  //     origin: "*",
  //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   },
  // });
  const { io } = require("./utils/sockets");
  io.attach(http, {
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    },
  });
  global.io = io; //added
  http.listen(config.port, () => {
    console.log(`listening on Port:${config.port}`);
  });
  // io.on("connection", function (socket) {
  //   socket.emit("hello", "world");
  //   socket.emit("FEED_CREATED", "world");
  // });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
