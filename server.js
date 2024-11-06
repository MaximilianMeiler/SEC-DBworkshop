const { MongoClient } = require('mongodb');
const express = require('express');
cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);
let collection;

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)

  await client.connect();
  let database = client.db("databaseName");
  collection = await database.collection("collectionName");
})

app.get("/getRecentPosts", async (req, res) => {
  let results = await collection.find({})
  .limit(50)
  .toArray();
  
  res.send(results).status(200);
})


app.post("/createPost", async (req, res) => {
  let newDocument = req.body;
  newDocument.date = new Date();

  result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});