const server = require("express").Router();
const { User, Account } = require("../db");

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
    password: password,
  })
  .then((user) => res.status(200).json({ user }))
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

//Ruta para obtener todos los usuraios

server.get('/', async(req, res, next)=>{
  try{
    const users = await User.findAll({
       include: [{model: Account}]
    })
    res.json(users);
  }catch(error){
    next(error);
  }
});

//Ruta para obtener un usuario a partir de su email

server.get('/getUserByEmail', async(req, res, next)=>{
  try{
    const userEmail = req.query.email;
    const user = await User.findOne({
      where: {email : userEmail},
       include: [{ model: Account }]
    });
    res.json(user);
  }catch(error){
    next(error);
  }
});

server.get('/:id', async(req, res, next)=>{
  try{
    const userId = req.params.id;
    const user = await User.findOne({
      where: {id: userId},
       include: [{ model: Account }]
    });
    res.json(user);
  }catch(error){
    next(error);
  }
})

module.exports = server;

