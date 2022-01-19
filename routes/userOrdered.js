const express = require('express');
const { MongoClient } = require('mongodb');
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
    const UseBuyProductCollection = client.db("fectCycle").collection("usersProduct");

  router.post('/',(req, res ,next) =>{
    const id = req.body.id
    const name = req.body.name
    const details = req.body.details
    const category = req.body.category
    const img = req.body.img
    const price = req.body.price
    const quantity = req.body.quantity
    const email = req.body.email
    const date = req.body.date
    const paymentID = req.body.paymentId
    // console.log({id:id, name:name, details:details, category:category,price:price,img:img,quantity:quantity,email:email,date:date,paymentID:paymentID,date:date})
    UseBuyProductCollection.insertOne({id:id, name:name, details:details, category:category,price:price,img:img,quantity:quantity,email:email,date:date,paymentID:paymentID,date:date})
      .then(result => {
        res.status(201).send(result.insertedCount > 0);
      })
    })
    router.get("/",(req,res,next)=>{
      const email = req.headers.email
      UseBuyProductCollection.find({email:email})
      .toArray((err, documents) => {
        res.status(200).send(documents)
      })
    })
    
});
module.exports = router