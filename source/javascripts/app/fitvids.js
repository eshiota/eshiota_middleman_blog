/*
* FitVids
*
* Adapted by Eduardo Shiota Yasuda - http://github.com/eshiota - based on
* jquery.fitvids.js, but with vanilla flavor adapted for my blog.
*
* Modifications:
*
* - Remove jQuery dependency, using vanilla JS and DOM only.
*   Drawback: IE9+ only. Whatever, f*ck IE8-.
* - The fluid styles have been moved to the CSS, so no need to insert the
*   <style tag>
* - Included a few selectors more common to my blog
*
* Original copyright:
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

;(function (context) {
  "use strict";

  var fitVids = function (options) {
    var selectors,
        settings,
        elements,
        videos = []
    ;

    selectors = [
      "iframe[src*='player.vimeo.com']",
      "iframe[src*='youtube.com']",
      "iframe[src*='youtube-nocookie.com']",
      "iframe[src*='kickstarter.com'][src*='video.html']",
      "iframe[src*='blip.tv']",
      "iframe[src*='slideshare.net']"
    ];

    settings = {
      elements : "body",
      customSelector: null
    };

    if (options) {
      extend(settings, options);
    }

    if (settings.customSelector) {
      selectors.push(settings.customSelector);
    }

    elements = $$(settings.elements);
    selectors = selectors.join(",");

    elements.forEach(function (element) {
      $$(selectors, element).forEach(function (element) {
        videos.push(element);
      });
    });

    videos.forEach(function (element) {
      var height  = !isNaN(parseInt(element.height, 10)) ? parseInt(element.height, 10) : element.offsetHeight,
          width   = !isNaN(parseInt(element.width, 10)) ? parseInt(element.width, 10) : element.offsetWidth,
          ratio   = height / width,
          parent  = element.parentNode,
          wrapper = document.createElement("div")
      ;

      wrapper.className = "fluid-width-video-wrapper";
      wrapper.style.paddingTop = (ratio * 100) + "%";

      parent.insertBefore(wrapper, element);

      wrapper.appendChild(element);

      element.removeAttribute("height");
      element.removeAttribute("width");
    });
  };

  context.FitVids = fitVids;
})(window);
