const express = require('express')

const app= express()
const port = 3000
app.get('/', (req,res)=>res.send("hello again, Express 2"))

app.get('/api/pokemons/:id',(req, res)=>{
    const id = req.params.id //recuperer l'id contenu dans l'url
    res.send(`Vous avez demande le pokemon numero ${id}`)})



app.listen(port,()=>console.log(`Notre application est demarree sur : http://localhost:${port}`))
