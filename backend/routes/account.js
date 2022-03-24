const { getAdmins } = require("../mongo_classes/userClass");

const router = require("express").Router();

router.post("/updateStatus", async (req, res) => {});

router.post("/create", async (req, res) => {});

router.post("/delete", async (req, res) => {});

router.get("/get", async (req, res) => {
  // Ensure user is a superadmin
  if (req.level !== "superadmin") return;
  res.send(await getAdmins());
});

module.exports = {
  router: router,
};
