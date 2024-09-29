import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/user',(req,res)=>{
    res.status(200).json({'Content-Type' : 'application/json'});
    res.send("Welcome to users page")
})

app.listen(PORT,()=>{
    console.log(`server listening on http://localhost:${PORT}/api/user`)
})