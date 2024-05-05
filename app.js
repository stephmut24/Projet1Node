const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const {Sequelize} = require('sequelize')
const {success, getUniqueId} = require('./helper.js')
let pokemons = require('./mock-pokemon');

const app= express()
const port = 3000

const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb', 
        dialectOptions: {
            timezone: 'Etc/GMT+2'
        },
        logging: false
    }
)
sequelize.authenticate()
    .then(_ => console.log('La connexion a la nbase de donnees a bien ete etablie.'))
    .catch(error => console.error(`Impossible de se connecter a la base de donnees ${error}`))


app
.use(favicon(__dirname + '/favicon.ico')) 
.use(morgan('dev'))
.use(bodyParser.json())

app.get('/', (req,res)=>res.send("hello again, Express 2"))

app.get('/api/pokemons/', (req, res)=>{
    const message= "la liste des pokemons a bien ete recuperees"
    res.json(success(message,pokemons))
})

app.get('/api/pokemons/:id',(req, res)=>{
    const id = parseInt(req.params.id) //recuperer l'id contenu dans l'url
    const pokemon= pokemons.find(pokemon => pokemon.id ===id)
    const message = "Un pokemon a bien ete trouve."
    res.json(success(message, pokemon))
})

app.get('/api/pokemons',(req, res)=>{
    res.send(`Il y a ${pokemons.length} pokemons dans le pokedex pour le moment.`)
})

app.post('/api/pokemons', (req, res)=>{
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien ete cree.`
    res.json(success(message, pokemonCreated))
})
app.put('/api/pokemons/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id}
    pokemons = pokemons.map(pokemon =>{
        return  pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokemon ${pokemonUpdated.name} a bien ete modifie.`
    res.json(success(message, pokemonUpdated))

})
app.delete('/api/pokemons/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon =>pokemon.id ===id)
    pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} a bien ete supprime.`
    res.json(success(message, pokemonDeleted))
})



app.listen(port,()=>console.log(`Notre application est demarree sur : http://localhost:${port}`))
