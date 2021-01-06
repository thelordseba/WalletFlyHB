const server = require("express").Router();
const { Contacts } = require("../db");
const contact = require('../controllers/contact')

//Ruta que me trae todos los contactos de un usuario
server.get("/:userId", (req, res, next) =>{
   const userID = req.params.userId;
   if(!userID){
     return res.status(400).send("Debes ingresar un Id para retornar los contactos")
   }
   contact.read(userID)
   .then(r => res.send(r))
   .catch(next)
})

//Ruta para crear Contacto
server.post("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const contactId = req.query.contactId;
  if(!userId || !contactId){
    return res.status(400).send("Debes ingresar un ID del usuario o el ID del contacto")
  }
  contact.create(userId, contactId)
  .then(r => res.send(r))
  .catch(next)
})

//Ruta para eliminar un contacto
server.delete('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const contactId = req.query.contactId;
  if(!userId || !contactId){
    return res.status(400).send("Debes ingresar un ID del usuario o el ID del contacto")
  }
  contact.delete(userId, contactId)
  .then(r => res.send(r))
  .catch(next)
})

//ruta para cambiar el alias
server.put('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const contactId = req.query.contactId;
  const alias = req.body.alias;
  if(!userId || !contactId || !alias){
    return res.status(400).send("Debes ingresar un ID del usuario o el ID del contacto o un Alias")
  }
  contact.update(userId, contactId, alias)
  .then(r => res.send(r))
  .catch(next)
})
// NO BORRAR

server.get("/", async (req, res, next) => {
  try {
    const contact = await Contacts.findAll();
    res.send(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = server;
