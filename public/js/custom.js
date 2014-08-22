function Point (requiredX, requiredY)
{
  this.xAxis = requiredX;
  this.yAxis = requiredY;
  this.inside = function (rectangle)
  {
    if (rectangle instanceof Rectangle)
      return this.xAxis > rectangle.upperLeft.xAxis && this.xAxis < rectangle.bottomRight.xAxis &&
	     this.yAxis < rectangle.upperLeft.yAxis && this.yAxis > rectangle.bottomRight.yAxis;
      //here a callback may be needed
    else
      console.log ("Please supply a Rectangle");
  };
}

// Takes two Points
function Rectangle (requiredUL, requiredBR)
{
  if (requiredUL instanceof Point && requiredBR instanceof Point)
  {
    this.upperLeft = requiredUL;
    this.bottomRight = requiredBR;

    //this.upperRight = new Point(upperLeft.yAxis, bottomRight.xAxis);
    //this.bottomLeft = new Point(upperLeft.xAxis, bottomRight.yAxis);
  }
  else
    console.log("Please supply two points: " + requiredUL + "," + requiredBR);

  this.collide = function (rectangle, cb)
  {
    var colliding = true;
    console.log(rectangle);
    console.log(rectangle.upperLeft.xAxis + "," + rectangle.upperLeft.yAxis + "," + rectangle.bottomRight.xAxis + "," + rectangle.bottomRight.yAxis);
    console.log(this.upperLeft.xAxis + "," + this.upperLeft.yAxis + "," + this.bottomRight.xAxis + "," + this.bottomRight.yAxis);
    // If one rectangle it's over ther other than they don't collide
    if (this.upperLeft.yAxis > rectangle.bottomRight.yAxis ||
	rectangle.upperLeft.yAxis > this.bottomRight.yAxis)
      colliding = false;

    // Analog for left direction
    if (this.upperLeft.xAxis > rectangle.bottomRight.xAxis ||
	rectangle.upperLeft.xAxis > this.bottomRight.xAxis)
      colliding = false;

    if (colliding)
    {
     var redUpperLeft,redBottomRight;
     console.log("colliding");
     if (this.upperLeft.inside(rectangle))
       redUpperLeft = this.upperLeft;
     else if (this.upperLeft.yAxis < rectangle.upperLeft.yAxis &&
	      this.upperLeft.xAxis < rectangle.upperLeft.xAxis)
       redUpperLeft = rectangle.upperLeft;
     else if (this.upperLeft.yAxis < rectangle.upperLeft.yAxis)
       redUpperLeft = new Point(this.upperLeft.xAxis, rectangle.upperLeft.yAxis);
     else
       redUpperLeft = new Point(rectangle.upperLeft.xAxis,this.upperLeft.yAxis);

     if (this.bottomRight.inside(rectangle))
       redBottomRight = this.bottomRight;
     else if (this.bottomRight.yAxis > rectangle.bottomRight.yAxis &&
	      this.bottomRight.xAxis > rectangle.bottomRight.xAxis)
       redBottomRight = rectangle.bottomRight;
     else if (this.bottomRight.yAxis > rectangle.bottomRight.yAxis)
       redBottomRight = new Point(this.bottomRight.xAxis, rectangle.bottomRight.yAxis);
     else
       redBottomRight = new Point (rectangle.bottomRight.xAxis, this.bottomRight.yAxis);

     // return new Rectangle (red)
     cb (new Error(new Rectangle(redUpperLeft, redBottomRight)), 0);
    }
    else
     cb (null, 0);
  }; // collide
}

////////////////////// above code should be moved in geometry.js

// function collision (
// We will store all the images as Rectangles
var images;
// var redRect

