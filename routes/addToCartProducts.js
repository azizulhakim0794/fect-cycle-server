const express = require('express');
const { MongoClient } = require('mongodb');
const {ObjectId} = require('mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const router = express.Router()
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hsgbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const cartProductCollection = client.db("fectCycle").collection("cartProduct");

  router.post('/',(req, res ,next) =>{
    const id = req.body.id
    const name = req.body.name
    const details = req.body.details
    const category = req.body.category
    const img = req.body.img
    const price = req.body.price
    const quantity = req.body.quantity
    const email = req.body.email
    console.log(req.body)
    cartProductCollection.insertOne({id:id, name:name, details:details, category:category,price:price,img:img,quantity:quantity,email:email})
      .then(result => {
        res.status(201).send(result.insertedCount > 0);
      })
    })
    router.get("/",(req,res,next)=>{
        const email = req.headers.email
      cartProductCollection.find({email:email})
      .toArray((err, documents) => {
        res.status(201).send(documents)
      })
    })
    router.get("/single",(req,res,next)=>{
      const id = req.headers.id
      console.log(id)
      cartProductCollection.findOne({_id:ObjectId(id)})
      .toArray((err, documents) => {
        res.status(200).send(documents[0])
        console.log(documents[0])
      })
    })
    router.delete("/",(req,res,next)=>{
      const id = req.headers.id
      if(id){
        cartProductCollection.deleteOne({_id:ObjectId(id)})
      .then(result => {
        res.status(200).send(result.deletedCount>1)
      })
     
      }
      else{
        res.status(404).send("id is not found")
      }
    })
    
});
module.exports = router