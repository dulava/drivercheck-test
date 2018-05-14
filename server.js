// server.js

// set up
const express  = require('express');
const app      = express();                               // create our app w/ express
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

// initialize
var db
MongoClient.connect('mongodb://localhost:27017/drivercheck', (err, client) => {
  if (err) return console.log(err)
  db = client.db('drivercheck') // whatever your database name is
  app.listen(8070, () => {
    console.log('listening on 8070 mongo')
  })
})
	
app.use(express.static(__dirname ));                 
app.use(morgan('dev'));                              
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());                          
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
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
        res.sendfile('./index.html');
    });
	
	