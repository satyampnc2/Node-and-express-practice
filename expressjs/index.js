const express= require('express');
const path = require('path');
const { dirname } = require('path');
const app = express();
const logger = require('./logger');
const members = require('./Members');




//Init middleware
//app.use(logger);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false})); //to handle url encoded data
// app.get('/', (req,res)=> {
//     // res.send('<h1>Hello My World </h1>');
//     res.sendFile(path.join(__dirname,'public','index.html'));
// });



// Set  a static folder
app.use(express.static(path.join(__dirname,'public')));

//Member Api routes
app.use('/api/members',require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log('server started on port '+PORT));