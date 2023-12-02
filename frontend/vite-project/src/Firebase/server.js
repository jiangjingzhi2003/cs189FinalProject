const express = require('express');
const app = express();
const admin = require('firebase-admin')
const port = 3000;

const serviceAcc = require('./credentials.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAcc),
})

app.use(express.json());

const db = admin.firestore()

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
        const docRef = await db.collection('users').add(req.body)
        res.status(200).send({id: docRef.id })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }

})

// Making new post (POST)
app.post('/api/addPost', async (req, res) => {

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
        const docRef = await db.collection('posts').add(req.body)
        res.status(200).send({id: docRef.id })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }

})  

// Deleting Account (DELETE)

// Deleting Post (DELETE)   

// Getting User data (GET)
app.get('/api/getUserData/', async (req, res) => {

    try {
        const { user } = req.body;
        const userRef = db.collection('users');
        const snapshot = await userRef.where('name', '==', user).get();

        if (snapshot.empty) {
            res.status(500).send("No user found");
        }

        let userData;
        snapshot.forEach(doc => {
            userData = doc.data();
        });    
        res.status(200).send(userData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error from Express")
    }
})


// Getting a user's posts (GET)
app.get('/api/getUserPost/', async (req, res) => {
    
    /*
    Send a GET request to get a user's post in the form of 

    {
        "author": name of author to look up
    }
    */
    try {
        const { author } = req.body;
        const postsRef = db.collection('posts');
        const snapshot = await postsRef.where('author', '==', author).get();
        if (snapshot.empty) {
            console.log("no documents");
            return;
        }
        const posts = [];
        snapshot.forEach(doc => {
            posts.push(doc.data());
        });
        res.status(200).send(posts);
    } catch (error) {   
        console.error(error);
        res.status(500).send("no");
    }
})

// Searching for posts (GET)



// Getting random post (GET)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  