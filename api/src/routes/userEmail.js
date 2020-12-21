require("dotenv").config()
const server = require("express").Router();
const { User } = require("../db");
const nodemailer = require("nodemailer");
//import logo from "../logo.jpeg";


//Transporter para nodemailer
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL, //Nuestro mail
		pass: process.env.PASSWORD  //Nuestra password
	}
});


var returnHTML = function(segNumber){
  return (` 
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          .container {
           width: 90%;
           margin: auto;
           border: solid 2px purple;
           border-radius: 50px  ;
          }
          h1 {
            text-align: center;
          }
          h2 {
            text-align: center;
          }
          ul {
            text-decoration: none
          }
        </style>
      </head>
    <body>
      <div class='container'>
        <h1>BIENVENIDO A WalletFly</h1>
        <img src="https://cdn.discordapp.com/attachments/772103945505472563/788852288650739722/85223452-7496-48a4-917d-2ea9b1a88d61.jpg" alt="Logo no disponible"/>
        <h2>La mejor billetera virtual de latinoamerica</h2>
        <hr>
        
        <div>
          <h1>Su codigo para activar su cuenta es:</h1>
          <h1> ${segNumber} </h1>
        </div>

        <h3 style="padding:20px">De parte de este equipo agradecemos que hayas elegido una app tan increible</h3>
        <h4 style="padding:20px">
          Al aceptar usar esta aplicacion acepta las bases y condiciones de que solo se va a 
          manejar dinero ficticio que no es mas que muchos 1 y 0 que realmente no afectan para nada 
          tu billetera por lo que es algo mas decorativo que otra cosa. La plata no existe
        </h4>
  </div> 
  </body> 
  </html>`
  )
}



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
    active: false
  })
  .then((user) => {
    console.log("ESTE ES EL USUARIO ", user.dataValues)
    const trueUser = user.dataValues;
    setTimeout( async function(){
      console.log("ENTRAMOS AL SET")
      const user = await User.findOne({
        where:{
          id: trueUser.id  
        }      
      });
      if(!user.active){
        await user.destroy();
        console.log("DESTRUIMOS AL TRAIDOR!!!")
        res.send("OK");
      }
      console.log("ALGO MALIO SAL, CREO QUE ERA DE VERDAD")
    },300000)
    res.status(200).json({ user })
  })
  .then((user) => {
  	let mailOptions = {
		from: process.env.EMAIL,
		to: email,
		subject: "Felicitaciones por tu nueva cuenta",
    html:  returnHTML(segNumber), 
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

module.exports = server;