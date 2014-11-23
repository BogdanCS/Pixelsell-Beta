function Point (requiredX, requiredY)
{
  this.xAxis = requiredX;
  this.yAxis = requiredY;
}

// Takes two Points
function Rectangle (requiredUL, requiredBR)
{
  if (requiredUL instanceof Point && requiredBR instanceof Point)
  {
    this.upperLeft = requiredUL;
    this.bottomRight = requiredBR;
  }
  else
    console.log("Please supply two points: " + requiredUL + "," + requiredBR);

  this.collide = function (rectangle, cb)
  {
    var colliding = true;
    // If one rectangle it's over ther other than they don't collide
    // to check if 4 is the right value
    // canvas might be responsive now (wrong)!!

    if (this.upperLeft.yAxis > rectangle.bottomRight.yAxis + 4 ||
	rectangle.upperLeft.yAxis > this.bottomRight.yAxis + 4)
      colliding = false;

    // Analog for left direction
    if (this.upperLeft.xAxis > rectangle.bottomRight.xAxis + 4 ||
	rectangle.upperLeft.xAxis > this.bottomRight.xAxis + 4)
      colliding = false;

    if (colliding) 
      cb (new Error("Colliding"), 0);
    else
      cb (null, 0);
  }; // collide
}
