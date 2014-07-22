function startDraw (evt)
{
  var xPosition = evt.pageX;
  var yPosition = evt.pageY;
  alert ("Click position is " + xPosition + "," +  yPosition);
}

function selectMode()
{
  $("#cnt").removeClass("hidden");
  $("#select").addClass("select-screen");

  $("#select").on("click", startDraw);
}


$(document).ready(function (){

  $("#cnt-button").on("click", selectMode);
  
});
