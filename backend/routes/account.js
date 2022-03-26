const { getAdmins, User } = require("../mongo_classes/userClass");

const router = require("express").Router();

router.post("/updateStatus", checkSuperAdmin, async (req, res) => {});

router.post("/create", checkSuperAdmin, async (req, res) => {
  // Get the user's credentials
  const email = req.body.email;
  const pass = req.body.password;

  // Register the user
  let result = await new User(email).createUser(pass);

  // Send result
  res.send(result);
});

router.post("/delete", checkSuperAdmin, async (req, res) => {});

router.get("/get", checkSuperAdmin, async (req, res) => {
  res.send(await getAdmins());
});

/**
 * Middleware to ensure the request is from a super admin account
 */
function checkSuperAdmin(req, res, next) {
  if (!req.level || req.level !== "superadmin") return res.sendStatus(403);
  next();
}

module.exports = {
  router: router,
};
