require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}`);
});
