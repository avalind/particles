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

  // Because of presumed object copy semantics in javascript
  // (Everything else is wierd in this language, so why not this?)
  clone: function() {
    return new Vector2D(this.x, this.y, this.mode);
  },
};
