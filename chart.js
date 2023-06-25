
const chart = document.querySelector(".chart");

const canvas = document.createElement("canvas");
canvas.width = 280;
canvas.height = 280;

chart.appendChild(canvas);

const ctx = canvas.getContext("2d");

ctx.lineWidth = 15;

const R = 90;

function drawCircle(color, ratio, anticlockwise){

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc( canvas.width/2, canvas.height/2, R, 0, ratio * 2 * Math.PI, anticlockwise);
    ctx.stroke();
}

function updateChart( income, outcome){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let ratio = income / (income+outcome);
    if(income === 0 && outcome === 0){
        drawCircle("#d3d0d0", 1, false);
    }
    drawCircle("#9dff6f", - ratio, true);
    drawCircle("#a81409", 1 - ratio, false);
}