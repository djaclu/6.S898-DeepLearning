var sketch1 = function(s){

  class Cell {
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
  }
}

class Diff {
  constructor(created, destroyed){
    this.created = created;
    this.destroyed = destroyed;
    this.img_length = this.created.length + this.destroyed.length;
    this.update = false;
  }

  fdiffuse(t_ratio){
    let t = Math.floor(this.img_length*t_ratio)

    while (this.destroyed.length != t) {
      if(this.destroyed.length < t){
        let rc = Math.floor(Math.random()*this.created.length);
        this.destroyed.splice(this.destroyed.length, 0, this.created.splice(rc, 1)[0]);
      }
      else if(this.destroyed.length > t){
        let rd = Math.floor(Math.random()*this.destroyed.length);
        this.created.splice(this.created.length, 0, this.destroyed.splice(rd, 1)[0]);
      }
    }

    //creation
    for(var j = 0; j <img_diff.created.length; j+=1){
      let ccell = img_diff.created[j];
      s.noStroke();
      s.noFill();
      s.square(ccell.x, ccell.y, ccell.size)
      }

    //destruction
    for(var i = 0; i < img_diff.destroyed.length; i+=1){
      let dcell = img_diff.destroyed[i];
      s.noStroke();
      s.fill(Math.random()*255, Math.random()*255, Math.random()*255);
      s.square(dcell.x, dcell.y, dcell.size)
      }

    //text
    s.textSize(25);
    s.textAlign(s.LEFT, s.CENTER);
    s.fill(255);
    let timestep = Math.floor(animLR(0,300)*100)
    s.text("timestep: "+timestep, 5, 15);

  }

  rdiffuse(t_ratio){
    //console.log(n[0])

    if(t_ratio == 1 && this.update == false){
      n.splice(n.length, 0, n.splice(0,1)[0]);
      this.update = true;
       }

    else if (this.update == true){
      this.update = false;
       }

    s.image(img, 0, 0, 300, 300);
  }

}

let dest = [];
let img_diff = new Diff(init_grid(0, 0, 300, 300, 100), dest);
let n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11];
let check = 1;
let img;

s.preload = function() {
  //SyneMono = loadFont('SyneMono_Regular.ttf');
  img = s.loadImage("imgs/landscape"+n[0]+".png");
}

s.setup = function () {
  var canvas = s.createCanvas(300, 300);
  canvas.parent('sketch1');
}

s.draw = function() {
  s.background(0);

   if(check != n[0]){
    s.preload();
    check = n[0];
  }

  img_diff.rdiffuse(animLR(0, 300));
  img_diff.fdiffuse(animLR(0, 300));
}

function init_grid(ww, wh, width, height, resolution){
  let cellsize = width/resolution;
  let grid = [];

  for (let x = 0; x < width; x += cellsize) {
      for (let y = 0; y < height; y += cellsize) {
        cell = new Cell((ww/2)+x, (wh/2)+y, cellsize);
        grid.push(cell);
      }}

  return grid
}

function animLR(left, right){
return s.min(s.max(0, (s.mouseX-left)/(right-left)),1)
}

}

let myp5_1 = new p5(sketch1, document.getElementById('skt1'));