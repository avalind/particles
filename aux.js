/* 
 * Maps from the unit square (the space were we simulate)
 * to the screen space (where we render)
 */
function map_to_screen(ctx, vec) {
  var nx =  ctx.width * vec.x;
  var ny = -ctx.height * vec.y + ctx.height;
  return new Vector2D(nx, ny);
};
