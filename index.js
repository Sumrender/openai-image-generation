const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const openai_routes = require("./routes/openai");
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/openai", openai_routes);

app.get("/", (req, res) => {
  res.status(200).send("server routes working");
});
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
