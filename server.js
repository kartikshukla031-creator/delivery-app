const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// frontend serve karega
app.use(express.static("public"));

// 🔥 database connect
mongoose.connect("mongodb://k38503307_db_user:12345@ac-9y0h4go-shard-00-00.nrkuns7.mongodb.net:27017,ac-9y0h4go-shard-00-01.nrkuns7.mongodb.net:27017,ac-9y0h4go-shard-00-02.nrkuns7.mongodb.net:27017/mydb?ssl=true&replicaSet=atlas-exo21b-shard-0&authSource=admin")
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

// routes connect
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);

// server start
app.listen(5000, () => {
  console.log("Server running 🚀 http://localhost:5000");
});