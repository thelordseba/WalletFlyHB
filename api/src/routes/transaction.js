const server = require("express").Router();
const { Account, Transaction, User } = require("../db");


//Ruta para obtener un cuenta en particular con todas sus transacciones
server.get('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const account = await Account.findOne({
            where: {
                userId: userId
            },
            include: [{ model: Transaction }]
        });
        res.json(account);
    } catch (error) {
        next(error);
    }
});

//Ruta para crear una transaction
server.post('/:accountId', async (req, res, next) => {
    const accountId = req.params.accountId;
    const { title, type, description, total, transactionUser } = req.body;
    try {
        const account = await Account.findByPk(accountId)
        const transaction = await Transaction.create({
            title: title,
            type: type,
            description: description,
            total: total,
            transactionUser: transactionUser
        });
        await transaction.setAccount(account);

        //Esto actualiza el saldo de la cuenta cada vez que hacemos una transacción
        var balance = 0;
        if (type === 'ingreso') {
            balance = account.balance + total;
        } else {
            balance = account.balance - total;
        }
        await account.update({
            balance: balance,
        });

        res.send(account);
    } catch (error) {
        next(error);
    }
});

//Ruta que crea una transaccion a partir de email del user

server.post('/byUserEmail/:userEmail', async(req, res, next)=>{
    const userEmail = req.params.userEmail;
    const {title, type, description, total, transactionUser } = req.body;
    try{
        const user = await User.findOne({
            where: { email: userEmail },
            include: [{ model: Account }]
        });
        const account = user.accounts[0];
        const transaction = await Transaction.create({
            title: title,
            type: type,
            description: description,
            total: total,
            transactionUser: transactionUser           
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
        res.json(account);   
         
    }catch(error){
        next(error);
    }   
});


module.exports = server;