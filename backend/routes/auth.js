const router = require("express").Router();
const Users = require("../mongo_classes/userClass.js");
require("dotenv").config();

// JWT
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  console.log("Trying to login.");
  //These must be sent through the post request
  // var email = "test@super.com";
  // var password = "1234";

  var email = req.body.email;
  var password = req.body.password;

  console.log(req.body);
  //Initialize connection to database
  let User = new Users();

  var connectStatus = User.connect();
  if (connectStatus == false) {
    //errorMessage(res, "DB Connection Error");
    return; //Not sure if this actually stops execution but that is the goal
  }

  var login = await User.login(email, password);

  //let login = { error: false, body: { email: email } };

  if (login["error"] != false) {
    res.send({ success: false, body: login['body'] });
    //errorMessage(res, login["body"]);
    return;
  } else {
    //Should return full user info
    let data = { date: Date.now() };
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    console.log(token);
    res.send({ success: true, body: {...login["body"], token: token }});
    //successfulResponse(res, login["body"]);
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
