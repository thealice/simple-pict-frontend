let canvas;
let ctx;
let isDrawing = false;
// where to start and stop the line
let lastX = 0;
let lastY = 0; 

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("drawboard");
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.border = "2px solid skyblue";
    ctx.strokeStyle = "#000000";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
})

function loadDrawboard () {
    // hide instructions div
    const inst = document.getElementById("instructions")
    inst.style.display = "none";
    canvas.style.display ="block";
    // TODO: remove h1 title telling whose turn it is and add to the row with the rest of game info  
    // add canvas to drawboard div
    
    canvas.addEventListener('mousemove', beginDrawing);
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        // start the line hwere you first put your mouse down (not where your last line leftoff)
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    setTimeout(scoreForm, 6000);

}

function beginDrawing(e) {
    // function doesn't run when player is not moused down
    if(!isDrawing) return; 
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    // update last x and y variables to be whereever they were while drawing
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function clearCanvas () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
