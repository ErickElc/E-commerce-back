const productRouter = require('./product.routes');
const entregaRouter = require('./entrega.routes');
const routerUser = require('./user.routes');
const routerAuth = require('./auth.routes');
const express = require('express')



const routes = app =>{
    app.use(
        '/api',
        express.urlencoded({ extended: false }),
        routerUser,
        productRouter,
        entregaRouter
    )
    app.use(
        '/auth/',
        express.urlencoded({ extended: false }),
        routerAuth
    )
}


module.exports = routes;




