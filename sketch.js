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


function preload() {
  let air_jordan = loadImage('incremental_noise/air_jordan.png');
  let img1 = loadImage('incremental_noise/slate1.png');
  let img2 = loadImage('incremental_noise/slate2.png');
  let img3 = loadImage('incremental_noise/slate3.png');
  let img4 = loadImage('incremental_noise/slate4.png');
  let img5 = loadImage('incremental_noise/slate5.png');
  let x_t = loadImage('incremental_noise/x_t.png');
  
  //air_jordan = air_jordan.filter(GRAY);
  //img1 = img1.filter(GRAY);
  //img2 = img2.filter(GRAY);
  //img3 = img3.filter(GRAY);
  //img4 = img4.filter(GRAY);
  //img5 = img5.filter(GRAY);
  //x_t = x_t.filter(GRAY);
  
  images = [air_jordan, img1, img2, img3, img4, img5];
  //images = [img5, img4, img3, img2, img1, x_t];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  slates = init_grids(500, 200, 28, 28, 10, 6, images);

  
}

function draw() {
  background(0);
  
  let mouseVector = createVector(mouseX, mouseY);
  let centerVector = createVector(500, 200);
  let perspectiveVector = p5.Vector.sub(mouseVector, centerVector).div(slates.length)
  
  line(centerVector.x, centerVector.y, mouseX, mouseY);
  
  for(let i = 0; i <slates.length; i+=1){
    slates[i].update(perspectiveVector);
    push();
    blendMode(ADD);
    updateCells(i, slates[i].cells);
    pop();
  }
  
  //filter(INVERT);

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

function updateCells(s, cells){
  if(s==0){
    for(let i = 0; i < cells.length; i+=1){
    strokeWeight(0.05);
    let r = (0.2126*(cells[i].color[0]));
    let g = (0.7152*(cells[i].color[1]));
    let b = (0.0722*(cells[i].color[2]));
      
    let gs = r+g+b
        
        if (gs<130){
          gs = gs;
        } else{
          gs = gs;
        }
      
    fill(gs, 255);
    //fill(cells[i].color[0],
         //cells[i].color[1],
         //cells[i].color[2], 255);
    
    square(cells[i].OriginX+cells[i].transX,
           cells[i].OriginY+cells[i].transY,
           cells[i].size);
  }
} else{
    for(let i = 0; i < cells.length; i+=1){
    strokeWeight(0.05);
      
    let r = (0.2126*(cells[i].color[0]));
    let g = (0.7152*(cells[i].color[1]));
    let b = (0.0722*(cells[i].color[2]));
      
    let gs = r+g+b
        
        if (gs<115){
          gs = gs*0.01;
        } else{
          gs = gs*1.1;
        }
      
    fill(gs/5, 255);
      //fill(cells[i].color[0]/5,
           //cells[i].color[1]/5,
           //cells[i].color[2]/5, 255);
      
      square(cells[i].OriginX+cells[i].transX,
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
