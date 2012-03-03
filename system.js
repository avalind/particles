function ParticleSystem(n_particles, timestep) {
  this.n_particles = n_particles;

  // Do we need to change this into
  // using the buffer API?
  this.positions = new Array();
  this.old_positions = new Array();
  this.masses = new Array();
  this.acceleration = new Array();
  this.grav = new Vector2D(0.0, -0.1);
  this.timestep = timestep;
};

ParticleSystem.prototype = {
  // For each particle, sum the forces acting on it from
  // all other particles.
  sumActingForces: function() {
    for(var i = 0; i < this.n_particles; i++) {
      /* The forces from the other particles,
      for(var j = 0; j < n_particles; j++) {
      
      };*/

      // For now, use only acceleration.
      this.acceleration[i] = this.grav.clone();
    };
  },

  integrate: function() {
    var res;
    for(var i = 0; i < this.n_particles; i++) {
      res = verlet_vector2d(this.positions[i],
                            this.old_positions[i],
                            this.acceleration[i].scale(this.masses[i]),
                            this.timestep);
      this.positions[i] = res[0].clone();
      this.old_positions[i] = res[1].clone();
    };
  },

  resolveConstraints: function() {


  },

  addParticle: function(p, op, acc, m) {
    this.positions.push(p);
    this.old_positions.push(op);
    this.acceleration.push(acc);
    this.masses.push(m);
  },
};

function randomVector() {
  // Ugly hack.
  var x = Math.random()*2 - 1;
  var y = Math.random()*2 - 1;
  return new Vector2D(x, y);
};

function generateSystem(n, timestep) {
  var s = new ParticleSystem(n, timestep); 
  for(var j = 0; j < n; j++) {
    var p = randomVector();
    var op = p.clone();
    var m = Math.random();
    s.addParticle(p, op, new Vector2D(0.2, 0.5) , m);
  };
  return s;
}
