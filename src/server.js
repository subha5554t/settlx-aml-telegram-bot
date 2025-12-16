require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.use("/telegram", require("./api/telegram.routes"));
app.use("/check", require("./api/check.routes"));

app.listen(3000, () => {
  console.log("SETTL X AML Bot running");
});
