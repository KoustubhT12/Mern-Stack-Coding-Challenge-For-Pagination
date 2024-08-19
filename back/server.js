import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

const app = express();

app.use(express.json());

app.use(cors());

app.get('/',async(req,res)=>{
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
    res.send(response.data);
})

app.listen(3000,()=>{
    console.log('connected at server 3000');
})
