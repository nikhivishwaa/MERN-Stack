const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')
require('dotenv').config()
 
connectToMongo();
const app = express()
const port = 4500

// enable backend to receive api calls from browser
app.use(cors());

// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
