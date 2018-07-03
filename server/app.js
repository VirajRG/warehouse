const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('../build'))

const server = app.listen(8081, () => {
  const host = server.address().address
  const port = server.address().port

  console.log("Listening at http://%s:%s", host, port);
  //at localhost: http://localhost:8081/
});