const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.border = "2px solid skyblue";
ctx.strokeStyle = "#000000";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 20;
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
    
    canvas.addEventListener('mousemove', beginDrawing);
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        // start the line hwere you first put your mouse down (not where your last line leftoff)
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

}

function beginDrawing(e) {
    // function doesn't run when player is not moused down
    if(!isDrawing) return; 
    console.log(e)
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    // update last x and y variables to be whereever they were while drawing
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

