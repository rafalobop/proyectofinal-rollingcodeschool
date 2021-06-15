const express = require('express');
require('./config/config');
const mongoose = require('mongoose');
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(require('./rutas/index'));
mongoose.connect(
  'mongodb://localhost:27017/codeschool',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
  }
);

app.listen(process.env.PORT, () => {
  console.log('escuchando en puerto', process.env.PORT);
});
