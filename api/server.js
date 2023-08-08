// // implement (BUILD) your server here
// // put endpoints in their own folders


//IMPORTS - require (import) your posts-router and connect it here too
const express = require('express');
const postsRouter = require('./posts/posts-router'); 

//INSTANCE OF EXPRESS APP
const server = express();

//GLOBAL MIDDLEWARE - teaches express how to parse JSON from the request body
server.use(express.json());

//anything that has \/ will send requests to postsRouter aka delegate requests to posts-router to the router
server.use('/api/posts', postsRouter)

//backup-keep endpoint here just to test that api responds
server.use('*', (req, res)=>{
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server;
//CommonJS way of exporting out of a module
//this is equivalent to: export default server; for ES2015 modules
