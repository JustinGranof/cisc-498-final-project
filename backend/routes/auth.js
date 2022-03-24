const router = require("express").Router();
const { User } = require("../mongo_classes/userClass.js");
require("dotenv").config();

// JWT
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  console.log(req.body);
  //Initialize connection to database
  let user = new User(email);

  let connectStatus = user.getConnectionStatus();
  if (connectStatus == false) {
    return res.send({ success: false, body: "Unable to connect to database." });
  }

  let userObj = await user.login(password);

  if (!userObj) {
    return res.send({ success: false, body: "Invalid Credentials." });
  } else {
    user.disable();
    let data = { date: Date.now() };
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    return res.send({
      success: true,
      body: { ...userObj, token: token },
    });
  }
});

// Might not be needed.
router.post("/logout", (req, res) => {});

router.post("/", authenticateToken, (req, res) => {
  res.send({ success: true });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);

    // data contains decoded jwt token
    next();
  });
}

module.exports = {
  router: router,
  authenticateToken: authenticateToken,
};
