function createGrid(size = 16) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        row.setAttribute('id', `row-${i}`)
        row.style.cssText = `display: flex;width: 500px; height: ${500/size}px; min-width: 500px; min-height: ${500/size}px; max-width: 500px; max-height: ${500/size}px`
        document.querySelector('.grid').appendChild(row);
        for (let j = 0; j < size; j++) {
            let box = document.createElement('div');
            box.classList.add('box');
            box.id = `${i}-${j}`
            box.style.cssText = `border: 1px solid #D3D3D3; width: ${500/size}px; height: ${500/size}px; min-width: 0px; min-height: 0px; max-width: ${500/size}px; max-height: ${500/size}px;`
            row.appendChild(box);
        }
    }
    draw();
}

function drawCustomGrid() {
    let button = document.querySelector('#new-grid');
    button.addEventListener('click', () => {
        console.log('clicked');
        let size = 0;
        while (size > 100 || size < 1){
            size = parseInt(prompt('Enter the number of squares per side for the new grid:\nNOTE: The maximum is 100'));
        }
    });
    createGrid(size);
}

function draw() {
    let isDrawing = false;
  
    function startDrawing() {
      isDrawing = true;
    }
  
    function stopDrawing() {
      isDrawing = false;
    }
  
    function drawBox(box) {
      if (isDrawing) {
        box.style.backgroundColor = 'black';
      }
    }
  
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
      box.addEventListener('mousedown', () => {
        startDrawing();
        drawBox(box);
      });
      box.addEventListener('mouseover', () => {
        if (isDrawing) {
          drawBox(box);
        }
      });
    });
  
    document.addEventListener('mouseup', stopDrawing);
}
  

function clearGrid() {
    let grid = document.querySelector('.grid');
    grid.innerHTML = '';
}

function redrawGrid() {
    let size = 0;
    while (size > 100 || size < 1){
        size = parseInt(prompt('Enter the number of squares per side for the new grid:\nNOTE: The maximum is 100'));
    }
    clearGrid();
    createGrid(size);
}
     
createGrid();

const btn = document.querySelector('#new-grid');
btn.onclick = redrawGrid;

