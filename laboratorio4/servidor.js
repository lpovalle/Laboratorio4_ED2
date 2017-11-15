const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const cliente = require('mongodb').MongoClient;
var db

cliente.connect('mongodb://luis:luispablo@ds151955.mlab.com:51955/lab4-ed', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})

app.set('view engine', 'ejs')

app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    db.collection('pizzas').find().toArray(function (err, results) {

        if (err) return console.log(err)

        res.render('index.ejs', { pizzas: results })
    })
})

app.post('/pizzas', (req, res) => {

    db.collection('pizzas').save(req.body, (err, result) => {

        if (err) return console.log(err)

        console.log('saved to database')

        res.redirect('/')
    })
})
