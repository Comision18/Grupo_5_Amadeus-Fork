const express = require('express');
const router = express.Router();


const{detail, filter, cart, add, edit, store, update, list, remove}= require('../controllers/productosController')
const checkUser = require('../middlewares/checkUser');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const {uploadImage}= require('../middlewares/upload')
const {productosValidator, validatorUserLogin} = require('../validations');
const checkUserLogin = require('../middlewares/checkUserLogin');

router
    .get('/carrito',checkUserLogin, cart)
    .post('/:id', cart)
    .get('/productDetail/:id', detail )
    .get('/filtrarProductos', filter)
    .get('/add', checkUserAdmin, add)
    .post('/add', uploadImage.array('images'), productosValidator, store)
    .get('/edit/:id', checkUserAdmin, edit)
    .put('/edit/:id', uploadImage.array('images'),productosValidator, update)
    .get('/productos', list)
    .delete('/delete/:id', checkUserAdmin, remove)
   
module.exports = router;