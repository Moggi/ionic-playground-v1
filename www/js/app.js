

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


function init(){

    // Init p2.js
    world = new p2.World();

    // Add a box
    boxShape = new p2.Rectangle(2,1);
    boxBody = new p2.Body({
        mass:1,
        position:[0,2],
        angularVelocity:1
    });
    boxBody.addShape(boxShape);
    world.addBody(boxBody);

    // Add a plane
    planeShape = new p2.Plane();
    planeBody = new p2.Body({ position:[0,-1] });
    planeBody.addShape(planeShape);
    world.addBody(planeBody);

    // Pixi.js zoom level
    zoom = 100;


//=======================


    // Add transform to the container
    container.position.x =  renderer.width/2; // center at origin
    container.position.y =  renderer.height/2;
    container.scale.x =  zoom;  // zoom in
    container.scale.y = -zoom; // Note: we flip the y axis to make "up" the physics "up"

    // Draw the box.
    graphics = new PIXI.Graphics();
    graphics.beginFill(0x555555);
    graphics.drawRect(-boxShape.width/2, -boxShape.height/2, boxShape.width, boxShape.height);

    // Add the box to our container
    container.addChild(graphics);
}

function animate(t){
    t = t || 0;
    requestAnimationFrame(animate);

    // Move physics bodies forward in time
    world.step(1/60);

    // Transfer positions of the physics objects to Pixi.js
    graphics.position.x = boxBody.position[0];
    graphics.position.y = boxBody.position[1];
    graphics.rotation =   boxBody.angle;

    // Render scene
    renderer.render(stage);
}


};










//
