const path = require('path')
console.log(__dirname);
console.log(__filename);

//Base Filename
console.log(path.basename(__dirname));

//Directory name
console.log(path.dirname(__filename));

//File Extentsion
console.log(path.extname(__filename));

//Create path object
console.log(path.parse(__filename));

// concatenate paths
console.log(path.join(__dirname,'text','hello.html'));