

window.onload = function(){

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var canvas = document.createElement('canvas');

canvas.setAttribute('width',canvasWidth);
canvas.setAttribute('height',canvasHeight);
document.body.appendChild(canvas);

var gl = canvas.getContext('webgl');
gl.clearColor(1.0, 1.0, 1.0, 1.0);

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
    var quantia = 10;
    var x = raio;
    var y = raio;
    var velocity = 50;   // pixels/second



    var vertexShaderNode = createShaderFromScriptElement(gl, "node-vertex-shader");
    var fragmentShaderNode = createShaderFromScriptElement(gl, "node-fragment-shader");
    var programNode = createProgram(gl, [vertexShaderNode, fragmentShaderNode]);
    gl.useProgram(programNode);


    var ATTRIBUTES = 5;
    var j = 0;
    var data = [];

    //=================================
    for( var i=0; i<quantia/2; i++)
    {
        var tempX = x +i*2*raio;
        tempX %=canvasWidth;
        var tempY = 0;
        for( var k=0; k<quantia/2; k++)
        {
            tempY += 2 * raio;
            tempY %=canvasHeight;

            data[j++] = (tempX - raio);
            data[j++] = (tempY - raio);
            data[j++] = tempX;
            data[j++] = tempY;
            data[j++] = raio;

            data[j++] = (tempX + (1 + Math.sqrt(2)) * raio);
            data[j++] = tempY - raio;
            data[j++] = tempX;
            data[j++] = tempY;
            data[j++] = raio;

            data[j++] = (tempX - raio);
            data[j++] = (tempY + (1 + Math.sqrt(2)) * raio);
            data[j++] = tempX;
            data[j++] = tempY;
            data[j++] = raio;

        }
    }
    //=================================

    // data[j++] = (x - raio);
    // data[j++] = (y - raio);
    // data[j++] = x;
    // data[j++] = y;
    // data[j++] = raio;
    //
    // data[j++] = (x + (1 + Math.sqrt(2)) * raio);
    // data[j++] = y - raio;
    // data[j++] = x;
    // data[j++] = y;
    // data[j++] = raio;
    //
    // data[j++] = (x - raio);
    // data[j++] = (y + (1 + Math.sqrt(2)) * raio);
    // data[j++] = x;
    // data[j++] = y;
    // data[j++] = raio;

    var dataBuffer = new Float32Array(data);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        dataBuffer,
        gl.DYNAMIC_DRAW);

    var resolutionLocation = gl.getUniformLocation(programNode, "u_resolution");
    gl.uniform2f(resolutionLocation, canvasWidth, canvasHeight);

    var positionLocation = gl.getAttribLocation(programNode, "a_position");
    var centerLocation = gl.getAttribLocation(programNode, "a_center");
    var radiusLocation = gl.getAttribLocation(programNode, "a_radius");


    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(centerLocation);
    gl.enableVertexAttribArray(radiusLocation);

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(centerLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
    gl.vertexAttribPointer(radiusLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);


requestAnimationFrame( update );

function draw(){

    gl.viewport(0, 0, canvasWidth, canvasHeight);
    gl.uniform2f(resolutionLocation, canvasWidth, canvasHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //=================================
    for( var i=0; i<quantia/2; i++)
    {
        var tempX = x +i*2*raio;
        tempX %=canvasWidth;
        var tempY = 0;
        for( var k=0; k<quantia/2; k++)
        {
            tempY += 2 * raio;
            tempY %=canvasHeight;

            data[j++] = (tempX - raio);
            data[j++] = (tempY - raio);
            data[j++] = tempX;
            data[j++] = tempY;
            data[j++] = raio;

            data[j++] = (tempX + (1 + Math.sqrt(2)) * raio);
            data[j++] = tempY - raio;
            data[j++] = tempX;
            data[j++] = tempY;
            data[j++] = raio;

            data[j++] = (tempX - raio);
            data[j++] = (tempY + (1 + Math.sqrt(2)) * raio);
            data[j++] = tempX;
            data[j++] = tempY;
            data[j++] = raio;

        }
    }
    //=================================

    dataBuffer = new Float32Array(data);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        dataBuffer,
        gl.DYNAMIC_DRAW);

    gl.drawArrays(gl.TRIANGLES, 0, data.length/ATTRIBUTES);

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
