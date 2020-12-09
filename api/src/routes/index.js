const { Router } = require("express");
const router = Router();
// importar todas los enrutadores;
const userRouter = require("./user.js");

//const productRouter = require("./product"); //ESTO ES UN EJEMPLO - BORRAR

// cargar cada enrutador en una ruta
// i.e: router.use('/auth', authRouter);


//router.use("/products", productRouter);  //ESTO ES UN EJEMPLO - BORRAR
//router.use("/categories", categoryRouter);  //ESTO ES UN EJEMPLO - BORRAR
router.use("/user", userRouter);


module.exports = router;