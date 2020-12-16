const server = require("express").Router();
const { User, Contacts } = require("../db");

//Ruta para crear Contacto

server.post("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const contactId = req.query.contactId;
  try {
    const contact = await Contacts.findOrCreate({
      where: {
        userId: userId,
        contactId: contactId,
      },
      userId: userId,
      contactId: contactId,
    });
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

//Ruta para eliminar un contacto

server.delete("/:userId", async (req, res, next) => {
  const userID = req.params.userId;
  const contactId = req.query.contactId;
  try {
    const contact = await Contacts.findOne({
      where: {
        userId: userID,
        contactId: contactId,
      },
    });
    await contact.destroy();
    res.send("Deleted");
  } catch (error) {
    next(error);
  }
});

//Ruta que me trae todos los contactod de la bd

server.get("/", async (req, res, next) => {
  try {
    const contact = await Contacts.findAll();
    res.send(contact);
  } catch (error) {
    next(error);
  }
});

//Ruta que me trae todos los contactos de un usuario

server.get("/userId", async (req, res, next) => {
  const userID = req.params.userId;
  try {
    const contact = await Contacts.findAll({
      where: {
        userId: userID,
      },
    });
    res.send(contact);
  } catch (error) {
    next(error);
  }
});

//ruta para cambiar el alias

server.put("userId", async (req, res, next) => {
  const userID = req.params.userId;
  const contactID = req.query.contactId;
  const alias = req.body;
  try {
    const contact = await Contacts.findOne({
      where: {
        userId: userID,
        contactId: contactID,
      },
    });
    await contact.update({ alias: alias });
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = server;
