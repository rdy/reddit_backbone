describe('views.reddits.Index', function() {
  var view, reddits;
  beforeEach(function() {
    reddits = new redditBackbone.Reddits();
    view = new redditBackbone.views.reddits.Index({collection: reddits});
    jasmine.content().append(view.el);
    reddits.fetch();
    var request = mostRecentAjaxRequest();
    expect(request).not.toBeNull();
    expect(request.url).toMatch(/\/reddits$/);
    request.response({
      status: 200,
      responseText: readFixtures('reddits/index.json')
    });
  });

  describe('render', function() {
    beforeEach(function() {
      view.render();
    });

    it('should render the expected content', function() {
      expect($('ol.reddits')).toExist();
    });

    describe('when clicking on the comments link', function() {
      var $commentsLink;
      beforeEach(function() {
        $commentsLink = $('.comments:eq(0) a');
        expect($commentsLink).toExist();
        spyOn($.fn, 'dialog').andCallThrough();
        $commentsLink.click();
      });

      it('should open an overlay', function() {
        expect($.fn.dialog).toHaveBeenCalledWith({
          autoOpen : false,
          title: 'No, Paula.  It\'s a pot.',
          width: 500,
          height: 500
        });
        expect($.fn.dialog.mostRecentCall.object.selector).toMatch(/dialog/);
      });
    });
  });
});
