/* We want to render objects that live in
 * a cartesian coordinate system onto the javascript
 * canvas. The canvas coordinate system has (0, 0) at the upper left
 * corner and the y-axis increases downwards.
 * our world space is a cartesian system with upper left at (-1, 1)
 * and lower right at (1, -1)
 */
function init(canvas_name, width, height) {
  var canv = document.getElementById(canvas_name);

  if(canv.getContext) {
    var ctx = canv.getContext('2d');
    var xscale = width / (1 - (-1));
    var yscale = height / (1 - (-1));
    ctx.setTransform(xscale, 0,
                     0, -yscale,
                     width / 2, height / 2);
    return ctx;
  }
  else {
    return false;
  }
};

function StateManager() {
  this.timestep_in_ms = 50;
  this.ts_secs = this.timestep_in_ms / 1000.0;
  this.old_time = 0;
};

StateManager.prototype = {
  single_frame_func: function(new_time) {
    // Because of the wierd semantics of this
    // we wrap it in a closure.
    var obj = this;
    requestAnimFrame(function(t) {
      obj.single_frame_func(t) 
    });
  
    // Find the time elapsed since
    // the last call to single_frame_func;
    var dt = new_time - this.old_time;
    this.old_time = new_time;
    
    // Advance the physics simulation accordingly.
    // @see http://gafferongames.com/game-physics/fix-your-timestep/
    var decrementor = dt;
    while(decrementor >= this.timestep_in_ms) {
      // advance physics.
      decrementor -= this.timestep_in_ms;
    };

    // render. The problem here, is that the remainder
    // in decrementor % timestep_in_ms gets thrown away.
    
    
    
    alert(dt);
  },

  start: function() {
    this.single_frame_func(0);
  },
};

function main() {
  var ct = init("screen", 800, 600);
  ct.fillStyle = "rgb(255,0,0);";
  ct.fillRect(0, 0, 0.1, 0.1);

  ct.fillStyle = "rgba(255,0,0,50);";
  ct.fillRect(0.5, 0.5, 0.01, 0.01);

  var p = new Vector2D(1.0, 0.0);
  var op = new Vector2D(-1.0, 0.0);
  var a = new Vector2D(0.5, 0.5);
  var t = 0.01;
  var m = new StateManager();

  verlet_vector2d(p, op, a, t);
  alert("pos = " + p.view() + " oldpos = " + op.view());

  verlet_vector2d(p, op, a, t);
  alert("pos = " + p.view() + " oldpos = " + op.view());
  
  m.start();
};