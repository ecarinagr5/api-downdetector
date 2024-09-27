const router = require("express").Router();
const {
  leadsGet
} = require("../controller/leads");


router.get("/", leadsGet);


module.exports = router;