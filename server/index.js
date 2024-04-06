import express, { json, urlencoded } from 'express';
import cors from 'cors';
// import connectdb from './config/connectdb.js';
import './routes.js';
import './rag/rag.js';
import './rag/query.js';
import queryController from './rag/rag.js';
// import "web-streams-polyfill/es6";
const app = express();
const port = process.env.PORT || 4004;
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));


// DataBase Connection
// connectdb();

app.get("/", (req, res) => {
    res.send("Working...");
})

app.post('/query',async (req,res)=>{
    const {query} = req.body;
    const result =  await queryController(query);
    console.log(result);
    res.send(result);
});

app.listen(port, () => {
    console.log(`run on the ${port}`);
})