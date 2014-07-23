function startDraw (evt)
{
  $(".blueRct").remove();
  var x1Position = evt.pageX;
  var y1Position = evt.pageY;
  //alert ("Click position is " + x1Position + "," +  y1Position);
  
  function updateDraw (evt2)
  {
    var x2Position = evt2.pageX;
    var y2Position = evt2.pageY;

    var widthRct = Math.abs(x2Position - x1Position);
    var heightRct = Math.abs(y2Position - y1Position);

    // Not sure
    var tmp = 0;
    if (x2Position < x1Position)
    {
      tmp = x1Position;
      x1Position = x2Position;
      x2Position = tmp;
    }

    if (y2Position < y1Position)
    {
      tmp = y1Position;
      y1Position = y2Position;
      y2Position = tmp;
    }
    

    var currentRct = $("<canvas/>", {'class' : 'blueRct'}).prop({width: widthRct,
                                                                 height: heightRct});
    currentRct.css({'top' : y1Position,
		    'left': x1Position });

    $(".blueRct").remove();
    $("#select").append(currentRct);

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
