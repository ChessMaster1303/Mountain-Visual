function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //I actually don't think I used this, but if I do in the future, working with degrees is way better than with radians.
  angleMode(DEGREES)
  
  //The array storing all the raindrop objects.
  raindrops = []
  
  //Creates 150 raindrops that start anywhere from left to right on the canvas, but the height is double that of canvas.
  for(i = 0; i < 150; i++) {
    x = random(0, width)
    
    //The y value starts at -height to minimise the strange gap of no raindrops.
    y = random(-height, height)
    raindrops.push(new raindrop(x, y, 0.01))
  }
  
  //Due to my limited mathematical ability, I can map the Sun and Moon moving only in an circular motion, rather than an elliptical motion.
  sun = new sunmoon(height/2, height/2)
}

function draw() {
  sun.backgroundCalc()
  mountain(0.005)
  
  for(i = 0; i < raindrops.length; i++) {
    raindrops[i].show()
    raindrops[i].phenomena()
    raindrops[i].physics()
    raindrops[i].touchEdge()
  }
  
  sun.show()
  
  //Keeps track of time
  sun.dayCycle()
}