// server.js

const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const gatewaysRouter = require('./routes/gateways');



const app = express();


const port = process.env.PORT || 3002;

app.use('/api', gatewaysRouter);
app.use(bodyParser.json());

app.get('/',(req,res) => {
  res.send("THIS WORKS !!")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app