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
            box.style.cssText = `user-select: none; border: 1px solid #D3D3D3; width: ${500/size}px; height: ${500/size}px; min-width: 0px; min-height: 0px; max-width: ${500/size}px; max-height: ${500/size}px;`
            row.appendChild(box);
        }
    }
    draw();
}

function clearGrid() {
    let boxes = document.querySelectorAll('.box')
    boxes.forEach(box => {
        if (box.style.backgroundColor != 'white'){
            box.style.backgroundColor = 'white';
        }
    });
}


function draw(color='black', rainbow=false) {
  let isDrawing = false;

  function startDrawing() {
    isDrawing = true;
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function drawBox(box) {
    if (isDrawing) {
        if (rainbow) {
            color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        }
        box.style.backgroundColor = color;
    }
  }

  let boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.addEventListener('mousedown', () => {
      startDrawing();
      drawBox(box);
    });
    box.addEventListener('mouseover', () => {
        drawBox(box);
    });
  });

  document.addEventListener('mouseup', stopDrawing);
}


function removeGrid() {
    let grid = document.querySelector('.grid');
    grid.innerHTML = '';
}

function gridAction() {

    createGrid();

    const boxSlider = document.getElementById('box-slider');
    const boxCountDisplay = document.querySelectorAll('.box-count');
    const eraseButton = document.querySelector('.eraser');
    const clearButton = document.querySelector('.clear');
    const rainbowButton = document.querySelector('.rainbow');
    const colorButton = document.querySelector('.color');

    boxSlider.addEventListener('input', () => {
        boxCountDisplay.forEach(boxCount => boxCount.textContent = boxSlider.value);
        removeGrid();
        createGrid(boxSlider.value);
    });

    clearButton.onclick = clearGrid;

    eraseButton.addEventListener('click', () => {
        eraseButton.style.backgroundColor = 'black';
        rainbowButton.style.backgroundColor = 'white';
        draw('white');
    });

    rainbowButton.addEventListener('click', () => {
        rainbowButton.style.backgroundColor = 'blue';
        eraseButton.style.backgroundColor = 'white';
        draw('white',true);
    });

    const gridlinesToggle = document.getElementById('gridlines-toggle');
    gridlinesToggle.addEventListener('change', toggleGridlines);

    window.addEventListener("load", startup, false);

}

function toggleGridlines() {
    let boxes = document.querySelectorAll('.box')
    boxes.forEach(box => {
        if (box.style.border != 'none'){
            box.style.border = 'none';
        }
        else {
            box.style.border = '1px solid #D3D3D3';
        }
    });
}


function startup() {
    let colorPicker;
    colorPicker = document.querySelector("#color-picker");
    colorPicker.value = "#000000";
    colorPicker.addEventListener("input", updateFirst, false);
    colorPicker.addEventListener("change", updateAll, false);
    colorPicker.select();
}

function updateFirst(event) {
    draw(event.target.value);
}

function updateAll(event) {
    document.querySelectorAll("p").forEach((p) => {
      draw(event.target.value);
    });
}

gridAction();

