var throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 1;
var PORT = process.env.PORT || 5000;
var ENV = process.env.ENV || 'local';

// support multi http request
throng({
  workers: WORKERS,
  lifetime: Infinity
}, start);

function start() {
  var compression = require('compression');
  var express = require('express');
  var morgan = require('morgan');
  var prerender = require('prerender-node');
  var app = express();

  app.use(morgan('dev'));
  app.use('*', function(req, res, next) {
    var shouldRedirect = false;
    var host = req.get('Host');

    if (!host.match(/^www\..*/i) && ENV === 'prod') {
      host = 'www.' + host;
      shouldRedirect = true;
    }

    if (req.headers['x-forwarded-proto'] !== 'https') {
      shouldRedirect = true;
    }

    if (shouldRedirect && ENV !== 'local') {
      res.redirect(301, 'https://' + host + req.originalUrl);
    } else {
      next();
    }
  });
  app.use(prerender.set('prerenderToken', 'W7C9qOob3QilKJiMu1XN'));
  app.use(compression());
  app.use(express.static('' + __dirname + '/dist'));
  app.use(function(req, res) {
    res.sendfile('dist/index.html');
  });

  app.listen(PORT, onListen);

  function onListen() {
    console.log('Listening on', PORT);
  }
}

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/contacts", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
