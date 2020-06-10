function loadDrawboard () {
    // hide instructions div
    const inst = document.getElementById("instructions")
    inst.style.display = "none";
    // add canvas to drawboard div
    const canvas = document.createElement("canvas")
    canvas.style.height = "600px"
    canvas.style.width = "95%"
    drawboard.appendChild(canvas)
}