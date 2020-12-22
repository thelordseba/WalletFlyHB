require("dotenv").config()
const server = require("express").Router();
const nodemailer = require("nodemailer");

//Transporter para nodemailer
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL, //Nuestro mail
		pass: process.env.PASSWORD  //Nuestra password
	}
});



var returnHTML = function(){
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
          <h1> Un conocido suyo lo invito a unirse a la comunidad bancaria mas grande de latinoamerica</h1>
          <h1> No seas nabo y hacete una cuenta que despues te vas a arrepentir sino </h1>
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



//Ruta para invitar a amigo

server.post("/", (req, res, next) => {
  	const { email } = req.body;
  	if (!email) {
    	return res
      	.status(400)
      	.json({ message: "No declaraste el mail de a quien invitar" });
  	}
  	
  	let mailOptions = {
		from: process.env.EMAIL,
		to: email,
		subject: "Fuiste invitado a la secta",
    	html:  returnHTML(), 
  	};
  	transporter.sendMail(mailOptions, function(err, data) {
		if(err){
			console.log("Error occurs: ", err)
		} else {
			console.log("Success")
		}
  	})  		
});

module.exports = server;