function startDraw (evt)
{
  $(".blueRct").remove();
  var x1Position = evt.pageX;
  var y1Position = evt.pageY;
  //alert ("Click position is " + x1Position + "," +  y1Position);

  // Reset from previous draw
  var price = 1; //to update - growing price
  var priceTag = $("<h2>1$</h2>");
  $("#priceCount").find("h2").remove();
  $("#cnt-button").prop('disabled', true);

  var currentRctObj = new Rectangle(new Point(0,0),new Point(0,0));
  // to move here currentRct for efficiency

  function updateDraw (evt2)
  {
    var x2Position = evt2.pageX;
    var y2Position = evt2.pageY;

    var widthRct = Math.abs(x2Position - x1Position);
    var heightRct = Math.abs(y2Position - y1Position);

    var currentRct = $("<canvas/>", {'class' : 'blueRct'}).prop({width: widthRct,
								 height: heightRct});

    if (x2Position >= x1Position && y2Position >= y1Position)
    {
      currentRct.css({'top' : y1Position,
      		     'left': x1Position,
		     'right': 'auto',
		     'bottom': 'auto'});
      currentRctObj.upperLeft = new Point(x1Position, y1Position);
      currentRctObj.bottomRight = new Point(x2Position, y2Position);
    }
    else if (x2Position < x1Position && y2Position >= y1Position)
    {
      currentRct.css({'top' : y1Position,
		      'left': 'auto',
		      'right': $(window).width() - x1Position,
		      'bottom': 'auto'});
      currentRctObj.upperLeft = new Point(x2Position, y1Position);
      currentRctObj.bottomRight = new Point(x1Position, y2Position);
    }
    else if (x2Position >= x1Position && y2Position < y1Position)
    {
      currentRct.css({'top' : 'auto',
		      'left': x1Position,
		      'right': 'auto',
		      'bottom': $(window).height() - y1Position});
      currentRctObj.upperLeft = new Point(x1Position, y2Position);
      currentRctObj.bottomRight = new Point(x2Position, y1Position);
    }
    else
    {
       currentRct.css({'top' : 'auto',
		       'left': 'auto',
		       'right': $(window).width() - x1Position,
		       'bottom': $(window).height() - y1Position});
      currentRctObj.upperLeft = new Point(x2Position, y2Position);
      currentRctObj.bottomRight = new Point(x1Position, y1Position);
    }

    // Search for collisions between currentRctObj and images
    async.mapLimit(images, 1024,currentRctObj.collide.bind(currentRctObj), function (err, results)
    {
	if (err)
	{
          console.log(err);
          console.log(results);
	  var redRect = err.message;
	  console.log ("redRect: " + redRect.upperLeft.xAxis);
	}
	else
	  console.log ("hmmm");
    });

    $(".blueRct").remove();
    $("#select").append(currentRct);

    priceTag.text((widthRct * heightRct * price) +"$");
    $("#priceCount").find("h2").remove();
    $("#priceCount").append(priceTag);

    //Enable button
    $("#cnt-button").prop('disabled', false);

    // to add blocking stuff
  }

  $("#select").on("mousemove", updateDraw);

  function finishDraw(evt3)
  {
    $("#select").off("mousemove", updateDraw);
    // $(".blueRct").animatedBorder({size : 1, color : '#3b6cc'});
    // do stuff
  }

  // finish draw on mouseup
  $("#select").on("mouseup", finishDraw);
}

