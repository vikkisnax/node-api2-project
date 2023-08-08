// implement your posts-router here: express, router, data
const express = require('express');
const Post = require('./posts-model');
const router = express.Router();

router.get('/', (req,res)=>{
	//test res.json("test request - foo")
    Post.find()
        .then(posts => {
            // throw new Error('test error')
            res.status(200).json(posts);
        })
        .catch(err =>{
            res.status(500).json({
                err: err.message,
                message: "The posts information could not be retrieved",
                stack: err.stack,
            })
        })
})

router.get('/:id', (req,res)=>{

})

router.post('/', (req,res)=>{

})

router.put('/:id', (req,res)=>{

})

router.delete('/:id', (req,res)=>{

})

router.get('/:id/comments', (req,res)=>{

})

module.exports=router