const { Router } = require("express");
const router = Router();

//const productRouter = require("./product"); //ESTO ES UN EJEMPLO - BORRAR

// cargar cada enrutador en una ruta
// i.e: router.use('/auth', authRouter);

router.use('/users', require("./user.js"))
router.use('/accounts', require("./account.js"))
router.use('/transaction', require('./transaction.js'))
router.use('/contacts', require('./contacts.js'))

module.exports = router;

