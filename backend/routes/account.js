const { getAdmins } = require("../mongo_classes/userClass");

const router = require("express").Router();

router.get("/get", async (req, res) => {
  // TODO make sure user is a super-admin
  res.send(await getAdmins());
});

module.exports = {
  router: router,
};
