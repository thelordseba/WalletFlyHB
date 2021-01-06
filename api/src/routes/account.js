const server = require("express").Router();
const { User, Account, Transaction } = require("../db");

//Ruta para crear cuenta de usuario

server.post('/:userId', async(req, res, next)=>{
    const userId = req.params.userId;
    const {type} = req.body;
    try{
        const user = await User.findByPk(userId);
        const account = await Account.create({            
            type: type,
            balance: 0
        });
        await account.setUser(user);
        res.json(account);
    }catch(error){
        next(error);
    }
});

//Ruta para obtener todas las cunetas existentes

server.get('/', async(req, res, next)=>{
    try{
      const accounts = await Account.findAll({      
      });
      res.json(accounts);
    }catch(error){
      next(error);
    }
  });

module.exports = server;