let ctx;
// we can change this and set to true when mouse is down to indicate begin drawing
let isDrawing = false;
// where to start and stop the line
let lastX = 0;
let lastY = 0; 

function loadDrawboard () {
    canvas.style.display = "block";
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.strokeStyle = "#000000";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    // hide instructions div
    const inst = document.getElementById("instructions")
    inst.style.display = "none";
    // hide header
    game.headerInfo.style.display = "none";
    // add turn info to gameInfo
    const turnInfo = document.createElement("div", { id: "turn-info" });
    turnInfo.innerHTML = `
        <div class="col-md-auto">
            <h2>Turn</h2>
            <p>${game.currentGame.turn.name}</p>
        </div>
    `
    game.roundInfo.prepend(turnInfo)
    game.turnInfo = turnInfo;
    // show the canvas again
    canvas.style.display ="block";

    canvas.addEventListener('mousemove', beginDrawing);
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        // start the line hwere you first put your mouse down (not where your last line leftoff)
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    setTimeout(scoreForm, 60000);

}

function beginDrawing(e) {
    // function doesn't run when player is not moused down
    if(!isDrawing) return; 
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to where the mouse is based on the event
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    // update last x and y variables to be whereever they were while drawing
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function clearCanvas () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
