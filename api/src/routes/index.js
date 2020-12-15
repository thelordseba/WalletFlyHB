const { Router } = require("express");
const router = Router();

router.use('/users', require("./user.js"))
router.use('/accounts', require("./account.js"))

module.exports = router;