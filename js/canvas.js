var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// inital coordinates of the black square
var x = 0;
var y = 50;

// width and height of the square
var width = 10;
var height = 10;

function animate() {
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // draw
    ctx.fillRect(x, y, width, height);
    
    // update
    x++;

    // repeat animation if square is within the canvas borders
    // 490 = canvas width 500 - width 10 of the square
    if(x <= 120) {
        setTimeout(animate, 30);
    }
}
// call the animate function manually for the first time

animate();

