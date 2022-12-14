require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const heRoutes = require("./routes/hacker_earth")


//database
connection();


//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/user/auth", authRoutes);
app.use("/user/signup", userRoutes);
app.use("/hackerearth", heRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
