const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post')


//CREATE NEW POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
})


//UPDATE POST
router.put('/:id', async (req, res) => {        
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else {
            res.status(401).json('u can only update ur post')
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


//GET POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})


//DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json('post has been deleted... ');
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else {
            res.status(401).json("You can only delete your post!");
        }
    } catch (err) {
        res.status(500).json(err)
    }
})


//GET ALL POSTS                                                                             ...DIDNT UNDERSTAND...!!!!
router.get("/", async (req, res) => {
    const username = req.query.user;                      // 'req.query.user' will form an obj and and store it in username...the object consists of whatever'll be after user in the url..ex-'http.../username?user=rahul'...output will be.. username = { "user": "rahul" }....  https://www.educative.io/answers/what-is-reqquery-in-expressjs
    const catName = req.query.cat;                        // basically, hm url se username and category ka naam uthha k variable me store kra rhe h. 
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });            // agr username true h to uss username ki saari entry find krke post me save kra di 
        } else if (catName) {
            posts = await Post.find({                           // agar catName (music,lifestyle...etc. me se koi url me h) true h to, vo saari posts select ho jaeingi jiski categories ki value catName ke equal h
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router