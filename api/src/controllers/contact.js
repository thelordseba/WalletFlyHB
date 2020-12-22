const { Contacts, User } = require('../db.js');

module.exports = {

    read: function (userId) {
        return Contacts.findAll({
            attributes: ["id", "userId", "contactId", "alias"],
            include: {
                attributes: ["firstName", "lastName", "email"],
                model: User,
            },
            where: { userId: userId },
        })
    },

    create: function (userId, contactId) {
        return Contacts.findOrCreate({
            where: {
                userId: userId,
                contactId: contactId,
            },
            userId: userId,
            contactId: contactId,
        })
            .then(() => this.read(userId))
    },

    delete: function (userId, contactId) {
        return Contacts.destroy({
            where: {
                userId: userId,
                contactId: contactId,
            }
        })
            .then(() => this.read(userId))
    },

    update: function (userId, contactId, alias) {
        return Contacts.findOne({
            where: {
                userId: userId,
                contactId: contactId,
            },
        })
            .then(account => account.update({
                alias: alias,
            }))
            .then(() => this.read(userId))
    }
}