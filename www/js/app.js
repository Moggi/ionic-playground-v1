

window.onload = function(){

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var canvas = document.createElement('canvas');

canvas.setAttribute('width',canvasWidth);
canvas.setAttribute('height',canvasHeight);
document.body.appendChild(canvas);

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


    var prevTime = Date.now();

    var quantia = 50;
    var velocity = 50;   // pixels/second
    var rectHeight = 30;
    var rectWidth = 50;

//================================================================================



// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
var renderer = new PIXI.WebGLRenderer(canvasWidth,canvasHeight,{view:canvas,transparent:true});

var graphics = new PIXI.Graphics();


var rect = [];

var iQuantia = 0;
var tempX = 0;
var tempY = 0;

while( iQuantia<quantia )
{
    tempX += rectWidth +1;
    if( tempX+rectWidth >= canvasWidth ){
        tempY += rectHeight + 1;
        tempY %= canvasHeight;
        tempX = rectWidth +1;
    }
    rect[iQuantia] = new PIXI.Rectangle(tempX,tempY,rectWidth,rectHeight);
    iQuantia++;
}

requestAnimationFrame( update );
function draw()
{
    graphics.clear();
    graphics.beginFill(0x333333);

    for( var i=0; i<quantia; i++ )
        graphics.drawShape(rect[i]);

    
    renderer.render(graphics);
}





function resizeCanvas(){
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.setAttribute('width',canvasWidth);
    canvas.setAttribute('height',canvasHeight);
    renderer.resize(canvasWidth,canvasHeight);
}

function deltaTime(anterior){
    return (Date.now() - anterior)/1000;
}


};








//
