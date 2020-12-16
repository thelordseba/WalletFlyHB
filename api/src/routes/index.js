const { Router } = require("express");
const router = Router();

// importar todas los enrutadores;
const userRouter = require("./user.js");
const accountRouter = require("./account.js");
const transactionRouter = require("./transaction");
const userEmail = require("./userEmail.js")

//const productRouter = require("./product"); //ESTO ES UN EJEMPLO - BORRAR

// cargar cada enrutador en una ruta
// i.e: router.use('/auth', authRouter);


router.use("/users", userRouter);    
router.use('/accounts', accountRouter);
router.use("/transactions", transactionRouter);
router.use("/userEmail", userEmail);


router.use('/users', require("./user.js"))
router.use('/accounts', require("./account.js"))

module.exports = router;