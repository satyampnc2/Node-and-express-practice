const fs = require('fs');
const path = require('path');

//Create folder
// fs.mkdir(path.join(__dirname,'/test'),{},function(err){
//     if(err) throw err;
//     console.log('folder created');
// });

// Create and write to file
// fs.writeFile(path.join(__dirname,'/test','hello.txt'),'Hi satyam \n',function(err){
//     if(err) throw err;
//     console.log('file written');
//     fs.appendFile(path.join(__dirname,'/test','hello.txt'),'How are u',function(err){
//         if(err) throw err;
//         console.log('file written');
//     });
    
// });


//Read File
fs.readFile(path.join(__dirname,'/test','hello.txt'),'utf8',function(err,data){
    if(err) throw err;
    console.log(data);
});


//Rename file
fs.rename(path.join(__dirname,'/test','hello.txt'),
    path.join(__dirname,'/test','helloworld.txt'),err => {
        if(err) throw err;
        console.log('file renamed');
    })
