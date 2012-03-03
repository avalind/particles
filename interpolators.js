/* Lerp and smoothstep interpolators for both scalars
 * and vectors
 */
function vector_lerp(a, b, theta) {
  var x = theta * a.x + (1 - theta) * b.x;
  var y = theta * a.y + (1 - theta) * b.y;
  return new Vector2D(x, y, a.mode);
}
