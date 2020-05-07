"use strict";
const product = require("../../../models/product.model");
//const redisClient = require("../../../redisConfig");

/*
  Check of whether the product we are trying to edit exist or not, and check of the new productName we are giving 
*/
const updateProductWithRedis = (msg, callback) => {
  var res = {};
  product.findById(msg.productId, (err, foundProduct) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    } 
    if(foundProduct){
      foundProduct.productCategory = msg.productCategory;
      foundProduct.productPrice = (Math.round(parseFloat(msg.productPrice) * 100) / 100);
      foundProduct.productDescription = msg.productDescription;
      if(msg.productImagesURL && msg.productImagesURL.length > 0){
        foundProduct.photos = msg.productImagesURL;
      }
      foundProduct.save((saveError, savedProduct) => {
        if(saveError){
          res.status = 500;
          res.message = 'Database Error';
        } else {  
          res.status = 200;
          res.message = foundProduct;
          
          console.log('Deleting from Redis');
          redisClient.del(msg.productId);
          console.log('Deleted from Redis');
        }
        callback(null, res);
      });
    } else {
      res.status = 404;
      res.message = "Not found";
      callback(null, res);
    }
  });
}

exports.updateProductWithRedis = updateProductWithRedis;