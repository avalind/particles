// Verlet, velocity-less integrator.
// a hack, instead of changing the whole vector2D object
// we just modify the members. Because of the wierd
// call-by-reference semantics in javascript.
// (properties of objects are call-by-ref, the objects
// themselves are call-by-val.)
function verlet_vector2d(pos, oldpos, acc, timestep) {
  temp = pos;
  temp2 = temp.scale(2.0).sub(oldpos).add(acc.scale(timestep*timestep));
  
  // Update state.
  oldpos.x = temp.x;
  oldpos.y = temp.y;
  pos.x = temp2.x;
  pos.y = temp2.y;
};
