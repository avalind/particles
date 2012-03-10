// Represents a constraint applied to the particles at
// system[a_index] and system[b_index].
function Constraint(a_index, b_index, rest_length) {
  this.a_index = a_index;
  this.b_index = b_index;
  this.rest_length = rest_length;
};


// Another type of constraint, an anchor, that
// fixes a particle at a specified point.
function Anchor(p_index, fixation_point) {
  this.p_index = p_index;
  this.fixation_point = fixation_point;
};
