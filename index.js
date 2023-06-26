const express = require("express");
const { userController } = require("./routes/userRoutes.js");
const { connection } = require("./config/db.js");
const { noteController } = require("./routes/noteRoutes.js");
const { authentication } = require("./Middleware/authentication.js");

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/user", userController);

app.use(authentication);
app.use("/notes", noteController);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("error connecting db");
  }
  console.log(`listening at ${PORT}`);
});
