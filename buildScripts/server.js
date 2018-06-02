import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import db from '../database.js';

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
  console.log(__dirname);
});

app.get('/test', 
  (req, res, next) => {
    console.log('Correct call');
    next();
  },
  db.test,
  db.initialize, 
  db.sync,
  db.addLocation,
  db.addTags,
  // () => db.addLocation('chipotle'),
  // () => db.addTags(['burritoes']),
  // db.viewLocations,
  // db.viewTags,
  function(req, res, next) {
    res.send('hello');
  } 
);

function testfn(req, res, next) {
  console.log('called next');
  next();
}


app.listen(port, function (error) {
  if(error) {
      console.log(error);
  } else {
      open(`http://localhost:${port}`)
  }
});