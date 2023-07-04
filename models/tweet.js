const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection open");
  })
  .catch((err) => {
    console.log("Connection error! " + err);
  });

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweets = async () => {
  // const user = new User({ username: "vyce", age: "18" });
  const user = await User.findOne({ username: "vyce" });
  const tweet1 = new Tweet({ text: "I will sleep now guys", likes: 25 });
  tweet1.user = user;
  await user.save();
  await tweet1.save();
};

const findTweet = async () => {
  const t = await Tweet.find({}).populate("user", "username");
  console.log(t);
};

findTweet();
