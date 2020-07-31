const express = require('express');
const app = express();
var bodyParser = require('body-parser')
require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;
const URI = process.env.URI;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const userRoute = require('./routes/user');
app.use('/api/users',userRoute);


mongoose.connect(URI,{useNewUrlParser:true,useCreateIndex:true,
useUnifiedTopology:true})
.then(res=>console.log('atlas db conneted'))
.catch(err=>console.log('error occured : ' +err));

db.once('open',()=>{
    console.log('db ready to use');
})

db.on('error',(err)=>{
    console.log('error occured : '+err);
})



const PORT = process.env.PORT || 5000;




app.listen(PORT,()=>console.log('listening to port : '+PORT));