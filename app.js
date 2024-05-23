//dans ce projet nous avons cree une API Rest avec express.js
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')


const app= express()
const port = process.env.PORT || 4000




app
.use(favicon(__dirname + '/favicon.ico')) 
.use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res)=>{
    res.json("Hello, Vercel")
})

//ici nous placerons futur points de terminaison

require('./src/roots/findAllPokemons')(app)
require('./src/roots/findPokemonByPK')(app)
require('./src/roots/CreatePokemon')(app)
require('./src/roots/updatePokemon')(app)
require('./src/roots/deletePokemon')(app)
require('./src/roots/login')(app)

//On ajoute la gestion des erreurs 404
app.use(({res}) =>{
    const message = "Impossible de trouver la ressource demandee ! Vous pouvez essayer une autre URL."
    res.status(404).json({message})
})

app.listen(port,()=>console.log(`Notre application est demarree sur : http://localhost:${port}`))
