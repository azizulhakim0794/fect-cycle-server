const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors());
const port = 5000
const hotelRouter = require('./routes/allProduct')

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

  app.use('/product',hotelRouter)
  app.listen(process.env.PORT || port)