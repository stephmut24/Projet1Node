const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')


const app= express()
const port = 3000




app
.use(favicon(__dirname + '/favicon.ico')) 
.use(morgan('dev'))
.use(bodyParser.json())

sequelize.initDb()

//ici nous placerons futur points de terminaison

require('./src/roots/findAllPokemons')(app)
require('./src/roots/findPokemonByPK')(app)
require('./src/roots/CreatePokemon')(app)
require('./src/roots/updatePokemon')(app)
require('./src/roots/deletePokemon')(app)

app.listen(port,()=>console.log(`Notre application est demarree sur : http://localhost:${port}`))
