// Simple, quicky, and dirty way to get Instagram photos on an element.

(function (window, document) {
  var apiUrl     = "https://api.instagram.com/",
      apiVersion = "v1"
  ;

  apiUrl = apiUrl + apiVersion + "/";

  var generateRandomKey = function () {
    var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    return S4() + S4() + S4() + S4();
  };

  var makeRequest = function (url, callback, opts, scope) {
    var script       = document.createElement("script"),
        key          = generateRandomKey(),
        callbackName = "InstafetcherCallback" + key
    ;

    // registers the callback on global scope
    window[callbackName] = function (data) {
      callback.call(scope, data, opts);
      delete window[callbackName];
    };

    script.src = url + "&callback=" + callbackName;
    document.body.appendChild(script);
  };

  window.Instafetcher = {

    getUserMedia : function (opt) {
      var endpoint = "/users/%user_id%/media/recent/?access_token=",
          url
      ;

      if (!opt.user_id) { throw "You must provide the user_id"; }
      if (!opt.access_token) { throw "You must provide the OAuth access token"; }
      if (!opt.element) { throw "You must provide a node or selector for the photos"; }

      endpoint = endpoint.replace("%user_id%", opt.user_id);

      url = apiUrl + endpoint + opt.access_token;

      makeRequest(url, this.renderPhotos, opt, this);
    },

    renderPhotos : function (response, opts) {
      var element  = document.querySelector(opts.element),
          template = element.querySelector("[data-instagram-tmpl]").innerHTML,
          quantity = opts.quantity || 10,
          limit    = Math.min(quantity, response.data.length),
          html     = [],
          item
      ;

      for (var i = 0; i < limit; i++) {
        item = template.replace("{{link}}", response.data[i].link);
        item = item.replace("{{src}}", response.data[i].images.thumbnail.url);
        item = item.replace("{{description}}", response.data[i].caption.text);

        html.push(item);
      }

      element.innerHTML = html.join("");
    }

  };
})(window, document);
