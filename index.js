const express = require("express");
require("dotenv").config();
const app = express();
const openai_routes = require("./routes/openai");
const PORT = process.env.PORT || 5000;

// middleware and routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/openai", openai_routes);

app.get("/", (req, res) => {
  res.status(200).send("server routes working");
});
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
