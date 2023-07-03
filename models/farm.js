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

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//   { name: "Goddes Melon", price: 4.99, season: "Summer" },
//   { name: "Sugar Baby Watermelon", price: 5.99, season: "Summer" },
//   { name: "Asparagus", price: 3.99, season: "Spring" },
// ]);

// const makeFarm = async () => {
//   const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
//   const melon = await Product.findOne({ name: "Goddes Melon" });
//   farm.products.push(melon);
//   farm.save();
//   console.log(farm);
// };
// makeFarm();

const addProduct = async () => {
  const farm = await Farm.findOne({ name: "Full Belly Farms" });
  const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });
  farm.products.push(watermelon);
  farm.save();
  console.log(farm);
};

// addProduct();
