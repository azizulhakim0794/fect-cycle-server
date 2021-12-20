const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors')
require('dotenv').config()
const router = express.Router()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hsgbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    const collection = client.db("fectCycle").collection("allProduct");
    router.get('/',(req, res ,next) =>{
        collection.find({})
        .toArray((err, document) => {
            res.send(document)
          })
    })
    router.get('/:id',(req, res ,next) =>{
        const id = req.params.id
          collection.find({_id:ObjectId(id)})
          .toArray((err, document) => {
              res.send(document[0])
            })
    })
    // Npm install -g npm@latest

});
module.exports = router