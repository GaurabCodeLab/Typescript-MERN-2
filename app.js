require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/database");
const { authRouter } = require("./routes/authRouter");

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRouter);

dbConnect()
  .then(() => {
    console.log("database connected");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error in connecting database: " + error.message);
  });
