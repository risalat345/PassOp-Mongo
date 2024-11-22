const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
dotenv.config();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Ensure MongoDB connection is established before setting up routes
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if DB connection fails
    }
}

// Initialize the DB connection before starting the app
connectToMongoDB();

// Routes
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('password');
    try {
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch data' });
    }
});

app.post('/', async (req, res) => {
    const password = req.body; // Get the password document from request body
    console.log('Received password:', password); // Log the document to inspect

    // Ensure the document has a valid structure
    if (!password.site || !password.username || !password.password) {
        return res.status(400).json({ success: false, message: 'Invalid data structure' });
    }

    const db = client.db(dbName);
    const collection = db.collection('password');

    try {
        // Insert the document into the collection
        const insertResult = await collection.insertOne(password);
        res.status(201).json({ success: true, result: insertResult });
    } catch (error) {
        console.error('Error inserting document:', error);
        res.status(500).json({ success: false, message: 'Failed to insert document' });
    }
});

app.delete('/', async (req, res) => {
    const password = req.body; // Corrected from res.body to req.body
    const db = client.db(dbName);
    const collection = db.collection('password');

    try {
        const deleteResult = await collection.deleteOne(password);
        res.send({ success: true, result: deleteResult });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ success: false, message: 'Failed to delete document' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
