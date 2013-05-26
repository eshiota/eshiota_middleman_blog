;(function (context, document) {

  context.$ = function (selector, el) {
    if (!el) {el = document;}
    return el.querySelector(selector);
  };

  context.$$ = function (selector, el) {
    if (!el) {el = document;}
    return Array.prototype.slice.call(el.querySelectorAll(selector));
  };

})(window, document);