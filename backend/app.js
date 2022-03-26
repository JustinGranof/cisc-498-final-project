const express = require("express");
const cors = require("cors")();
const app = express();

const { authenticateToken } = require("./routes/auth.js");
const authRouter = require("./routes/auth.js").router;
const accountRouter = require("./routes/account").router;

const PORT = 3001;

app.use(cors);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/account", authenticateToken, accountRouter);

app.get("/", (req, res) => {
  res.send("You look lost.");
});

app.listen(PORT, async () => {
  console.log("Server listening at port 3001");
});
