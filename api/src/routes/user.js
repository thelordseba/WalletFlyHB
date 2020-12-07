const server = require("express").Router();
const { User } = require("../db");

//Ruta para crear usuario

server.post("/", (req, res, next) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Parametros incompletos o invalidos" });
  }
  User.create({
    email: email,
    password: password
  })
    .then((user) => res.status(200).json(user))
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
  	});
});

module.exports = server;
