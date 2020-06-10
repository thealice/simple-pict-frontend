const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.border = "2px solid skyblue";

function loadDrawboard () {
    // hide instructions div
    const inst = document.getElementById("instructions")
    inst.style.display = "none";
    // TODO: remove h1 title telling whose turn it is and add to the row with the rest of game info  
    // add canvas to drawboard div
    drawboard.appendChild(canvas)
}