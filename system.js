function ParticleSystem(n_particles, timestep) {
  this.n_particles = n_particles;

  // Do we need to change this into
  // using the buffer API?
  this.positions = new Array();
  this.old_positions = new Array();
  this.masses = new Array();
  this.acceleration = new Array();
  this.grav = new Vector2D(0.0, -0.02);
  this.timestep = timestep;
  this.constraints = Array();
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
    // The world is from (-1, 1) to (1, -1)
    var N_ITERATIONS = 100
    for(var c = 0; c < N_ITERATIONS; c++) {
      // Satisfy the first constraint.
      for(var i = 0; i < this.n_particles; i++) {
        // Absolutly wonderful idea from
        // http://www.pagines.ma1.upc.edu/~susin/files/AdvancedCharacterPhysics.pdf
        this.positions[i].x = min(max(this.positions[i].x, 0), 1);
        this.positions[i].y = min(max(this.positions[i].y, 0), 1);
      };

      // Satisfy the second constraint.
      /*var rest_length = 0.1;
      var first = this.positions[0];
      var second = this.positions[1];
      var delta = second.sub(first);
      var delta_length = delta.length();
      var diff = (delta_length - rest_length) / delta_length;
      var update = delta.scale(0.5 * diff);

      this.positions[0] = this.positions[0].add( update );
      this.positions[1] = this.positions[1].sub( update );
*/
      // anchor the first particle at origo.
      //this.positions[0] = new Vector2D(0.0, 0.0);
      
      /* Constraint satisfaction */
      for(var j = 0; j < this.constraints.length; j++) {
        var first = this.positions[this.constraints[j].a_index];
        var second = this.positions[this.constraints[j].b_index];
        var delta = second.sub(first);
        var delta_length = delta.length();
        var diff = (delta_length - this.constraints[j].rest_length) / delta_length;
        var update = delta.scale(0.5 * diff);

        this.positions[this.constraints[j].a_index] = this.positions[this.constraints[j].a_index].add(update);
        this.positions[this.constraints[j].b_index] = this.positions[this.constraints[j].b_index].sub(update);
      };



      //this.positions[0] = new Vector2D(0.0, 0.0);
    };
  },

  addParticle: function(p, op, acc, m) {
    this.positions.push(p);
    this.old_positions.push(op);
    this.acceleration.push(acc);
    this.masses.push(m);
  },

  addConstraint: function(c) {
    this.constraints.push(c);
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

function generateSpecialSystem(timestep) {
  var s = new ParticleSystem(4, timestep);
  var diag_c =  Math.sqrt(0.1*0.1 + 0.1*0.1);
  s.addParticle(new Vector2D(0.5, 0.5), new Vector2D(0.5, 0.5), new Vector2D(0.0, 0.0), 1.0);
  s.addParticle(new Vector2D(0.6, 0.0), new Vector2D(0.6, 0.0), new Vector2D(0.0, 0.0), 2.0);
  s.addParticle(new Vector2D(0.0, 0.6), new Vector2D(0.0, 0.6), new Vector2D(0.0, 0.0), 3.0);
  s.addParticle(new Vector2D(0.6, 0.6), new Vector2D(0.6, 0.6), new Vector2D(0.0, 0.0), 4.0);
  s.addConstraint(new Constraint(0, 1, 0.1));
  s.addConstraint(new Constraint(0, 2, 0.1));
  s.addConstraint(new Constraint(1, 3, 0.1));
  s.addConstraint(new Constraint(2, 3, 0.1));
  s.addConstraint(new Constraint(0, 3, diag_c));
  s.addConstraint(new Constraint(1, 2, diag_c));
  return s;
};
