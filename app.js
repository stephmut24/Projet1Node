const express = require('express')
const {success} = require('./helper.js')
let pokemons = require('./mock-pokemon');

const app= express()
const port = 3000


app.use((req, res, next)=>{
    console.log(`URL : ${req.url}`)
    next()
})

app.get('/', (req,res)=>res.send("hello again, Express 2"))

app.get('/api/pokemons/:id', (req, res)=>{
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




app.listen(port,()=>console.log(`Notre application est demarree sur : http://localhost:${port}`))
