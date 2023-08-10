// implement your posts-router here: express, router, data
const express = require('express');
const Post = require('./posts-model');
const { error } = require('console');
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

router.post('/', (req,res)=>{
    const {title, contents} = req.body;
    // console.log('post:', req.body) // shows what we put in title and contents
    if(!title || !contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        // console.log('success')
        Post.insert({title, contents})
            .then(({ id }) => {
                return Post.findById(id)
            })
            //since we returned a promise ^^ we can chain another one
            .then(post=>{
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message,
                    message: "The post information could not be modified",
                    stack: err.stack
                })
            })
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if (!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else {
            await Post.remove(req.params.id)
            res.json(post)
        }
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: "The user could not be removed",
            stack: err.stack,
            })
        }
})  

router.put('/:id', (req,res)=>{
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        //get the id that's in the link
        Post.findById(req.params.id)
            //does that id have anything stuff/info?
            .then(stuff =>{
                if (!stuff){
                    res.status(404).json({
                        message: "The post with the specified ID does not exist",
                    })
                // id does have stuff -- params needed based on the model 'update' code
                } else {
                    return Post.update(req.params.id, req.body)
                }
            })
            //this is what's being returned inside Post.update
            .then(data =>{
                if (data) {
                    return Post.findById(req.params.id)
                }
            })
            .then(post =>{
                //return the post that was updated
                res.json(post)
            })
            .catch (err => {
                res.status(500).json({
                    message: "The posts information could not be retrieved",
                    err: err.message,
                    stack: err.stack,
                })
            })
    }
})

router.get('/:id/comments', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if (!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else {
            //get messages from comment
            const messages = await Post.findPostComments(req.params.id)
            //console.log('messages:', messages) // it's an array
            res.json(messages)
        }
    } catch(err){
        res.status(500).json({
            message: "The comments information could not be retrieved",
        })
    }
})

module.exports=router