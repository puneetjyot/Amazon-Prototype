"use strict";
const customer = require("../../../models/customer.model");

const updateProfilePicture = (msg, callback) => {
  console.log("Inside updateProfilePicture of customer");
  var res = {};
  customer.findById(msg.id, (err, user) => {
    if (err) {
      res.status = 500;
      res.message = "Database Error";
      callback(null, res);
    }
    if (user) {
      user.profilePictureUrl = msg.fileUrl;
      user.save(saveError => {
        if (saveError) {
          res.status = 500;
          res.message = "Error in Data";
        } else {
          let userObject = {
            profilePictureUrl: user.profilePictureUrl
          };
          res.status = 200;
          res.message = userObject;
        }
        callback(null, res);
      });
    }
  });
};

exports.updateProfilePicture = updateProfilePicture;
