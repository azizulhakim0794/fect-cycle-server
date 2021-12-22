const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(bodyParser.json())
app.use(cors());
const port = 5000
const allProductRouter = require('./routes/allProduct')
const addToCartRouter = require('./routes/addToCartProducts')
const userOrderedRouter = require('./routes/userOrdered')

    //  app.get('/hotel/:id', (req, res)=>{
    //   const id = req.params.id
    //   console.log(id)
    //     collection.find({_id:ObjectId(id)})
    //     .toArray((err, document) => {
    //         res.send(document[0])
    //       })
    // })
    app.get('/', (req,res) => {
      res.send('hello world')
    })

  app.use('/product',allProductRouter)
  app.use('/addToCart',addToCartRouter)
  app.use('/userOrderedProducts',userOrderedRouter)
  app.listen(process.env.PORT || port)