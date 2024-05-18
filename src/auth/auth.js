const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next)=>{
    const authorizationHeader = req.headers.authorizationHeader

    if(!authorizationHeader){
        const message = `Vous n'avez pas fourni de jeton d'autentification. Ajoutez-en un dans l'en-tete de la requette.`
        return res.status(401).json({message})
    }
}