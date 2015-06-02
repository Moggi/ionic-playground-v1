

window.onload = function(){

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var canvas = document.createElement('canvas');

canvas.setAttribute('width',canvasWidth);
canvas.setAttribute('height',canvasHeight);
document.body.appendChild(canvas);

var gl = canvas.getContext('webgl');

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
    // requestAnimationFrame( update );
};

var raio = 10;
var quantia = 50;
var x = raio;
var y = raio;
var velocity = 50;   // pixels/second

var prevTime = Date.now();

requestAnimationFrame( update );


function draw(){

    var vertexShaderNode = createShaderFromScriptElement(gl, "node-vertex-shader");
    var fragmentShaderNode = createShaderFromScriptElement(gl, "node-fragment-shader");
    var programNode = createProgram(gl, [vertexShaderNode, fragmentShaderNode]);
    gl.useProgram(programNode);


    var ATTRIBUTES = 5;
    var j = 0;
    var data = [];
    var circle = {x: 50, y: 50, r: 10};
    var r = circle.r + 1;

    data[j++] = (circle.x - r);
    data[j++] = (circle.y - r);
    data[j++] = circle.x;
    data[j++] = circle.y;
    data[j++] = r;

    data[j++] = (circle.x + (1 + Math.sqrt(2)) * r);
    data[j++] = circle.y - r;
    data[j++] = circle.x;
    data[j++] = circle.y;
    data[j++] = r;

    data[j++] = (circle.x - r);
    data[j++] = (circle.y + (1 + Math.sqrt(2)) * r);
    data[j++] = circle.x;
    data[j++] = circle.y;
    data[j++] = r;

    var dataBuffer = new Float32Array(data);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        dataBuffer,
        gl.STATIC_DRAW);

        // set the resolution
    var resolutionLocation = gl.getUniformLocation(programNode, "u_resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    var positionLocation = gl.getAttribLocation(programNode, "a_position");
    var centerLocation = gl.getAttribLocation(programNode, "a_center");
    var radiusLocation = gl.getAttribLocation(programNode, "a_radius");

    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(centerLocation);
    gl.enableVertexAttribArray(radiusLocation);

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(centerLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
    gl.vertexAttribPointer(radiusLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);

    gl.drawArrays(gl.TRIANGLES, 0, data.length/ATTRIBUTES);


//     //limpa tela
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     //
//     // var tempX=0;
//     for( var i=0; i<quantia/2; i++)
//     {
//         var tempX = x+i*2*raio;
//         var tempY = 0;
//         for( var j=0; j<quantia/2; j++)
//         {
//             tempX %=canvasWidth;
//             tempY += 2*raio;
//             tempY %=canvasHeight;
//             ctx.beginPath();
//             ctx.arc( tempX, tempY, raio, 0, 2*Math.PI );
//             ctx.fillStyle="#555555";
//             ctx.fill();
//         }
//     }
//     x += velocity * deltaTime(prevTime);
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
