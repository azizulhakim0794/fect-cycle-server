const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 5000
const allProductRouter = require('./routes/allProduct')
const addToCartRouter = require('./routes/addToCartProducts')
const userOrderedRouter = require('./routes/userOrdered')
const blogsRouter = require('./routes/blog')
    app.get('/', (req,res) => {
      res.send('hello world')
    })

  app.use('/product',allProductRouter)
  app.use('/blogs',blogsRouter)
  app.use('/addToCart',addToCartRouter)
  app.use('/userOrderedProducts',userOrderedRouter)
  app.listen(process.env.PORT || port)