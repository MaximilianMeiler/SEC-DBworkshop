const { MongoClient } = require('mongodb');
const express = require('express');
cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;
const connectionString = process.env.ATLAS_URI || "";
console.log(connectionString)
const client = new MongoClient(connectionString);

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)

  await client.connect();
  await listDatabases(client);
})

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};