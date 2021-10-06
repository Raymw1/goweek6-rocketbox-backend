require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("connectRoom", (box) => {
    socket.join(box);
  });
});

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}`);
});
