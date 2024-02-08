const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use(cors());

// Databasse Connection With MongoDB
mongoose.connect(
  "mongodb+srv://nareshpratista28:12345@cluster0.hf7d6i2.mongodb.net/aaleeyah"
);

// API Creation

app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for Images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for Creating Products

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Creating API For Adding Products

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API For Deleting Products

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API For Getting All Products

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

// Schema creating user Model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unqiue: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating Endpoint For Registering Users
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Email Already Exists",
    });
  }
  let cart = {};
  for (let i = 1; i < 7; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token: token,
  });
});

// Creating Endpoint for user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Password Incorrect" });
    }
  } else {
    res.json({ success: false, errors: "User Not Found" });
  }
});

// Creating Endpoint for getting newCollection data

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-4);
  console.log("New Collection Fetched");
  res.send(newCollection);
});

// Creating Endpoint for getting Popular Khimar data
app.get("/popularitems", async (req, res) => {
  let products = await Product.find({ category: "khimar" });
  let popularItems = products.slice(0, 4);
  console.log("Popular Items Fetched");
  res.send(popularItems);
});

// Creating Middleware for fetching user data
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please Authenticate Using a Valid Token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "Please Authenticate Using a Valid Token" });
    }
  }
};

// Creating Endpoint for adding product in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added to Cart");
});

// Creating Endpoint for adding product in cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if ((userData.cartData[req.body.itemId] = 0))
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed from Cart");
});

// Creating Endpoint for increase quantity
app.post("/increasequantity", fetchUser, async (req, res) => {
  const { itemId } = req.body;
  const user = await Users.findOne({ _id: req.user.id });
  if (user.cartData[itemId]) {
    user.cartData[itemId] += 1;
  } else {
    user.cartData[itemId] = 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: user.cartData }
  );
  res.json({ success: true, message: "Quantity Increased" });
});

// Creating Endpoint for decrease quantity
app.post("/decreasequantity", fetchUser, async (req, res) => {
  const { itemId } = req.body;
  const user = await Users.findOne({ _id: req.user.id });
  if (user.cartData[itemId] && user.cartData[itemId] > 1) {
    user.cartData[itemId] -= 1;
  } else {
    delete user.cartData[itemId];
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: user.cartData }
  );
  res.json({ success: true, message: "Quantity Decreased" });
});

// Creating Endpoint for getting cart data
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("Cart Data Fetched");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port " + port);
  } else {
    console.log("Error : " + error);
  }
});
