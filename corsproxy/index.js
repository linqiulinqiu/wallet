const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8090

const axatb = axios.create({
    baseURL:'https://api.alltheblocks.net/atb'
})


app.use(express.json())
app.use(cors())
app.post('/wl', async (req,res)=>{
    console.log(req.body)
    const nf = await axatb.post('/watchlist',req.body)
    if('data' in nf){
        res.json(nf.data)
    }
})


app.listen(port, ()=>{
    console.log(`started at: http://localhost:${port}`)
})
