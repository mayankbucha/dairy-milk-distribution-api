const mongoose = require('mongoose')

const url=process.env.MONGODB_URL;

mongoose.connect(url)

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("Connected successfully");
});
