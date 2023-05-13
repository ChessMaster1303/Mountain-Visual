class sunmoon {
  constructor(x, y) {
    this.pos = createVector(x, y)
    
    //this.state is defined here; explanation is covered under sun.dayCycle() function.
    this.state = 0
  }
  
  
  show() {
    //Daytime --> Shows the Sun.
    if(this.state == 0) {
      //The glowing aura around the Sun.
      for(let i = 0; i < 200; i++) {
        stroke(255, 255, 0, i)
        noFill()
        ellipse(this.pos.x, this.pos.y, (200 - i)/200 * width/2)
      }
      
      //The "actual" solid (actually gaseous) Sun.
      fill(255, 255, 0, 255)
      ellipse(this.pos.x, this.pos.y, width/5)
      
      noStroke()
    }
    
    //Night --> Shows the Moon.
    else if(this.state == 1) {
      fill(120)
      ellipse(this.pos.x, this.pos.y, width/5)
    }
  }
  
  
  dayCycle() {
    //Every day is 1800 frames, every night is 1800 frames
    
    //this.dayProgress is a value ranging from 0 to 1, 0 being the start of the time period and 1 being the end of the time period.
    this.dayProgress = (frameCount % 1800) / 1800
    
    //this.pos.x is proportional to this.dayProgress
    this.pos.x = this.dayProgress * width
    
    //Equation of circle, slightly modified, y as subject of formula, substitute this.pos.x to find the this.pos.y.
    this.pos.y = - sqrt(pow(width/2, 2) - pow((this.pos.x - width/2),2)) + height/2
    
    //Keeps track of whether it is day or night.
    //0 is day, 1 is night.
    this.state = floor(frameCount / 1800) % 2
  }
  
  //Sets the background, depending on whether it is day or night.
  backgroundCalc() {
    if(this.state == 0) {
      //A pale blue sky background
      background(135, 206, 235)
    }
      
    
    else if(this.state == 1) {
      background(12, 20, 69)
      
      //Starter Code (unfinalised) for stars in the night sky; problem is that the stars X and Y change when they aren't supposed to.
      //for(let i = 0; i < 3; i++) {
        //let StarColoursChoices = [[72, 63, 254], [255, 66, 39], [214, 85, 199]]
        
        //let StarColour = StarColoursChoices[floor(random(0, 2))]
        //fill(StarColour[0], StarColour[1], StarColour[2])
        //let starX = random(0, width)
        //let starY = random(0, height * 1/4)
        
        //ellipse(starX, starY, width/100)
    //}
    }
  }
}