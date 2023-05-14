function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log("Window Width is " + round(width) + " pixels.")
  console.log("Window Height is " + round(height) + " pixels.")
  
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
  
  gravSlider = createSlider(0, 0.01, 0.001, 0.0001)
  daySlider = createSlider(100, 6000, 1800, 10)
}


function draw() {
  //These allow the slider values to control the actual phenomena shown.
  values = sliderCreate()
  gravCoEff = values.x
  dayLength = values.y
  
  
  //The background RGB values are determined by calculations in the Object Sun.
  colours = sun.backgroundCalc()
  background(colours.x, colours.y, colours.z)
  
  
  //Creates the mountains in the background; parameter is smoothness (inverse).
  mountain(0.005)
  
  
  //Loops through the functions to keep the raindrops going.
  for(i = 0; i < raindrops.length; i++) {
    raindrops[i].show()
    raindrops[i].phenomena(gravCoEff)
    raindrops[i].physics()
    raindrops[i].touchEdge()
  }
  
  
  //Self-explanatory; shows the Sun.
  sun.show()
  
  
  //Keeps track of time, at least in the sense of the sketch. It controls day/night.
  sun.dayCycle(dayLength)
  
  
  //It adds a little more aesthetic value to the sliders (box, -+).
  sliderShow()
}


function windowResized() {
  //Allows for resizing of the canvas; some wacky things do happen if you do it to the extremes.
  createCanvas(windowWidth, windowHeight)

  console.log("New Window Width is " + round(width) + " pixels.")
  console.log("New Window Height is " + round(height) + " pixels.")
}