const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));



const PORT = 3000

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

