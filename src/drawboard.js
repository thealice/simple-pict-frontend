const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.border = "2px solid skyblue";
ctx.strokeStyle = "black";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;
let isDrawing = false;
// where to start and stop the line
let lastX = 0;
let lastY = 0; 

function loadDrawboard () {
    // hide instructions div
    const inst = document.getElementById("instructions")
    inst.style.display = "none";
    // TODO: remove h1 title telling whose turn it is and add to the row with the rest of game info  
    // add canvas to drawboard div
    drawboard.appendChild(canvas);
}

function beginDrawing(e) {
    console.log(e);
}

canvas.addEventListener('mousemove', beginDrawing);
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);