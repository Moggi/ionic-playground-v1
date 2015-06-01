

window.onload = function(){

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var canvas = document.createElement('canvas');

canvas.setAttribute('width',canvasWidth);
canvas.setAttribute('height',canvasHeight);
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

window.onresize = function(){ resizeCanvas(); };

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

var update = function () {

    stats.begin();

    draw();

    stats.end();

    requestAnimationFrame( update );
};

requestAnimationFrame( update );


function draw(){
    //limpa tela
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //
    ctx.beginPath();
    ctx.arc(200,100,60,0,2*Math.PI);
    ctx.fillStyle="gray";
    ctx.fill();
}

function resizeCanvas(){
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.setAttribute('width',canvasWidth);
    canvas.setAttribute('height',canvasHeight);
}


};









//
