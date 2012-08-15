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
    return ctx;
  }
  else {
    return false;
  }
};

var DEBUG = false;

function StateManager() {
  this.timestep_in_ms = 40;
  this.ts_secs = this.timestep_in_ms / 1000.0;
  this.old_time = 0;
  this.rend = new Renderer(this.ts_secs);
  this.ctx = init("screen", 800, 600);
  this.test_system = generateSpecialSystem(this.ts_secs);
  
  this.decrementor = 0;
  this.render_calls = 0;
  this.physics_calls = 0;
};

StateManager.prototype = {
  single_frame_func: function(new_time) {
  
    // A quick hack
    if(this.old_time === 0) {
      var dt = 500;
    } else {
      // Find the time elapsed since
      // the last call to single_frame_func;
      var dt = new_time - this.old_time;
    };

    this.old_time = new_time;
    

    // Advance the physics simulation accordingly.
    // @see http://gafferongames.com/game-physics/fix-your-timestep/
    // TODO: add the final interpolation step between the last and the current world state.
    this.decrementor += dt;
    
    if(DEBUG)
      alert(decrementor);
    
    while(this.decrementor >= this.timestep_in_ms) {
      // advance physics.
      this.decrementor -= this.timestep_in_ms;
      this.test_system.sumActingForces();
      this.test_system.integrate();
      this.test_system.resolveConstraints();

      this.physics_calls++;
    };

    
    var ph_out = document.getElementById("physicscalls");
    ph_out.value = this.physics_calls;

    this.rend.render_system(this.ctx, this.test_system);
    this.render_calls++;
    var out = document.getElementById("rendercalls");
    out.value = this.render_calls;
    // render. The problem here, is that the remainder
    // in decrementor % timestep_in_ms gets thrown away.
    if(DEBUG)
      alert("Rendering.");
  
    var obj = this;
    requestAnimFrame(function(t) {
      obj.single_frame_func(t);
    });
  },

  start: function() {
    // Initialize with the time in msecs since epoch.
    var d = new Date();
    this.single_frame_func(d.getTime());
  },
};

function Renderer(ts) {
};

Renderer.prototype = {
  render: function() {
  
  },

  // The rendering works ok.
  render_system: function(target_context, system) {
    // Save the transformation matrix, before cleaning
    // the canvas, then restore the matrix.
    target_context.clearRect(0, 0, 800, 600);

    // Render particles.
    target_context.fillStyle = "rgba(255, 255, 255)";
    for(var j = 0; j < system.n_particles; j++) {
      var p = map_to_screen({"width": 800, "height": 600}, system.positions[j]);
      //target_context.fillRect(p.x-2, p.y-2, 2, 2);
    };
    
    /*
    target_context.strokeStyle = "#000";
    target_context.lineWidth = 1.0;
    target_context.beginPath();
    target_context.moveTo(0.0, 0.0);
    target_context.beginPath(1.0, 1.0);
    target_context.stroke();
    target_context.closePath();
    */
  
    // Render constraints
    var mapctx = {"width": 800, "height": 600};
    for(var j = 0; j < system.constraints.length; j++) {
      var a = map_to_screen(mapctx, system.positions[system.constraints[j].a_index]);
      var b = map_to_screen(mapctx, system.positions[system.constraints[j].b_index]);
      target_context.beginPath();
      target_context.moveTo(a.x, a.y);
      target_context.lineTo(b.x, b.y);
      target_context.closePath();
      target_context.stroke();
    };
  },
};

function main() {
  var m = new StateManager();

  /**verlet_vector2d(p, op, a, t);
  alert("pos = " + p.view() + " oldpos = " + op.view());

  verlet_vector2d(p, op, a, t);
  alert("pos = " + p.view() + " oldpos = " + op.view());
  */
  m.start();
};
