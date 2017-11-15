const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cliente = require('mongodb').MongoClient;
var db


//conexion a la base de datos antes de escuchar.
cliente.connect('mongodb://luis:luispablo@ds151955.mlab.com:51955/lab4-ed', (err, database) => {

    if (err) return console.log(err)

    db = database

    app.listen(80, () => {

        console.log('listening on default port')
    })
})

//"herramientas" que provee bodyparser, express, ejs.
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

//request de tipo get
app.get('/', (req, res) => {

    db.collection('pizzas').find().toArray(function (err, results) {

        if (err) return console.log(err)

        res.render('index.ejs', { pizzas: results })
    })
})

//request de tipo post
app.post('/pizzas', (req, res) => {

    db.collection('pizzas').save(req.body, (err, result) => {

        if (err) return console.log(err)

        console.log('saved to database')

        res.redirect('/')
    })
})

app.put('/pizzas', (req, res) => {

    db.collection('pizza').findOneAndUpdate({  

            Nombre: req.body.Nombre
        }, 
        {
            $set: {
                Nombre: req.body.Nombre,
                Descripcion: req.body.Descripcion,
                Ingredientes: req.body.Ingredientes,
                Tamaño: req.body.Tamaño,
                Porciones: req.body.Porciones,
                Extra: req.body.Extra
            }
        }
        , {
            sort: { _id: -1 },
            upsert: true
        }, (err, result) => {

            if (err) return res.send(err)

            res.send(result)

        })
})

app.delete('/pizzas', (req, res) => {

    db.collection('pizzas').findOneAndDelete({
        
        Nombre: req.body.Nombre
    
    }, (err, result) => {

      if (err) return res.send(500, err)

      res.send('borrado')
    })
  })
