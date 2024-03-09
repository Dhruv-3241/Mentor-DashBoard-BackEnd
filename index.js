const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use("/api", router);

app.listen(4000,'0.0.0.0', () => {
  console.log('Server is running on port 4000');
});

