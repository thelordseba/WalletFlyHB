require("dotenv").config()
const server = require("express").Router();
const { User, Account } = require("../db");
const nodemailer = require("nodemailer");

//Transporter para nodemailer
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL, //Nuestro mail
		pass: process.env.PASSWORD  //Nuestra password
	}
});


//Ruta para crear usuario

server.post("/", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Parametros incompletos o invalidos" });
  }
  var segNumber = Math.ceil(Math.random()*1000000);
  User.create({
    email: email,
    password: password,
    segNumber: segNumber,
  })
  .then((user) => res.status(200).json({ user }))
  .then((user) => {
  	let mailOptions = {
		from: process.env.EMAIL,
		to: email,
		subject: "Felicitaciones por tu nueva cuenta",
  		text: `HOLA HOLA maquina del amor, tu numero para el usuario es ${segNumber}`
  	};
  	transporter.sendMail(mailOptions, function(err, data) {
		if(err){
			console.log("Error occurs: ", err)
		} else {
			console.log("Success")
		}
  	})  	
 	})
 	.catch(next);
});

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
      include: [{ model: Account }],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

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
