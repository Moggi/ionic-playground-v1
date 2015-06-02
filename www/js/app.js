

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

    var raio = 10;
    var quantia = 50;
    var x = raio;
    var y = raio;
    var velocity = 50;   // pixels/second

//================================================================================



// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
var renderer = new PIXI.CanvasRenderer(canvasWidth,canvasHeight,{view:canvas,transparent:true});

var stage = new PIXI.Container();

var graphics = new PIXI.Graphics();

stage.addChild(graphics);

requestAnimationFrame( update );
function draw()
{
    graphics.clear();
    graphics.beginFill(0x333333);
    for( var i=0; i<quantia/2; i++)
    {
        var tempX = x +i*2*raio;
        tempX %=canvasWidth;
        var tempY = 0;
        for( var j=0; j<quantia/2; j++)
        {
            tempY += 2 * raio;
            tempY %=canvasHeight;

            graphics.drawCircle(tempX,tempY,raio);
        }
    }

    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(graphics);

    x += velocity * deltaTime(prevTime);
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
