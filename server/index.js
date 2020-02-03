const express = require('express');
const bodyParser = require('body-parser');

const db = require('../db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client'));

app.get('/api/stores/:id', (req, res) => {
  var id = req.params.id;
  db.getStoreInfo((err, info) => {
    if(err) {
      console.log(err);
    }
    console.log('store info got');
    res.json(info);
  }, id);
});

app.get('/api/items/:id', (req, res) => {
  var id = req.params.id;
  db.getItemInfo((err, info) => {
    if(err) {
      console.log(err);
    }
    console.log('item info got');
    res.json(info);
  }, id);
});

app.get('/api/inventory/:storeID/:itemID', (req, res) => {
  var storeID = req.params.storeID;
  var itemID = req.params.itemID;
  db.getStockInfo((err, info) => {
    if(err) {
      console.log(err);
    }
    console.log('item info got');
    res.json(info);
  }, storeID, itemID);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});