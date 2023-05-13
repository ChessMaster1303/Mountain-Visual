class raindrop {
  constructor(x, y) {
    //Derivatives of position; in laymen terms these vectors affect the placement of the raindrop on the screen.
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    
    //Random raindrop size, always proportional to the canvas size so it scales with larger and smaller screens.
    this.size = random(0.5, 1.5) * width/100;
    
    //This is a constant that perhaps can be tweaked in future updates, and affect how fast raindrops accelerate.
    this.gravCoEff = 0.001
  }
  
  
  show() {
    noStroke()
    
    //They are blue, but the transparency function gives it a nice touch and perhaps some depth when the raindrops overlap.
    fill(43, 101, 236, 72)
    
    //One must never ask why or how push/pop works. It works, but even after a year of Computer Studies it's not too clear. But thinking back, this likely eliminates some strange raindrop having a position relative to another raindrop due to translation function.
    push()
      //This puts the raindrop at its intended position; the object-specific created position vector helps a lot, especially when you don't have to worry about different raindrops.
      translate(this.pos.x, this.pos.y);
      
      //Using trigonometry to model the rotation of the raindrop depending on its velocity (after breaking velocity up into its horizontal and vertical components).
      this.rotation = atan(this.vel.x / this.vel.y)
      rotate(-this.rotation)
      
      //The top, triangle-shaped part of the raindrop.
      triangle(0, -this.size, -this.size, this.size, this.size, this.size)
    
      //The bottom, curved part of the raindrop.
      arc(0, this.size, 2 * this.size, 3 * this.size, 0, 180)
    pop()
  }
  
  
  physics() {
    //Merely models how position is affected by velocity, and velocity is affected by acceleration.
    this.vel.add(this.acc)
    this.pos.add(this.vel)
  }
  
  
  applyForce(fX, fY) { 
    //fX and fY are the horizontal component and vertical component of a given force, and hence affect horizontal component of acceleration and vertical component of acceleration respectively.
    //This formula below assumes that the mass of a raindrop is proportional to its size, and hence uses Newton's Second Law: F=ma.
    this.acc.x += fX / this.size
    this.acc.y += fY / this.size
  }
  
  
  phenomena() {
    //Gravity starts here, and all other forces, are simulated through the applyForce() function. There is no horizontal component of gravitational force, only vertical component.
    //The Equation Below is derived from Newton's Second Law: F=ma.
    //Gravitational Force = Gravitational Acceleration * Mass; assuming mass is proportional to size of raindrop 
    this.applyForce(0, this.gravCoEff * this.size)
    
    
    //Wind stuff starts here:
    //The noise value parameter is the frameCount divided by 60 to give a more closely related wind strength, and hence more natural wind. This noise value will always be from 0 to 1.
    let noiseValue = noise(frameCount / 60)
    
    //If the noise value is less than 0.5, then the wind will be blowing in the left direction. The strength is dependant on how far the noise value returned is from 0.5.
    if(noiseValue < 0.5) {
      this.applyForce(-((0.5 - noiseValue) * 1/60), 0)
    }
    
    //Same concept as if the noise value is less than 0.5, except that the wind blows right in this case.
    else if(noiseValue > 0.5) {
      this.applyForce((noiseValue - 0.5) * 1/60, 0)
    }
    
    //Perhaps if I decide to add more customisation for these features, I should split it up so that the parameters introduced for each phenomenon are clearer.
  }
  
  
  touchEdge() {
    //This checks if the raindrop is touching any of the 4-corners.
    
    //If the raindrop is at the left edge, it will teleport to the right edge, since it will have a left-moving velocity.
    if(this.pos.x < 0) {
      this.pos.x = width
    }
    
    //If the raindrop is at the right edge, it will teleport to the left edge.
    if(this.pos.x > width) {
      this.pos.x = 0
    }
    
    //If the raindrop touches the bottom of the canvas, it will teleport somewhere above the top of the canvas. This way, before it is displayed on the screen again, it would have accelerated to a reasonable velocity; this helps to give the natural illusion of them falling from the clouds.
    if(this.pos.y > height) {
      this.pos.y = 0 - this.size * 2
      
      //By varying initial velocity, this helps the respawned raindrops fill in awkward gaps between each "cycle" of raindrops and make the simulation more realistic (each cycle is when one batch of raindrops touchEdge).
      this.vel.x = 0
      this.vel.y = random(1, 5)
      

      //The droplets in the real sky all should fall with the same acceleration.
      this.acc.x = 0
      this.acc.y = 0
    }
  }
}