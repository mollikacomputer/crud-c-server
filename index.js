const express = require('express')
const app = express();
const port = process.env.port || 5000;
app.get('/', (req, res)=>{
    res.send('server app testing success')
});

app.listen(port, ()=>{
    console.log(`example listining on ${port}`, );
});
