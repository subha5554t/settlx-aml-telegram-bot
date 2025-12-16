require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.use("/telegram", require("./api/telegram.routes"));
app.use("/check", require("./api/check.routes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SETTL X AML Bot running on port ${PORT}`);
});
