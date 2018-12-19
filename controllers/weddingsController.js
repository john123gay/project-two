var express = require("express");

var router = express.Router();

var wedding = require("../models/wedding.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  wedding.all(function(data) {
    var hbsObject = {
      weddings: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/weddings", function(req, res) {
  wedding.create(["name", "essentials", "amount"], [req.body.name, req.body.essentials, req.body.amount], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/weddings/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  wedding.update(
    {
      essentials: req.body.essentials
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});
router.delete("/api/weddings/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  wedding.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
