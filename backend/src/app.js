 
const express = require('express')
const app = express()
const photographerRouter = require('./routes/phorographer')
const eventRouter = require('./routes/event')
const fileUpload = require('express-fileupload')
const cors =require('cors')
const path =require('path')
app.use(cors())

app.use(express.json())
app.use(fileUpload())

app.use('/uploads/events',express.static('public'))
//app.use('/api/images', express.static(path.join(__dirname, 'public/events')));
app.use('/api/v1/photographers',photographerRouter)

app.use('/api/v1/events',eventRouter)

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  }));
  

app.get('/',(req,res)=>{
    res.send('Hellow world!!!')
})

module.exports = app