'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('express-handlebars');
const app = express()
const api = require('./routes');

app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.json());

// motor de plantillas para usar en node
app.engine('.hbs', hbs({
    defaulLayout: 'default',
    extname: '.hbs'
}))

// actualizar motor de vistas para node
app.set('view engine', 'hbs');
app.get('/login', (req,res) => {
    res.render('login')
})

app.get('/', (req, res) => {
    res.render('product')
  })


app.use('/api', api)

module.exports = app;