function Vector2D(x, y, mode) {
  this.x = x;
  this.y = y;
  this.mode = mode;
};

Vector2D.prototype = {
  add: function(other) {
    return new Vector2D(this.x + other.x,
                        this.y + other.y,
                        this.mode);
  },

  sub: function(other) {
    return new Vector2D(this.x - other.x,
                        this.y - other.y,
                        this.mode);
  },

  dot: function(other) {
    return this.x * other.x + this.y * other.y;
  },

  length: function() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  },

  lengthSquared: function() {
    return this.x * this.x + this.y * this.y;
  },

  normalize: function() {
    var scale = this.length();
    return new Vector2D(this.x / scale, this.y / scale);
  },

  scale: function(sf) {
    return new Vector2D(this.x * sf, this.y * sf);
  },

  view: function() {
    return "(" + this.x + ";" + this.y + ")";
  },

  //Because of presumed object copy semantics in javascript
  // (Everything else is wierd in this language, so why not this?)
  clone: function() {
    return new Vector2D(this.x, this.y, this.mode);
  },
};

function min(first, second) {
  if(first <= second)
    return first;
  return second;
};

function max(first, second) {
  if(first > second)
    return first;
  return second;
};

function vmin(a, b) {
  return new Vector2D(min(a.x, b.x), min(a.y, b.y));
};

function vmax(a, b) {
  return new Vector2D(max(a.x, b.x), max(a.y, b.y));
};

