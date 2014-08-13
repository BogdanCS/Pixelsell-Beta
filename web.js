var express = require ('express');
var multer = require ('multer');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(multer({ dest: './tmp/'}));
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response)
       {response.send(fs.readFileSync("index.html",'utf-8'));});


app.post('/images/user', function(request, response)
{
  stamp = Date.now();
  var serverPath = __dirname + '/public/images/user/user' + stamp + '.jpeg';
  var toReturnPath = '/images/user/user' + stamp + '.jpeg';
  fs.rename(request.files.userPhoto.path, serverPath,function(error)
    {
      if(error) {
	response.send({error: 'Ah crap! Something bad happened: ' + error });
	return;
	}

      response.send({path: toReturnPath});
    });
});

app.post('/images/user/html', function(request, response)
{
  stamp = Date.now();
  var toWritePath = __dirname + '/tmp/forIndex/file' + stamp + '.txt';
  file = fs.createWriteStream( toWritePath, {flags: "a"});
  file.write(new Buffer(request.body.toWrite));
});

var port =process.env.PORT || 8080;
app.listen(port, function()
	  {console.log("Listening on " + port);});
