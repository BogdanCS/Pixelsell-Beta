var express = require ('express');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response)
       {response.send(fs.readFileSync("index.html",'utf-8'));});

var port =process.env.PORT || 8080;
app.listen(port, function()
	  {console.log("Listening on " + port);});
