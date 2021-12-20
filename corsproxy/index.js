const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001;

const axatb = axios.create({
    baseURL:'https://api.alltheblocks.net/atb'
})

var corsOptions = {
  origin: function (origin, callback) {
      if(origin.startsWith('http://localhost')){
          callback(null, true)
	  }else if(origin.startsWith('https://wwwa.onrender.com')){
          callback(null, true)
      } else {
          callback(new Error('Not allowed by CORS'))
      }
  }
}

app.use(express.json())
app.use(cors(corsOptions))
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
