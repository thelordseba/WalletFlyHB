const server = require("express").Router();
const { Account, Transaction } = require("../db");

//Ruta para crear una transaction

server.post('/:accountId', async(req, res, next)=>{
    const accountId = req.params.accountId;
    const {title, type, description, total} = req.body;
    try{
        const account = await Account.findByPk(accountId)
        const transaction = await Transaction.create({
            title: title,
            type: type,
            description: description,
            total: total            
        });
        await transaction.setAccount(account);

        //Esto actualiza el saldo de la cuenta cada vez que hacemos una transacción
        var balance = 0;
        if(type === 'ingreso'){
             balance = account.balance + total;            
        }else {
             balance = account.balance - total;             
        }
        await account.update({
            balance: balance,             
        });

        res.json(transaction);        
    }catch(error){
        next(error);
    }   
});


module.exports = server;