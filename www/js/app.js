



window.onload = function(){

    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild( stats.domElement );

    // Matter.js module aliases
    var Engine = Matter.Engine,
        World = Matter.World,
        Body = Matter.Body,
        Bodies = Matter.Bodies,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint;

    // create a Matter.js engine
    var engine = Engine.create(document.body, {
      render: {
        options: {
          wireframes: true,
          controller:Matter.RenderPixi,
          showAngleIndicator: true
        }
      }
    });

    // gravity init
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 1;

    //add a mouse-controlled constraint
    var mouseConstraint = MouseConstraint.create(engine);
    World.add(engine.world, mouseConstraint);

    // create a load of circle bodies
    var stack = Composites.stack(250, 5, 10, 5, 0, 0, function(x, y, column, row) {
      return Bodies.circle(x, y, Common.random(30, 31), { friction: .001, restitution: .1, density: 5.5 });
    });

    // add boundaries
    var offset = 5;
    World.add(engine.world, [
      Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, { isStatic: true }),
      Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, { isStatic: true }),
      Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, { isStatic: true }),
      Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, { isStatic: true })
    ]);

    // create function to update output values & manipulate gravity
    function gravOutputUpdate(id, axis, val) {
      document.getElementById(id).innerHTML = val;
      engine.world.gravity[axis] = val;
    }

    // add all of the bodies to the world
    World.add(engine.world, stack);

    // run the engine
    Engine.run(engine);

    Matter.Events.on(engine, "beforeTick", stats.begin);
    Matter.Events.on(engine, "afterTick", stats.end);


};










//






//
