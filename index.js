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
    const orderCollection = database.collection("orders");
    //GET API -----------------------------get
    app.get('/services', async (req, res)=>{
        const cursor = serviceCollection.find({});
        const services = await cursor.toArray();
        res.send(services);
    })
    //POST order API-----------------------------post order
    app.post('/orders', async(req, res)=>{
        const orders = req.body;
        console.log('hit the post API',orders);
        
        const result = await orderCollection.insertOne(orders);
       console.log(result);
        res.json(result)
    })
    //GET ORDER API---------------------------get order
    app.get('/orders', async(req, res)=>{
      const cursor = orderCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);

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