function dialogWindow()
{
  $("#dialog").dialog("open");
  $("#upload-button").on("click", function(){$("#dialog").find("input").click();});

  // To add - change uploaded file

  // close dialog function
  $("#dialog").on("dialogclose", function(evt, ui){
  if ( $("#confirm-button").hasClass("hidden") ) ;
  else $("#confirm-button").addClass("hidden");
  console.log("dialog close function");
  $(this).find("img").remove();
  $("#uploadForm").off("submit", submitHandler);
  $("#upload-button").off();
  $("#confirm-button").off();
  });

  // function to use in setInterval
  var workFile = function()
  {
    console.log($("#userPhotoInput").val());
    if ($("#userPhotoInput").val() !== '')
    {
      clearInterval(timerId);
      console.log("SUBMITTED");
      $("#dialog").find("img").remove();
      $("#confirm-button").off();
      $("#uploadForm").submit();
    }
  };

  // Check for file
  var timerId;
  timerId = setInterval(workFile, 500);

  var submitHandler = function()
  {
   $(this).ajaxSubmit({
     error: function(xhr)
     {
       console.log('Error'+ xhr.status);
     },
     success: function(response)
     {
       console.log(response.path);
       var img = $("<img src=" + response.path + "></img>");

       $("#dialog").find("#upload-button").after(img);
       $("#dialog").find("#confirm-button").removeClass("hidden");

       // now i want to be able to change the img
	$("#userPhotoInput").val("");
	timerId = setInterval(workFile, 500);


       $("#confirm-button").on("click", function(){
	 /* canvas filled with img
	 var canvas = $(".blueRct").get(0);
	 var ctx = canvas.getContext("2d");
	 var pat = ctx.createPattern(img.get(0), 'no-repeat');
	 ctx.rect(0,0,$(".blueRct").width(),$(".blueRct").height());
	 ctx.fillStyle = pat;
	 ctx.fill();*/

	 // replace blueRct with img
	 canvas = $(".blueRct");
	 img.css({"position":"absolute",
		  "top": canvas.css("top"),
		  "left" : canvas.css("left"),
		  "right" : canvas.css("right"),
		  "bottom" : canvas.css("bottom")});
	 img.width(canvas.width());
	 img.height(canvas.height());
	 img.addClass("toBeProcessed");
	 canvas.remove();
	 $("body").append(img);

	 // close dialog
	 $("#dialog").dialog("close");
	 $("#userPhotoInput").val("");

	 // reset interval function
	 clearInterval(timerId);

	 // return to initial state
	 initialMode();
       });
     }
   });

   // Stop the form for submitting so we avoid refresh
   return false;
 };
  // submit event listener
  $("#uploadForm").on("submit",submitHandler);


}

function selectMode()
{
  // Find all user images and create rectangles
  var imagesJQ = $("body").children("img");
  var imagesArr = imagesJQ.toArray();

  async.mapLimit(imagesArr, 1024, function(img,cb){
    var upperLeft = new Point(img.offsetLeft, img.offsetTop);
    var bottomRight = new Point(img.offsetLeft + img.offsetWidth, img.offsetTop + img.offsetHeight);
    var rectangle = new Rectangle(upperLeft, bottomRight);
    cb(null, rectangle);
    }, function (err, results) {images = results;});

  // Show instructions
  $("#cnt").removeClass("hidden");
  $("#select").addClass("select-screen");

  // Change button
  $(this).removeClass("btn-primary");
  $(this).addClass("btn-success");
  $(this).text("Confirm");
  $(this).prop('disabled', true);

  // Change event handler on button
  $(this).off("click", selectMode);
  $(this).on("click", dialogWindow);

  // Enter select tool mode
  $("#select").on("mousedown", startDraw);

  // Set price tag
  $("#priceCount").text("");
  $("#priceCount").removeClass("hidden");

  // to add - go back to previous mode
}

// Reverse function for selectMode
function initialMode()
{
  $("#cnt").addClass("hidden");
  $("#select").removeClass("select-screen");

  $("#cnt-button").addClass("btn-primary");
  $("#cnt-button").removeClass("btn-success");
  $("#cnt-button").text("Take a chunk");
  $("#cnt-button").prop('disabled', false);

  $("#cnt-button").on("click", selectMode);
  $("#cnt-button").off("click", dialogWindow);

  $("#select").off("mousedown", startDraw);

  // update HTML on server
  var htmlToWrite = $(".toBeProcessed").get(0).outerHTML;
  htmlToWrite = htmlToWrite.replace("toBeProcessed","");
  // console.log(htmlToWrite);
  $.ajax({ type: "POST",
	   url: "/images/user/html",
	   data: { "toWrite" : htmlToWrite }});
  $(".toBeProcessed").removeClass("toBeProcessed");


  $("#priceCount").addClass("hidden");
}

$(document).ready(function (){

  // Maybe on load instead of ready?
  $("#cnt-button").prop('disabled', false);
  $( "#dialog" ).dialog({ autoOpen: false,
			  modal: true,
			  draggable: true});

  $("#cnt-button").on("click", selectMode);
  $("#userPhotoInput").val('');

});
