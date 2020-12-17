require("dotenv").config()
const server = require("express").Router();
const { User, Account } = require("../db");
const nodemailer = require("nodemailer");
const passport = require('passport');
const jwt = require ("jsonwebtoken");
const authenticateToken = require('../auth/authenticateToken')

require('../auth/passportAuth.js')

server.use(passport.initialize()); //Arranca passport mediante middleware
server.use(passport.session());


// RUTA PARA LOGIN

server.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      console.log(user.dataValues)
      return res.json(user.dataValues)
/*      if (err) return next(err);
      if (!user) return res.json(info);
      req.logIn(user, async (err) => {
        if (err) { return next(err); }
        const body = { name: user.name, email: user.email }
        const accessToken = jwt.sign({user: body}, process.env.ACCESS_TOKEN_SECRET)
        res.cookie('authcookie', accessToken, {maxAge:720000, httpOnly:true})        
        return res.json(body)
      }); */
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})


//Ruta para modificar usuario

server.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  User.update(data, { where: { id } })
    .then((response) => {
      User.findOne({ where: { id } }).then((user) => {
        return res.status(200).json(user);
      });
    })
    .catch(next);
});

//Ruta para obtener todos los usuraios

server.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{ model: Account }],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//Ruta para obtener un usuario a partir de su email

server.get("/getUserByEmail", async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const user = await User.findOne({
      where: { email: userEmail },
      include: [{ model: Account }]
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

//Ruta para obtener un usuario

server.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { id: userId },
      include: [{ model: Account }],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

//Ruta para eliminar un usuario

server.delete("/:userId", async(req, res, next)=>{
  try{
    const user = await User.findOne({
      where:{
        id: req.params.userId  
      }      
    });
    await user.destroy();
    res.send("OK");
  }catch(error)
  {
    next(error);
  }
});

module.exports = server;
