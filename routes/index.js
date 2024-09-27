const router = require("express").Router();
const leads = require("./leads");

router.use("/leads", leads);

router.get("/", function (req, res) {
  res.status(200).send("API Leads is running 🥳");
});

module.exports = router;