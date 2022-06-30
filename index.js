const express = require('express')
const app = express();
const port = process.env.port || 5000;
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('server app testing success')
});

const uri = "mongodb+srv://users:4p0QpTLyFR33djF0@cluster0.kwdbbxh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
        const usersCollection = client.db("practice").collection("users");
       // get data from server
       app.get('/user', async(req, res)=>{
            const query = {};
            const cursor = usersCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
       });
        // post or add new user
        app.post('/user', async(req, res)=>{
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        })

    }finally{
        // await client.close(); // after get some result need to close then use close

    }

}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log(`example listining on ${port}`, );
});
