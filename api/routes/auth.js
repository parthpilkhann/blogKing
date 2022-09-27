const router = require('express').Router();
const User = require('../models/User');

//post-for creating something... delete-for deleteing something...put-updating something that already exists...get-if fetching some data and not doing anything else.

// REGISTER
router.post('./register', async (req, res) => {     //we will recieve a request loaded with the user informations and we'll store it in our db(using schemas) and send a response back.
    try {                                           // try catch block to cath any error
        const newUser = new User({                  // here we made an instance of the model 'User' and using that instance we are creating a newUser that will store info in our db.
            username: req.body.username,            // we could also have written 'req.body' in parameters, but then jo kuchh b req me ata vo sb save ho jata (be it title) hence we specified what all we want.
            email: req.body.email,                  // basically yha jo b fields specified h unn sbka db me entry unhi ke hisaab se hogi(ex- User model me username ke liye jo properties specified h, checking and entry unhi ke hisaab se hogi ) 
            password: req.body.password,            // https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/ ... read- basic operations-create record section
        }); 
        const user = await newUser.save();          // here we saved the above newUser and stored it in variable named user,and await is given bc this operation will take time. 
        res.status(200).json(user);                 
    } catch (err) {                          // in case we hit an error do whats in the catch block...
        res.status(500).json(err);          //'.status() sets the HTTP status(200,404,500 etc) for the response'
    }
})
 
//LOGIN

module.exports = router