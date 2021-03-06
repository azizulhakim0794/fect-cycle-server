const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const router = express.Router()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hsgbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    const AllProductCollection = client.db("fectCycle").collection("allProduct");
    router.get('/',(req, res ,next) =>{
      AllProductCollection.find({})
        .toArray((err, document) => {
            res.send(document)
          })
    })
    router.get('/:id',(req, res ,next) =>{
        const id = req.params.id
        // console.log(id)
        AllProductCollection.find({_id:ObjectId(id)})
          .toArray((err, document) => {
              res.send(document[0])
            })
    })
    router.get('/category/:category',(req, res ,next) =>{
      const category = req.params.category
      // console.log(category)
      AllProductCollection.find({category:category})
        .toArray((err, document) => {
            res.send(document)
          })
  })
    // Npm install -g npm@latest

});
module.exports = router