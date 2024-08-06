const express = require('express')
const app = express()
const port = 3000
const { MongoClient, Collection } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(bodyparser.json());
app.use(cors());

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passman';

client.connect();

// api to get all the passwords available
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// api to save new passwords 
app.post('/', async (req, res) => {
    const data = req.body;
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(data);
    res.send({Success: true, result: findResult});
})

// api to delete passwords by id
app.delete('/', async (req, res) => {
    const data = req.body;
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.deleteOne(data);
    res.send({Success: true, result: findResult});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})