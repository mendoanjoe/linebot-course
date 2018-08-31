/* 
* Module Loads
*/
const app = require('express')();

/*
* Route End Point
*/
app.get('/', (req, res) => {
  res.send('Hello World!')
});

/*
* Start Server
*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Example app listening on port 3000!')
});