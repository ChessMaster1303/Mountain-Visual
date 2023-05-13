function mountain(noiseCoEff) {
  //Transparency value allows the mountains to overlap, which give the mountains at the back a sense of depth.
  fill(136, 140, 141, 70)
  
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