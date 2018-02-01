var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');


var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next){
var resultArray = [];
mongo.connect(url, function(err, db){
  assert.equal(null, err);
  var cursor = db.collection('product-data').find();
  cursor.forEach(function(doc, err){
    assert.equal(null, err);
    resultArray.push(doc);
  }, function(){
    db.close();
    res.render('index', {items: resultArray});
  });
});
});

router.post('/insert', function(req, res, next){
  var item = {
    product_name: req.body.product_name,
    product_id: req.body.product_id
  };

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('product-data').insertOne(item, function(err, result){
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });
  res.redirect('/');
});

/*router.post('/update', function(req, res, next){
  var item = {
    product_name: req.body.product_name    
  };
  var product_id: req.body.product_id;

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('product-data').updateOne({"_id": ObjectId(product_id)}, {$set: item}, function(err, result){
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});*/


module.exports = router;
