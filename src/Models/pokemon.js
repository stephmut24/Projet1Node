const validTypes=['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']
/* L’API Rest et la Base de données : Créer un modèle Sequelize */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg:'Le nom est deja pris.'
        },
        validate: {
          notEmpty: {msg: 'Le nom ne peut pas etre vide.'},
          notNull: {msg: "Le nom est une propriete requise."}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt:{msg: 'Utiliser uniquement des nombres entiers pour les points de vie.'},
          min:{
            args: [0],
            msg:'Les points de vie doivent etre supperieur ou egale a 0.'
          },
          max:{
            args: [999],
            msg:'Les points de vie doivent etre inferieure ou egale a 999 .'
          },
          notNull: {msg: 'Les points de vie sont une propriete requise.'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt:{msg: 'Utiliser uniquement des nombres entiers pour les points de degats.'},
          min:{
            args: [0],
            msg:'Les points de degat doivent etre supperieur ou egale a 0.'
          },
          max:{
            args: [99],
            msg:'Les points de degats doivent etre inferieure ou egale a 99 .'
          },
          notNull: {msg: 'Les points de degats sont une propriete requise.'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'utiliser uniquement une URL valide pour l\'image.'},
          notNull: {msg: "L'image est une propriete requise."}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join())
        },
        validate:{
          ifTypeValid(value){
            if(!value){
              throw new Error('Un pokemon doit au moins avoir un type.')
            }
            if(value.split(',').length > 3) {
              throw new Error('Un pokemon ne peut pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Le type d'un pokemon doit appartenir a la liste suivante : ${validTypes}`)
              }
              
            });
          }
        }
      }
    }, {
      timestamps: true,   
      createdAt: 'created',
      updatedAt: false
    })
  }