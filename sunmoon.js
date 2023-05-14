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
      
      fill(colours.x, colours.y, colours.z, 50)
      ellipse(this.pos.x + width/10, this.pos.y, width * 2/8)
    }
  }
  
  
  dayCycle(dayLength) {
    //By default, every day is 1800 frames, every night is 1800 frames
    
    //this.dayProgress is a value ranging from 0 to 1, 0 being the start of the time period and 1 being the end of the time period.
    this.dayProgress = (frameCount % dayLength) / dayLength
    
    //this.pos.x is proportional to this.dayProgress
    this.pos.x = this.dayProgress * width
    
    //Equation of circle, slightly modified, y as subject of formula, substitute this.pos.x to find the this.pos.y.
    this.pos.y = - sqrt(pow(width/2, 2) - pow((this.pos.x - width/2),2)) + height/2
    
    //Keeps track of whether it is day or night.
    //0 is day, 1 is night.
    this.state = floor(frameCount / dayLength) % 2
  }
  
  //Sets the background, depending on whether it is day or night.
  backgroundCalc() {
    let colours = createVector(0, 0, 0)
    
    //Daytime colour phases
    if(this.state == 0) {
      //Sunrise
      if(this.dayProgress < 0.2) {
        colours.x = 50 + floor(this.dayProgress * (135 - 50) * 5)
        colours.y = 70 + floor(this.dayProgress * (206 - 70) * 5)
        colours.z = 128 + floor(this.dayProgress * (250 - 128) * 5)
        //console.log("Day Phase 1")
      }
      
      //Afternoon
      else if(this.dayProgress >= 0.2 && this.dayProgress < 0.8) {
        colours.x = 135
        colours.y = 206
        colours.z = 250
        //console.log("Day Phase 2")
      }
      
      //Sunset
      else if(this.dayProgress >= 0.8) {
        colours.x = 50 + floor((1 - this.dayProgress) * (135 - 50) * 5)
        colours.y = 70 + floor((1 - this.dayProgress) * (206 - 70) * 5)
        colours.z = 128 + floor((1 - this.dayProgress) * (250 - 128) * 5)
        //console.log("Day Phase 3")
      } 
    }
    
    //Night Time
    if(this.state == 1) {
        colours.x = 50
        colours.y = 70
        colours.z = 128
        //console.log("Night")
    }
    
    //Note: The RGB values are returned in a vector, then unpackaged in sketch.js.
    return colours
  }
}