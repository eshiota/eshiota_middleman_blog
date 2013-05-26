;(function (context) {
  if (typeof context.extend === "function") { return true; }

  context.extend = function (obj) {
    var args = Array.prototype.slice.call(arguments, 1);

    args.forEach(function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });

    return obj;
  };
})(window);
