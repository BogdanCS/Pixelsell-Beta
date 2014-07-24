function startDraw (evt)
{
  $(".blueRct").remove();
  var x1Position = evt.pageX;
  var y1Position = evt.pageY;
  //alert ("Click position is " + x1Position + "," +  y1Position);
  var price = 1;
  var priceTag = $("<h2>1$</h2>");

  function updateDraw (evt2)
  {
    var x2Position = evt2.pageX;
    var y2Position = evt2.pageY;

    var widthRct = Math.abs(x2Position - x1Position);
    var heightRct = Math.abs(y2Position - y1Position);

    var currentRct = $("<canvas/>", {'class' : 'blueRct'}).prop({width: widthRct,
								 height: heightRct});

    if (x2Position >= x1Position && y2Position >= y1Position)
     currentRct.css({'top' : y1Position,
		     'left': x1Position,
		     'right': 'auto',
		     'bottom': 'auto'});
    else if (x2Position < x1Position && y2Position >= y1Position)
      currentRct.css({'top' : y1Position,
		      'left': 'auto',
		      'right': $(window).width() - x1Position,
		      'bottom': 'auto'});
    else if (x2Position >= x1Position && y2Position < y1Position)
      currentRct.css({'top' : 'auto',
		      'left': x1Position,
		      'right': 'auto',
		      'bottom': $(window).height() - y1Position});
    else
       currentRct.css({'top' : 'auto',
		       'left': 'auto',
		       'right': $(window).width() - x1Position,
		       'bottom': $(window).height() - y1Position});

    $(".blueRct").remove();
    $("#select").append(currentRct);

    priceTag.text((widthRct * heightRct * price) +"$");
    $("#priceCount").find("h2").remove();
    $("#priceCount").append(priceTag);

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

function selectMode()
{
  $("#cnt").removeClass("hidden");
  $("#select").addClass("select-screen");

  $("#select").on("mousedown", startDraw);
}


$(document).ready(function (){

  $("#cnt-button").on("click", selectMode);

});
