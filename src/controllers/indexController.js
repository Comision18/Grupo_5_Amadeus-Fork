

const db = require('../database/models')
const { Op } = require('sequelize');

module.exports = {
  index:
    (req, res) => {


      const nuevos = db.Product.findAll(
        {
          include: ['image'],
          where: { novelty: 1 }
        }
     
      )
      const oferta = db.Product.findAll(
        { include: ['image'],
          where: {
            discount: {
              [Op.ne]: 0
            }
          }
        })
      Promise.all(([nuevos, oferta]))
        .then(([nuevos, oferta]) => {
          return res.render('index',
            {
              title: 'Amadeus PC | HOME',
              
              oferta,
              nuevos
            }
          )
        }).catch((error) => console.log(error));
    },
  search: (req, res) => {
    const { keywords } = req.query;

 db.Product.findAll({
  include: ['image'],
      where : {
        [Op.or]:[
          {
        name : {[Op.substring]: `%${keywords}%` }
      },{
        description : {[Op.substring]: `%${keywords}%` }
      }
    ]
  }
    }).then((productos)=>{
      return res.render('productos/resultadoSearch', {
        productos,
        keywords
      })
    }).catch((error) => console.log(error));
   
  },
  admin: (req, res) => {
    db.Product.findAll({
      include: [{
        association: 'category',
        attributes: ['nameCategory', 'id']
      },
      {
        association: 'brand',
        attributes: ['name', 'id']
      }]
    }).then((productos) => {
      return res.render('dashboard', {
        productos
      })
    })
      .catch((error) => console.log(error));
  },
  about: (req,res) => {
    return res.render('nosotros')
  },
  question: (req,res) => {
    return res.render('preguntas')
  },
  buys: (req,res) => {
    return res.render('comoComprar')
  }
  
  
  

}