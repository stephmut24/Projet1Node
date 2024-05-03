const express = require('express')
let pokemons = require('./mock-pokemon');

const app= express()
const port = 3000

app.get('/', (req,res)=>res.send("hello again, Express 2"))

app.get('/api/pokemons/:id',(req, res)=>{
    const id = parseInt(req.params.id) //recuperer l'id contenu dans l'url
    const pokemon= pokemons.find(pokemon => pokemon.id ===id)
    res.send(`Vous avez demande le pokemon numero ${pokemon.name}.`)
})

app.get('/api/pokemons',(req, res)=>{
    res.send(`Il y a ${pokemons.length} pokemons dans le pokedex pour le moment.`)
})




app.listen(port,()=>console.log(`Notre application est demarree sur : http://localhost:${port}`))
