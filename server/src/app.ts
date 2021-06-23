import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import usersRouter from "./routes/users";

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/account", usersRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello!");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
