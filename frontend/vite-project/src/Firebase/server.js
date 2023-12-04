const express = require('express');
const cors = require('cors');
const app = express();
const admin = require('firebase-admin');
const port = process.env.PORT || 3000;

const serviceAcc = require('./credentials.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAcc),
})

app.use(cors());
app.use(express.json());

const db = admin.firestore();

const {v4} = require('uuid');

app.get('/api', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
});

// Making new Account (POST)
app.post('/api/addUser', async (req, res) => {

    /*
    Users should be in the form of 
    {
        "name": "",
        "password": "",
        "email": ""
    }
    Will add more in future
    */

    try {
        const docRef = await db.collection('users').add(req.body);
        res.status(200).send({id: docRef.id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})

// Making new post (POST)
app.post('/api/addPost/', async (req, res) => {

    /*
    Posts should be in the form of 
    {
        "author": "",
        "title": "",
        "body": "",
        "likes": 0
    }
    May add more in future.
    */

    try {
        req.body.uploadDate = new Date().toLocaleString();
        const docRef = await db.collection('posts').add(req.body);
        res.status(200).send({id: docRef.id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})  

// Deleting Account (DELETE)

// Deleting Post (DELETE)   

// Getting User data (GET)
app.get('/api/getUserData/:user', async (req, res) => {

    try {
        const user  = req.params.user;
        const userRef = db.collection('users');
        const snapshot = await userRef.where('name', '==', user).get();
        if (snapshot.empty) {
            res.status(400).send("User not found");
        }

        let userData;
        snapshot.forEach(doc => {
            userData = doc.data();
        });    
        res.status(200).send(userData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error from Express");
    }
})


// Getting a user's posts (GET)
app.get('/api/getUserPost/:user', async (req, res) => {
    
    /*
    Send a GET request to get a user's post 
    */
    try {
        const author = req.params.user;
        const postsRef = db.collection('posts');
        const snapshot = await postsRef.where('author', '==', author).get();
        if (snapshot.empty) {
            console.log("no documents");
            res.status(400).send("User not found")
            return;
        }
        const posts = [];
        snapshot.forEach(doc => {
            posts.push(doc.data());
        });
        res.status(200).send(posts);
    } catch (error) {   
        console.error(error);
        res.status(500).send("Internal Server Error from Express");
    }
})

app.get('/api/test', async (req, res) => {

    console.log("Testing");
    res.status(200).send({
        "status": 200,
        "message": "Test successful"
    })
})


// Getting random post (GET)
app.get('/api/getRandomPost', async (req, res) => {

    /*
    * Randomly gets 5 posts from the database
    */

    try {
        const postsRef = await db.collection('posts').get();
        let random;
        let doc;
        const posts = [];
        let numPosts = postsRef.docs.length;
        for (let i = 0; i < 5; i++) {
            random = Math.floor(Math.random() * (numPosts + 1));
            doc = postsRef.docs[random];
            posts.push(doc.data());
        }
        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error from Express");
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

module.exports = app;