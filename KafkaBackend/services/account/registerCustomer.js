"use strict";
const bcrypt = require("bcrypt");
const { customerRegister } = require("../../models/registration");
const customer = require("../../models/customer.model");
const Mongoose = require("mongoose");
const uuid = require("uuid/v4");

let registerCustomer = async (msg, callback) => {
  try {
    const check = await customerRegister.findOne({
      where: { emailId: msg.email }
    });
    if (check)
      return callback({ status: 403, res: "Account already exists" }, null);
    else {
      const customer_register_sql = await customerRegister.create({
        _id: uuid(),
        name: msg.name,
        emailId: msg.email,
        password: bcrypt.hashSync(msg.password1, 10)
      });
      const customer_register_mongo = await customer.create({
        name: msg.name,
        emailId: msg.email.toLowerCase()
      });
      if (customer_register_sql && customer_register_mongo) {
        return callback(null, { status: 200, res: "" });
      } else {
        return callback(
          { status: 500, res: "Error caught while inserting record" },
          null
        );
      }
    }
  } catch (err) {
    return callback(
      { status: 500, res: "Error caught while inserting record" },
      null
    );
  }
};

exports.registerCustomer = registerCustomer;
