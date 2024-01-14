const connectToMongo = require('./db');
const express = require('express');
require('dotenv').config()

connectToMongo();
const app = express()
const port = 4500

// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
