// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var wedding = {
  all: function(cb) {
    orm.all("weddings", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("weddings", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("weddings", objColVals, condition, function(res) {
      cb(res);
    });
  },

delete: function(condition, cb) {
  orm.delete("weddings", condition, function(res) {
    cb(res);
  });
}
};

// Export the database functions for the controller (catsController.js).
module.exports = wedding;
