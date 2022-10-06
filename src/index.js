require("dotenv").config();

const compare = require("./utils/Bcrypt").compare;

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const { auth, login } = require("./middlewares/auth");

const led = require("./routes/led");
const button = require("./routes/button");
const user = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const User = require("./models/User");

app.post("/api/login", async (req, res) => {
  try {
    const { user, pass } = req.body;
    if (!user || !pass) {
      throw new Error("Missing user or pass");
    }

    const hasUser = await User.findOne({ login: user });
    if (!hasUser) {
      throw new Error("User not found");
    }

    const isValid = await compare(pass, hasUser.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    const token = await login({ user: hasUser.login }).then((token) => {
      return token;
    });
    res.json({ err: "", token: token, user: hasUser.name });
  } catch (err) {
    res.status(500).json({ err: err.message });
    console.log(err);
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/api/led", auth, led); // auth middleware is applied to all routes
app.use("/api/button", auth, button); // auth middleware is applied to all routes
app.use("/api/user", user);

mongoose
  .connect(
    `mongodb+srv://db_user:${process.env.DB_PASSWORD}@cluster0.h1xgzde.mongodb.net/test`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Conectou ao banco!");
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
