/*
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
     console.log("wtf");
     redRct.push(new Rectangle(redUpperLeft, redBottomRight));*/
//console.log(redRct);
      /*var canvas = currentRct.get(0);
      var ctx = canvas.getContext("2d");
      async.mapLimit(redRct, 1024, function (rectangle,cb){
      console.log(rectangle);
      relXUL = rectangle.upperLeft.xAxis - currentRctObj.upperLeft.xAxis;
      relYUL = rectangle.upperLeft.yAxis - currentRctObj.upperLeft.yAxis;
      relXBR = rectangle.bottomRight.xAxis - currentRctObj.upperLeft.xAxis;
      relYUL = rectangle.bottomRight.yAxis - currentRctObj.upperLeft.yAxis;
      ctx.rect(relXUL,relYUL,relXBR,relYUL);
      ctx.fillStyle = "red";
      ctx.fill();*/
      /*
      if(redRct[0] !== null)
      drawGreenLight = false;
      cb(null, 0); //}
     // , function (err, results){console.log("success");});
    */
/* canvas filled with img
       
  
	 var canvas = placeHolder.get(0);
	 var ctx = canvas.getContext("2d");
	 var pat = ctx.createPattern(img.get(0), 'no-repeat');
         console.log(img.get(0));
	 ctx.rect(0,0,placeHolder.width(),placeHolder.height());
	 ctx.fillStyle = pat;
	 ctx.fill();
       */
/*  this.inside = function (rectangle)
  {
    if (rectangle instanceof Rectangle)
      return this.xAxis > rectangle.upperLeft.xAxis && this.xAxis < rectangle.bottomRight.xAxis &&
	     this.yAxis < rectangle.upperLeft.yAxis && this.yAxis > rectangle.bottomRight.yAxis;
      //here a callback may be needed
    else
      console.log ("Please supply a Rectangle");
  };

*/
