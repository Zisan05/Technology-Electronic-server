const express = require('express')

require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

// middle wire
app.use(cors());
app.use(express.json());

// Technology-server
// fZLLuCbfUvHywkV6





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a3cooza.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("TechnologyDB").collection('Technology');
    const userStroge = client.db("Stroge").collection('Technology');
     
    // post
     app.post("/tech",async(req,res) => {
        const NewUser = req.body;
        console.log(NewUser)
        const result = await userCollection.insertOne(NewUser);
        res.send(result);    
     })

    //  read
    app.get('/tech',async(req,res) => {

        const cursor = userCollection.find();
        const result =await cursor.toArray();
        res.send(result)
    } )

    app.get('/tech/:id', async(req,res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result =await userCollection.findOne(query);
      res.send(result)
    })


    // Card DB
    app.post("/card",async(req,res) => {
      const NewUser = req.body;
      console.log(NewUser)
      const result = await userStroge.insertOne(NewUser);
      res.send(result);    
   })

   app.get('/card',async(req,res) => {

    const cursor = userStroge.find();
    const result =await cursor.toArray();
    res.send(result)
} )

       

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/" , (req,res) =>{
    res.send('The server is running')
})

app.listen( port , () => {
    console.log(`Tech server is running in port:${port}`)
})
