var sketch3 = function(s){

let before = [0];
let after = [0];

s.preload = function() {
  img = s.loadImage("imgs/level"+after[0]+".jpg");
}

s.setup = function () {
  var canvas = s.createCanvas(400, 400);
  canvas.parent('sketch3');
}

  
s.draw = function() {
  //console.log("before", after[0]);
  
  s.background(255);
  
  
  if (before[0] != after[0]){
    s.preload();
    before[0] = after[0];
    //console.log("change");
  }
  
  after[0] = animLR(0, 400);
  
  //console.log("after", after[0]);
  
  s.image(img, -25, 50);

  s.textSize(15);
  //s.textAlign(s.LEFT, s.CENTER);
  s.fill(0);
  //let timestep = Math.floor(animLR(0,300)*100)
  s.text("timestep: "+after[0]*10, 200, 75);
   
}


function animLR(left, right){
return Math.floor(s.min(s.max(0, (s.mouseX-left)/(right-left)),1)*19)
}

}

let myp5_3 = new p5(sketch3, document.getElementById('skt3'));