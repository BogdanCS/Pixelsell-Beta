var express = require ('express');
var multer = require ('multer');
var bodyParser = require('body-parser');
var fs = require('fs');
var async = require('async');

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
  var filePost = fs.createWriteStream( toWritePath, {flags: "a"});
  filePost.write(new Buffer(request.body.toWrite));
});



var port =process.env.PORT || 8080;
app.listen(port, function()
	  {console.log("Listening on " + port);});




file = fs.createWriteStream(__dirname + '/public/index.html', {flags: "r+"});
file.pos = 1325;
var fullPaths = [];
var greenLight = true;

var timerId = setInterval( function(){
  if (greenLight)
  { 
  greenlight = false;
  var path = __dirname + '/tmp/forIndex/';
  fs.readdir(path, function(err, files){
    async.mapLimit(files,1000,function(filename,cb){cb(null, path+filename);}, function(err, results){
      fullPaths = results;
      async.mapLimit(results,1000,fs.readFile, function(err, results){
	// write results at pos in order
	var writeCB = function(err, written, buffer)
	  {
	      console.log("written");
	      console.log(fullPaths[index]);
	      console.log("file.pos before:" + file.pos);
	      file.pos = file.pos - "</body></html>".length;
	      console.log("file.pos before:" + file.pos);
	      console.log(results[index].toString().length);
	      fs.unlink(fullPaths[index], function (err) {if (err) throw err;
							console.log("deleted");});
	      console.log (results.length);
	      if (index + 1 < results.length)
	      {
		  index++;
		  file.write(new Buffer(results[index] + "</body></html>"), writeCB);
	      }
              else // we make sure that we don't have two instances(setInterval) running at the same time
                greenLight = true;
	  };
	var index = 0;
	console.log("penis");
	console.log(results.length);
	if (results.length > 0)
	  {console.log("penis2");
	   console.log(file.path);
	   console.log(file.pos);
	   console.log(results[index]);
	   console.log(writeCB);
	   file.write(new Buffer(results[index] + "</body></html>"),writeCB);}


    });
   });
  });
  }
},1000);
