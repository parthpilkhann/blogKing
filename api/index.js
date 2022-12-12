const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');
const path = require('path');


dotenv.config();                                               //this fn loads environment variables from the .env file
app.use(express.json());                                        //a built in middleware fn, it parses incoming requests with json payloads, returns an object
app.use('/images', express.static(path.join(__dirname, "/images")))     // this code is to join the path of the "/images" folder to the "/images" url (after dirname) so that we can access the images from this images folder and display them whenever required, the accessing will be by writing "/images/21212412421.. where the no. is id.",.. and this fn is used after installing "path library"

mongoose.connect(process.env.MONGO_URL)
    .then(console.log('connected to mongodb'))
    .catch(err => {
        console.log(err)
    });

const storage = multer.diskStorage({                // The disk storage engine gives you full control of storing files to disk.we will create a storage object.
    destination: (req, file, cb) => {               // details on multer.. https://medium.com/@svibhuti22/file-upload-with-multer-in-node-js-and-express-5bc76073419f
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

app.listen('5000', () => {
    console.log('backend running');
}) 