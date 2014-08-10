var express = require ('express');
var fs = require('fs');

var app = express();
var count = 0;
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response)
       {response.send(fs.readFileSync("index.html",'utf-8'));});

app.post('/public/img', function(request, response)
{
  count++;
  var serverPath = '/public/img/user' + count + '.jpeg';

  fs.rename(request.files.userPhoto.path, serverPath,function(error)
    {
      if(error) {
	response.send({error: 'Ah crap! Something bad happened'});
	return;
	}

      response.send({path: serverPath});
    });
});

var port =process.env.PORT || 8080;
app.listen(port, function()
	  {console.log("Listening on " + port);});
