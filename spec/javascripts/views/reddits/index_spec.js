describe('views.reddits.Index', function() {
  var view, reddits;
  beforeEach(function() {
    reddits = new redditBackbone.Reddits();
    view = new redditBackbone.views.reddits.Index({collection: reddits});
    jasmine.content().append(view.el);
    reddits.fetch();
  });

  describe('render', function() {
    beforeEach(function() {
      view.render();
    });

    it('should render the expected content', function() {
      expect($('ol.reddits')).toExist();
    });
  });
});
