const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}`);
});
