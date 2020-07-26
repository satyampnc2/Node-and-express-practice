const http = require('http');
const path = require('path');
const fs  = require('fs');
const fetch = require('node-fetch');


const server = http.createServer((req,res) => {
    // if(req.url === '/'){
    //     fs.readFile(path.join(__dirname,'public','index.html'),(err,content)=>{
    //         res.writeHead(200,{'Content-Type':'text/html'})
    //         res.end(content);
    //     })
    // } 
    // if(req.url === '/about'){
    //     fs.readFile(path.join(__dirname,'public','about.html'),(err,content)=>{
    //         res.writeHead(200,{'Content-Type':'text/html'})
    //         res.end(content);
    //     })
    // }
    // if(req.url === '/api/users'){
    //     const users = [
    //         {name:'satyam',age:18},
    //         {name:'priya',age:18}
    //     ]
    //     res.writeHead(200,{'Content-Type':'application/json'});
    //     res.end(JSON.stringify(users));
    // } 

    //Build Filepath
    let filePath = path.join(__dirname,'public',
    req.url==='/' ? 'index.html' : req.url);

    //Extension of file
    let extname = path.extname(filePath);

    //Intial content type
    let contentType= 'text/html';

    //Check ext and set content type
    switch(extname){
        case ".js" :
            contentType = "test/javascript";
            break;
        case ".css" :
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png" :
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }

    //Read File
    fs.readFile(filePath,(err,content) => {
        if(err){
            if(err.code == 'ENOENT'){
                //Page not found
                fs.readFile(path.join(__dirname,'public','404.html'),(err,content) => {
                    res.writeHead(200,{'Content-Type':'text/html'});
                    res.end(content,'utf8');
                })
            } else {
                //some other error
                res.writeHead(500);
                res.end(`Server Error : ${err.code}`);
            }
        } else{
            //Success
            res.writeHead(200,{'Content-Type' : contentType});
            res.end(content,'utf8');
        }
    })
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log('server running on '+PORT));

