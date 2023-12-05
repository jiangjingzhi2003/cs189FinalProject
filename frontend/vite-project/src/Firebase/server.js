const express = require('express');
const cors = require('cors');
const app = express();
const admin = require('firebase-admin');
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors({
    origin: "*"
}));

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

    /*
    Get's a user's data in the form of a JSON
    {
        name
        password
        email
    }
    */

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
            userData["id"] = doc.id;
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
    Returns a json in the form of  
    {
        author
        likes
        text
        title
        uploadDate
    }
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
        let postData;
        snapshot.forEach(doc => {
            postData = doc.data();
            postData["id"] = doc.id;
            posts.push(postData);
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
        let postData;
        let numPosts = postsRef.docs.length;
        for (let i = 0; i < 5; i++) {
            random = Math.floor(Math.random() * (numPosts + 1));
            doc = postsRef.docs[random];
            postData = doc.data();
            postData["id"] = doc.id;
            posts.push(postData);
        }
        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error from Express");
    }

})

app.get('/api/getPost/:postID', async (req, res) => {

    try {
        const postsRef = db.collection('posts');
        const doc = await postsRef.doc(req.params.postID).get();
        if (doc.empty) {
            res.send(400).status("No document found");
            return
        }
        let postData = doc.data();
        postData["id"] = doc.id;
        res.status(200).send(postData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error from Express");
    }
})

// LIKING A POST
app.put('/api/likePost/:postID', async (req, res) => {

    /*
    Call to add 1 to a post's like count
    */
    try {
        const postsRef = db.collection('posts');
        const doc = await postsRef.doc(req.params.postID).get();

        if (doc.empty) {
            res.send(400).status("No document found");
            return
        }

        console.log(doc);
        let newLike = doc.data()["likes"] + 1;
        postsRef.doc(req.params.postID).update({likes: newLike});

        res.status(200).send("Success");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error from Express")
    }
    
});

app.put('/api/unlikePost/:postID', async (req, res) => {

    try {
        const postsRef = db.collection('posts');
        const doc = await postsRef.doc(req.params.postID).get();

        if (doc.empty) {
            res.send(400).status("No document found");
            return
        }

        let newLike = doc.data()["likes"] - 1;
        postsRef.doc(req.params.postID).update({likes: newLike});

        res.status(200).send("Success");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error from Express")
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

module.exports = app;