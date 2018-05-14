// server.js

    // set up ========================
   var express  = require('express');
  var app      = express();                               // create our app w/ express
  var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
   var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================
	//const MongoClient = require('mongodb').MongoClient
	
    mongoose.connect('mongodb://localhost:27017/drivercheck');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname ));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================  
   	app.listen(8080);
    console.log("App listening on port 8080");

	
  // define model =================


    var Clients = mongoose.model('clients', {
       text : String
    });

	//console.log(Clients);
	
// routes ======================================================================

    // api ---------------------------------------------------------------------
	
    // get all todos
    app.get('/clients', function(req, res) {
		//db.collection('clients').find();
		console.log("got get clients");
		
		res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
        // use mongoose to get all todos in the database
        Clients.find(function(err, clients) {
			console.log( clients );
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(clients); // return all todos in JSON format
			
        });
    });

    // create todo and send back all todos after creation
    app.post('/clients', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Clients.create({
            text : req.body.text,
            done : false
        }, function(err, client) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Clients.find(function(err, clients) {
                if (err)
                    res.send(err)
                res.json(clients);
            });
        });

    });

    // delete a todo
    app.delete('/clients/:client_id', function(req, res) {
        Clients.remove({
            _id : req.params.client_id
        }, function(err, client) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Clients.find(function(err, clients) {
                if (err)
                    res.send(err)
                res.json(clients);
            });
        });
    });
	
	// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
	
	