// require (import) your server and launch it here
const server = require('./api/server');

const PORT = 9000;

// START YOUR SERVER HERE
// console.log('index.js - nodemon test');
server.listen(PORT, ()=>{
    // console.log('index.js - listening on', PORT)
    console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
})