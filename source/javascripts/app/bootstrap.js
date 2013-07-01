(function () {
  var portfolioLists = $$(".portfolio-list")
    , masonryLists = []
  ;

  Instafetcher.getUserMedia({
    access_token : "896055.0250db2.7bf9102e46774f2ebefc6570148a0363",
    user_id      : "896055",
    element      : "#instagram"
  });

  FitVids({
    element : "#blog-content"
  });

  portfolioLists.forEach(function (el, index, array) {
    masonryLists.push(new Masonry(el));
  });

  // Masonry is not playing nice calculating the heights, so I manually
  // trigger a recalc here
  setTimeout(function () {
    masonryLists.forEach(function (el) {
      el.layout();
    });
  }, 100);
})();
