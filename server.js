// server.js


    // set up ========================
   var express  = require('express');
  var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
   var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

var db

MongoClient.connect('mongodb://localhost:27017/drivercheck', (err, client) => {
  if (err) return console.log(err)
  db = client.db('drivercheck') // whatever your database name is
  app.listen(8070, () => {
    console.log('listening on 8070 mongo')
  })
})
	
    app.use(express.static(__dirname ));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

	
// routes ======================================================================

    app.get('/clients', function(req, res) {
		db.collection('clients').find().toArray((err, clients) => {
			if (err) return console.log(err)
			res.json(clients);
		})
		
    });

    app.post('/clients', function(req, res) {
		db.collection('clients').save(req.body, (err, result) => {
			if (err) return console.log(err)
			//console.log('saved to database')
		})
		
		db.collection('clients').find().toArray((err, clients) => {
			if (err) return console.log(err)
			res.json(clients);
		})

	});
	
	app.delete('/clients/:client_id', (req, res) => {
		//console.log(req.params.client_id);
		var client_id = req.params.client_id;
		
		var query = db
		.collection('clients')
		.remove( {_id: ObjectID.createFromHexString( client_id ) },
		(err, clients) => {
			if (err) return console.log(err)
			//console.log(clients);
		})
		
		
	});
	
    app.get('*', function(req, res) {
        res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
	
	