const { Router } = require("express");
const router = Router();
// importar todas los enrutadores;
const userRouter = require("./user.js");
const accountRouter = require("./account.js");
const contactsRouter = require("./contacts.js");

//const productRouter = require("./product"); //ESTO ES UN EJEMPLO - BORRAR

// cargar cada enrutador en una ruta
// i.e: router.use('/auth', authRouter);

router.use("/users", userRouter);
router.use("/accounts", accountRouter);
router.use("/contacts", contactsRouter);

module.exports = router;
