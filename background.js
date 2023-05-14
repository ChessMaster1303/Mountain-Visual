function mountain(noiseCoEff) {
  //Transparency value allows the mountains to overlap, which give the mountains at the back a sense of depth.
  fill(136, 140, 141, 140)
  
  //The reason j starts at 2 is so that the mountains do not protrude excessively into the sky; the Sun requires some space for its spotlight!
  for(let j = 2; j < 6; j += 1) {
    beginShape()
    for(let i = 0; i < width; i++) {
      //The i-value will be the x-value of the vertex, while the y-value is determined by a complex process of using perlin noise
      //The parameter for the noise function is essentially the how many mountain points have been drawn. Think of it then as that the same patterns won't repeat. The noiseCoEff helps to moderate the smoothness of the mountain; could be used in interactivity perhaps.
      
      let y = height - noise((j * width + i) * noiseCoEff) * j * height/5
      vertex(i, y)      
    }
    
    //These 2 points are, for all the mountains, at the bottom left and bottom right of the screen, so the mountain shape can be "completed".
    vertex(width, height)
    vertex(0, height)
    
    endShape(CLOSE)
  }
}


function sliderCreate() {
  //Slider on the left.
  gravSlider.position(width * 0.25/9, height * 8.5/9)
  gravSlider.style("width", (width * 1/10) + "px")
  let gravCoEff = gravSlider.value()
  
  //Slider on the right.
  daySlider.position(width * 1.75/9, height * 8.5/9)
  daySlider.style("width", (width * 1/10) + "px")
  let dayLength = daySlider.value()
  
  //These slider values are placed in a vector, then unpackaged in sketch.js.
  values = createVector(gravCoEff, dayLength)
  return values
}


function sliderShow() {
  //The white box.
  fill(255)
  rect(0, height * 7.75/9, width * 3/9, height * 1.25/9)
  
  //The explanatory texts.
  fill(0)
  textSize(width/60)
  textAlign(LEFT)
  text("Gravitational\nStrength", width * 0.25/9, height * 8.1/9)
  text("Day / Night \nLength", width * 1.75/9, height * 8.1/9)
  
  //The "-".
  textSize(width/30)
  text("-", width * 0.25/9, height * 8.9/9)
  text("-", width * 1.75/9, height * 8.9/9)
  
  //The "+".
  textAlign(RIGHT)
  text("+", width * 1.25/9, height * 8.925/9)
  text("+", width * 2.75/9, height * 8.925/9)
}