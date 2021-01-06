require('dotenv').config()
const passport = require('passport')
const localPassport = require('passport-local').Strategy;
const { User } = require('../db.js')
const crypto = require('crypto')

passport.use("login", new localPassport({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
        User.findOne({where:{email}}).then(user => {
            if (!user) {
                console.log("NO HAY USUARIO")
                return done(null, false, {message: "Usuario no encontrado o inexistente."})
            }
            if (!user.correctPassword(password)) {
                console.log("CONTRASEÑA EQUIVOCADA")
                return done(null, false, {message: "Contraseña invalida"})
            }
            console.log("TODO OK")
            return done(null, user, {message: "Bienvenido de nuevo"})
        }).catch(err => done(err))
}))


passport.serializeUser(function(user, done){
    done(null, user.id); // A este done se le pasa el null porque no hubo errores y luego el ID para serializar 
});

passport.deserializeUser(function(id,done){
    User.findOne({where:{id}})
    .then(user => {
      const userInfo = {
        username: user.email,
        name: user.firstName,
        lastname: user.lastName,
      }
      done(null, userInfo);
    })
});