var sketch2 = function(s){

class Cell {
  constructor(x, y, size, color){
    this.OriginX = x;
    this.OriginY = y;
    this.transX = x;
    this.transY = y;
    this.size = size;
    this.color = color;
  }
}

class Grid{
  constructor(x, y, cells, rank){
    this.x = x;
    this.y = y;
    this.cells = cells;
    this.rank = rank;
  }

  update(updateVec){
    for (let i=0; i<this.cells.length; i+=1){
      this.cells[i].transX = updateVec.x*this.rank;
      this.cells[i].transY = updateVec.y*this.rank;
    }
  }
}


//let slates = init_grids(500, 200, 28, 28, 10, 5);
let slates;
let images;


s.preload = function() {
  let air_jordan = s.loadImage('incremental_noise/air_jordan.png');
  let img1 = s.loadImage('incremental_noise/slate1.png');
  let img2 = s.loadImage('incremental_noise/slate2.png');
  let img3 = s.loadImage('incremental_noise/slate3.png');
  let img4 = s.loadImage('incremental_noise/slate4.png');
  let img5 = s.loadImage('incremental_noise/slate5.png');
  let x_t = s.loadImage('incremental_noise/x_t.png');

  //air_jordan = air_jordan.filter(GRAY);
  //img1 = img1.filter(GRAY);
  //img2 = img2.filter(GRAY);
  //img3 = img3.filter(GRAY);
  //img4 = img4.filter(GRAY);
  //img5 = img5.filter(GRAY);
  //x_t = x_t.filter(GRAY);

  images = [air_jordan, img1, img2, img3, img4, img5];
  //images = [img1, img2, img3, img4, img5, x_t];
}

s.setup = function() {
  var canvas = s.createCanvas(1200, 600);
  canvas.parent('sketch2');
  slates = init_grids(600, 20, 28, 28, 10, 6, images);

}

s.draw = function () {

  s.background(255);

  let mouseVector = s.createVector(s.mouseX, s.mouseY);
  let centerVector = s.createVector(500, 200);
  let perspectiveVector = p5.Vector.sub(mouseVector, centerVector).div(slates.length)

  s.line(centerVector.x, centerVector.y, s.mouseX, s.mouseY);

  for(let i = 0; i <slates.length; i+=1){
    slates[i].update(perspectiveVector);
    //push();
    //blendMode(ADD);
    s.updateCells(i, slates[i].cells);
    //pop();
  }

  //filter(INVERT);
    //text
  s.textSize(12);
  s.textAlign(s.CENTER);
  s.push();
  s.fill(0);
  s.text("Each slate contains 1/5th of the noise it requires to get from xT to x0. \n Align them to see xT or move your cursor to see the progression from x0.", 600, 500);
  s.pop();

}

function init_grids(x, y, rows, cols, size, num_of_grids, images){

  let grids = [];

  for (let i= 0; i<num_of_grids; i+=1){
    let cells = [];
    let upperleft = [x-((rows*size)/2), y+((rows*size)/2)]

    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {


        cell = new Cell(upperleft[0]+(r*size),
                        upperleft[1]+(c*size),
                        size,
                        images[i].get(r, c));
        cells.push(cell);
      }
    }
    grids.push(new Grid(x, y, cells, i));
  }
  return grids
}

s.updateCells = function(o, cells){
  if(o==0){
    for(let i = 0; i < cells.length; i+=1){
    s.strokeWeight(0.05);
    //let r = (0.2126*(cells[i].color[0]));
    //let g = (0.7152*(cells[i].color[1]));
    //let b = (0.0722*(cells[i].color[2]));

    //let gs = r+g+b

        //if (gs<130){
          //gs = gs;
        //} else{
          //gs = gs;
        //}

    //fill(gs, 255);
    s.fill(cells[i].color[0],
         cells[i].color[1],
         cells[i].color[2], 255);

    s.square(cells[i].OriginX+cells[i].transX,
           cells[i].OriginY+cells[i].transY,
           cells[i].size);
  }
} else{
    for(let i = 0; i < cells.length; i+=1){
    s.strokeWeight(0.05);

    //let r = (0.2126*(cells[i].color[0]));
    //let g = (0.7152*(cells[i].color[1]));
    //let b = (0.0722*(cells[i].color[2]));

    //let gs = r+g+b

        //if (gs<115){
          //gs = gs*0.01;
        //} else{
          //gs = gs*1.1;
        //}

    //fill(gs/5, 255);
      s.fill(cells[i].color[0],
           cells[i].color[1],
           cells[i].color[2], 60);

      s.square(cells[i].OriginX+cells[i].transX,
             cells[i].OriginY+cells[i].transY,
             cells[i].size);
    }
  }
}

function gscale(color){
  let rr = 0.2126*color[0];
  let gg = 0.7152*color[1];
  let bb = 0.0722*color[2];
  let grayscale = rr+gg+bb;
  return grayscale
}
};


let myp5_2 = new p5(sketch2, document.getElementById('skt2'));