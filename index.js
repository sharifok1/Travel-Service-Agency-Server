const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 7000
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.he93e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
  try{
    await client.connect();
    const database = client.db("travelAgency");
    const serviceCollection = database.collection("services");
    //GET API -----------------------------get
    app.get('/services', async (req, res)=>{
        const cursor = serviceCollection.find({});
        const services = await cursor.toArray();
        res.send(services);
    })


  }
  finally{
       //   await client.close();//can ignor
  }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('Travel Agency server is running');
})
app.listen(port,()=>{
    console.log('listion from server port:',port)
})