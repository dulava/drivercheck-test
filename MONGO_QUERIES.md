Create and after install MongoDB into this folder
- c:\mongo   
- c:\mongo\data
- c:\mongo\log

From command (admin) line type:

first time to install and have mongodb running:
- cd\mongo\bin
- mongod --directoryperdb --dbpath c:\mongo\data\db --logpath c:\mongo\log\mongo.log --logappend --rest --install
- net start mongodb
-----------------------------------------------------------------------------

- c:\mongo\bin is folder to be
- mongo Start the mongo Shell
- exit to exit mongo
- db To check-display the database you are using, type
- show dbs To list all database

- use drivercheck To use specific database (Create does not exist)
- Create user with Roles { You cannot create users on the local database.} -------------------------------------------
  db.createUser({ 	user:"dule", 
		pwd:"12345", 
		roles: ["readwrite","dbAdmin"] 
});
--------------------------------------------------------------------------------------------------------------------------------
- Create new collection (or the other words to create a table)
  db.createCollection("clients"); 

- Delete all in collection 
db.createCollection("clients "); 

- insert new clients, Create new record a populate with data
  db.clients.insert({  client_name:"Transat",  client_phone:"519-123-1234", client_email:"transat@google.ca"  });  

- insert more than one new document  at the time
  db.clients.insert([{   clients_name:"A",  clients_phone:"519-543-9876", clients_email:"a@google.ca"   }
                            ,{   clients_name:"B",  clients_phone:"519-665-3222", clients_email:"b@gmail.com"  }]);  

- list all document in client collection
  db.clients.find();
  db.clients.find().pretty(); 

- update one client (update listed fields and delete unlisted)
  db.clients.update({ client_name:"Transat" this is SearchString }
                                   ,{  client_name:"TranSAT", client_phone:"519-123-1234", client_email:"transat@google.ca" });  
 
- update one client (update listed fields and keep unlisted fields)
  db.clients.update({ client_name:"Transat" this is SearchString }
                                   ,{  $set:{client_name:"TranSAT"}  });  

-  delete one client field (delete listed field and keep unlisted fields)
   db.clients.update({ client_name:"Transat" this is SearchString }
                                    ,{  $unset:{client_email:""}   });  

-  change field name {for one client only}
   db.clients.update({ client_name:"Transat" }
                                    ,{ $rename:{"client_phone" : "client_cell"}  });  

-  remove one client
   db.clients.remove ({ client_name:"Transat" } , { justOne:true }); 
or all with "Transat"
   db.clients.remove ({ client_name:"Transat" }); 

-  sort clients 1 or -1 
   db.clients.find().sort ({ client_name:1 });  
	
-  count clients 
   db.clients.find().count();  
or
   db.clients.find({client_name:"Transat"}).count();  

--------------------------------------------------------------------------------------------------------------------


c:\mongo\bin 
mongo 	
use drivercheck 

db.createCollection("clients"); 
db.clients.insert({  client_name:"Transat",  client_phone:"519-123-1234",  client_email:"transat@google.ca"  });  
db.clients.insert({  client_name:"Bell",        client_phone:"888-188-0000",  client_email:"bell@gmail.ca"  });  
db.clients.find();

db.createCollection("employees"); 
db.employees.insert({  client_id:"XXX",  first_name:"John",    last_name:"doe",       email:"john@google.com"  });  
db.employees.insert({  client_id:"YYY",  first_name:"Drago",  last_name:"Perovic", email:"john@google.com"  });  

db.createCollection("tests"); 
db.tests.insert({  employee_id:"ZZZ",   test_name:"cocaine",            test_date:"2018.02.24",    test_result:"positive"  });  
db.tests.insert({  employee_id:"WWW",   test_name:"crack cocaine",  test_date:"2017.11.21",    test_result:"negative"  });  






db.getCollectionInfos({});
