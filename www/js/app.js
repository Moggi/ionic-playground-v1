

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

    prevTime = Date.now();
    requestAnimationFrame( update );
};

var raio = 10;
var quantia = 50;
var x = raio;
var y = raio;
var velocity = 50;   // pixels/second

var prevTime = Date.now();

requestAnimationFrame( update );

var circulos = [];

function draw(){
    //limpa tela
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //
    // var tempX=0;
    for( var i=0; i<quantia/2; i++)
    {
        var tempX = x+i*2*raio;
        var tempY = 0;
        for( var j=0; j<quantia/2; j++)
        {
            tempX %=canvasWidth;
            tempY += 2*raio;
            tempY %=canvasHeight;
            ctx.beginPath();
            ctx.arc( tempX, tempY, raio, 0, 2*Math.PI );
            ctx.fillStyle="#555555";
            ctx.fill();
        }
    }
    x += velocity * deltaTime(prevTime);
}

function resizeCanvas(){
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.setAttribute('width',canvasWidth);
    canvas.setAttribute('height',canvasHeight);
}

function deltaTime(anterior){
    return (Date.now() - anterior)/1000;
}


};









//
