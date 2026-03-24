const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));
  
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server running 🚀"));