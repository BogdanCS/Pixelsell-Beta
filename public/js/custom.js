// We will store all the images as Rectangles
var images;

function startDraw (evt)
{
  $(".blueRct").remove();
  var x1Position = evt.pageX;
  var y1Position = evt.pageY;

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
	currentRct.removeClass("blueRct");
	currentRct.addClass("redRct");
      }
    });

    
    $(".blueRct").remove();
    $(".redRct").remove();
    $("#select").append(currentRct);

    priceTag.text((widthRct * heightRct * price) +"$");
    $("#priceCount").find("h2").remove();
    $("#priceCount").append(priceTag);

    //Enable button if selection is valid
    if (currentRct.hasClass("blueRct"))
      $("#cnt-button").prop('disabled', false);
    else
      $("#cnt-button").prop('disabled', true);
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

<<<<<<< HEAD
  // To add - change uploaded file
  // To add - close dialog function

  // Check for file
  var timerId;
  timerId = setInterval( function(){
    console.log($("#userPhotoInput").val());
=======
  // Canvas - place holder
  var selectTool = $("canvas");
  var fixedHeight = 200;
  var width = fixedHeight * ( selectTool.width() / selectTool.height() );
  var placeHolder = $("<canvas/>", {'class' : 'placeHolder'}).prop({width: width,
								 height: fixedHeight});
  $("#dialog").append(placeHolder);


  // close dialog function
  $("#dialog").on("dialogclose", function(evt, ui){
  if ( $("#confirm-button").hasClass("hidden") ) ;
  else $("#confirm-button").addClass("hidden");
  
  $(this).find("img").remove();
  $("#uploadForm").off("submit", submitHandler);
  $("#upload-button").off();
  $("#confirm-button").off();
  $(this).find("canvas").remove();
  });

  // function to use in setInterval
  var workFile = function()
  {
    
>>>>>>> develop
    if ($("#userPhotoInput").val() !== '')
    {
      clearInterval(timerId);
      
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
       
       var img = $("<img src=" + response.path + "></img>");
<<<<<<< HEAD
       $("#dialog").find("#upload-button").after(img);
       $("#dialog").find("#confirm-button").removeClass("hidden");
       $("#confirm-button").on("click", function(){
         // canvas filled with img
         var canvas = $(".blueRct").get(0);
         var ctx = canvas.getContext("2d");
         var pat = ctx.createPattern(img.get(0), 'no-repeat');
         ctx.rect(0,0,$(".blueRct").width(),$(".blueRct").height());
         ctx.fillStyle = pat;
         ctx.fill();
         // close dialog
         $("#dialog").dialog("close");
         // img sent to server and edit html
         // return to initial state
         initialMode();
=======
       var placeHolder = $(".placeHolder");
       img.width(placeHolder.width());
       img.height(placeHolder.height());


       placeHolder.remove();
       $("#dialog").find("#upload-button").after(img);
       $("#dialog").find("#confirm-button").removeClass("hidden");

       // now i want to be able to change the img
	$("#userPhotoInput").val("");
	timerId = setInterval(workFile, 500);


       $("#confirm-button").on("click", function(){
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
>>>>>>> develop
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

<<<<<<< HEAD
function initialMode()
{
=======
// Reverse function for selectMode
function initialMode()
{
  $("#cnt").addClass("hidden");
  $("#select").removeClass("select-screen");

  var cntButton = $("#cnt-button");
  cntButton.addClass("btn-primary");
  cntButton.removeClass("btn-success");
  cntButton.text("Take a chunk");
  cntButton.prop('disabled', false);

  cntButton.on("click", selectMode);
  cntButton.off("click", dialogWindow);

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
>>>>>>> develop
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
