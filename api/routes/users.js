const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Post = require('../models/Post')


//UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {                    // this if-else is for -if someone else tries to change someone else's account., here the account that is logged in is in url and the one we want to change will be in the entry
        if (req.body.password) {                                   // this statement states that if user want to update password, then hash it too
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {           // here we accessed the database and updated all the fields which we got from req(we will decide in front end what all things we want to all update of) findById fns working= 1st arg-->the id which need to be updated(in this case ,the one with which we have logged in that is in url)...2nd arg--> $set fn which is used to set a value, (we set the the field to the new values of req.body )
                $set: req.body,
            },
                { new: true });                                               //when the user gets updated though it will update the user in our db but in res, it will send the old account whereas after adding this statement it send the updated entry
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(401).json("you cant change someone else's username")
    }
})


//DELETE
router.delete('/:id', async (req, res) => {         // note that we have to delete not just the but all the posts of the user as well.
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username })
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted")
            } catch (err) {
                res.status(500).json(err)
            }
        }
        catch (err) {
            res.status(404).json("user not found")
        }
    } 
    else {
        res.status(401).json("you can only delete your acc")
    }
})


//GET USER
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router