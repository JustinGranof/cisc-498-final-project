const router = require("express").Router();
const Users = require("../mongo_classes/userClass.js");
require("dotenv").config();

// JWT
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  console.log(req.body);
  //Initialize connection to database
  let User = new Users();

  let connectStatus = User.connect();
  if (connectStatus == false) {
    return res.send({ success: false, body: "Unable to connect to database." });
  }

  let login = await User.login(email, password);

  if (login["error"] != false) {
    return res.send({ success: false, body: login["body"] });
  } else {
    let data = { date: Date.now() };
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    return res.send({
      success: true,
      body: { ...login["body"], token: token },
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
