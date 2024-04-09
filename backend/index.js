const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const databaseurl = "mongodb+srv://ROOM1097:@DBMSdiu@bookstore.mongocluster.cosmos.azure.com/book?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
const databaseurl = "mongodb+srv://ROOM1097:0DBMSdiu@bookstore.mongocluster.cosmos.azure.com/book?retryWrites=true&w=majority";
const PORT = 3001;
const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect(databaseurl)
.then(()=>{
    console.log("Database Connected");
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})
.catch((e)=>{
    console.log(e)
})

app.get("/", (req,res) => {
    console.log(req);
    return res.status(212).send("fuck you")
})