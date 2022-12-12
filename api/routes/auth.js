const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


//post-for creating something... delete-for deleteing something...put-updating something that already exists...get-if fetching some data and not doing anything else.

// REGISTER
router.post('/register', async (req, res) => {      //we will recieve a request loaded with the user informations and we'll store it in our db(using schemas) and send a response back.
    try {                                           // try catch block to catch any error
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);       // yha normal password dala or complex, unreadable passwrd nikala,baasically 1 password pr 2 fn lgaane hote h hash and salt...read more at- https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/

        const newUser = new User({                  // here we made an instance of the model 'User' and using that instance we are creating a newUser that will store info in our db.
            username: req.body.username,            // we could also have written 'req.body' in parameters, but then jo kuchh b req me ata vo sb save ho jata (be it title) hence we specified what all we want.
            email: req.body.email,                  // basically yha jo b fields specified h unn sbki db me entry unhi ke hisaab se hogi(ex- User model me username ke liye jo properties specified h, checking and entry unhi ke hisaab se hogi ) 
            password: hashedPass                     // https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/ ... read- basic operations-create record section
        });
        const tempUser = await User.findOne({ username: req.body.username });
        if (!tempUser || !req.body.username) {
            const user = await newUser.save();          // here we saved the above newUser and stored it in variable named user,and await is given bc this operation will take time. 
            res.status(200).json(user);
        }
        else {
            res.status(400).json('user already exists')
        }
    } catch (err) {                          // in case we hit an error do whats in the catch block...
        res.status(500).json(err);          //'.status() sets the HTTP status(200,404,500 etc) for the response'
    }
})

//LOGIN
router.post('/login', async (req, res) => {                 //imp note-->> there can only be one response to one request so always try to wrap your responses in if else., https://bobbyhadz.com/blog/javascript-error-cannot-set-headers-after-they-are-sent-to-client
    try {                                                   // also this code is a little different from the lama dev code, had to improvise
        const user = await User.findOne({ username: req.body.username });     //findOne is used to find one document(entry ) acc. to the condition,, note that whenever we apply a fn like this we apply it on the model name(here User)
        const validated = await bcrypt.compare(req.body.password, user.password);  //first argument-the password which came with the request(originally typed by user)...2nd argumnt- the password which we fettched from database(hashed),  see in above code we fetched an entry and stored it in 'user'.(note that we had already hashed the password and then saved it in db)..(also note that here we are using the bcrypt compare fn and not the normal one, it first uhashes the passwrd and then compares the two)
        if (!user || !validated) {
            res.status(400).json("wrong credentials");              //ERRORRRR--->> WHEN I TYPE WRONG USERNAME ERROR(500 (FROM CATCH SHOWS)), RATHER THAN(400 WRONG CREDENTIALS) 
        }
        else {
            res.status(200).json(user);
        }

        const { password, ...others } = user._doc;                       // this lines purpose is to show everything besides password( dont know how it happens )
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;