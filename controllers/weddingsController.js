var express = require("express");

var router = express.Router();
var path = require("path");
// Requiring our models and passport as we've configured it
var passport = require("../config/passport");

var user = require("../models/users.js");
var wedding = require("../models/wedding.js");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = function (req, res, next) {

  if (req.user) {
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/");
}
// Create all our routes and set up logic within those routes where required.
router.get("/weddings", isAuthenticated, function (req, res) {
  wedding.all(function (data) {
    var hbsObject = {
      weddings: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/weddings", function (req, res) {
  wedding.create(["name", "essentials", "amount"], [req.body.name, req.body.essentials, req.body.amount], function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/weddings/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  wedding.update(
    {
      essentials: req.body.essentials
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});
router.delete("/api/weddings/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  wedding.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

function auth(req, res, next, authMethod) {
  passport.authenticate(authMethod, function (err, user, info) {
    if (err) {
      res.status(500)
      res.json(err)
    }
    if (!user) {
      res.status(401)
      res.json(info.message)
    }
    else {
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        res.status(200)
        res.json("/weddings");
      });
    }
  })(req, res)
}

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", function (req, res, next) {
  auth(req, res, next, "local-login")
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function (req, res, next) {
  auth(req, res, next, "local-signup")
});

// Route for logging user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function (req, res) {
  if (!req.user) {
    // The user is not logged in, send to home page
    res.redirect("/");
  }
  else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

router.get("/", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/weddings");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/login", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/weddings");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Export routes for server.js to use.
module.exports = router;
