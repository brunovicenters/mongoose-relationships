const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection open");
  })
  .catch((err) => {
    console.log("Connection error! " + err);
  });
