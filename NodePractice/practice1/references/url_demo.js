const URL = require('url').URL;

const myUrl = new URL('http://mywebsite.com/hello.html?id=100&statusactive');

//Serialized url
console.log(myUrl.href);
console.log(myUrl.toString());

//HOST (root domain)
console.log(myUrl.host);

//HOSTNAME (does not get port)
console.log(myUrl.hostname);

//PATHNAME
console.log(myUrl.pathname);

// Serialized query
console.log(myUrl.search);

// Param Object
console.log(myUrl.searchParams);

// Add Params
myUrl.searchParams.append('abc','123');