const server = require("express").Router();
const { User, Contacts } = require("../db");

server.post("/:userID", async (req, res, next) => {
  const userID = req.params.userId;
  try {
    const user = await User.findByPk(userID);
    const contact = await Contacts.create();
    await contact.setUser(user);
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

server.delete("/:ID", async (req, res, next) => {
  const ID = req.params.userId;
  try {
    const contact = await Contacts.findByPk(ID);
    await contact.destroy();
    res.send("Deleted");
  } catch (error) {
    next(error);
  }
});
