var express = require("express");
var router = express.Router();
const kafka = require("../../kafka/client");

//Register a customer. Adds new customer record in model customerRegister
router.post("/", async function(req, res) {
  console.log("In customer reg API");
  let msg = req.body;
  msg.route = "registerCustomer";
  kafka.make_request("accounts", msg, function(err, results) {
    console.log(err);
    console.log(results);
    if (err) {
      res.status(err.status).send(err);
    } else {
      res.status(results.status).send(results);
    }
  });
});

module.exports = router;
