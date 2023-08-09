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

router.get('/:id', async (req, res)=>{
    try {
      const post = await Post.findById(req.params.id);
      if (!post){
        res.status(404).json({
            message: "The post with the specified ID does not exist",
        })
      } else {
        res.json(post)
      }
    } catch(err) {
            // console.log(err);
            res.status(500).json({
                err: err.message,
                message: "The post information could not be retrieved", 
                stack: err.stack,
            })
}
})


router.post('/posts', (req,res)=>{

})

router.put('/:id', (req,res)=>{

})

router.delete('/:id', (req,res)=>{

})

router.get('/:id/comments', (req,res)=>{

})

module.exports=router