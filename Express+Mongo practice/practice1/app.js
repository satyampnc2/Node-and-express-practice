const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Check db connection
db.once('open',()=>{
    console.log('connected to mongo')
})

//Check for db errors
db.on('error', (err)=>{
    console.log(err);
})

//Init App
const app = express();

//Bring in models
let Article = require('./models/article');
let User = require('./models/user');

//Load View engines
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Home route
app.get('/',async (req,res)=>{
    var article = [];
    var user = [];
    await Article.find({},(err,articles)=>{
        if(err){
            console.log(err);
        } else{
            article = articles;
        }
    })
    await User.find({},(err,users)=>{
        if(err){
            console.log(err);
        } else{
            user = users;
        }
    })
    res.render('index',{
        title:'hello',
        users : user,
        articles:article
    })
    
});

let users = require('./routes/users');
app.use('/users',users);
//Add route
app.get('/articles/add', (req,res) => {
    res.render('add_article',{
        title:'add article'
    })
})

// Add submit post route
app.post('/articles/add',(req,res)=>{
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    article.save((err)=>{
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
    return;
})

// Route to single article
app.get('/article/:id',(req,res)=>{
    Article.findOne({_id:req.params.id},(err,article)=>{
        if(err){
            console.log(err);
        } else {
            res.render('article',{
                article:article
            })
        }
    })
})

//Delete a single articel
app.delete('article/:id',(req,res)=>{
    Article.deleteMany({_id:req.params.id},(err,article)=>{
        if(err){
            console.log(err);
            res.send('failure');
        } else{
            res.send('success');
        }
    })
   
})

//Start server
app.listen(5000, ()=> console.log('connected...'));