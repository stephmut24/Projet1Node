const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
        if(pokemon ===null){
            const message = 'Le pokemon demande n\'existe pas. Reesayez avec un autre identifiant';
            return res.status(404).json({messgae})
        }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
    })
    .catch(error => {
        const message = `La liste des pokemons n'a pas pu etre recuperee. Reessayer dans quelques instants,`
        res.status(500).json({message, data:error}) 
    })
  })
}