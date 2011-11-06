describe('Reddits', function() {
  var collection;
  beforeEach(function() {
    collection = new redditBackbone.Reddits();
  });

  describe('model', function() {
    it('should use the expected model', function() {
      expect(collection.model).toEqual(redditBackbone.Reddit);
    });
  });

  describe('url', function() {
    it('should expected url', function() {
      expect(collection.url).toEqual('/reddits');
    });
  });

  describe('fetch', function() {
    it('should fetch the expected url', function() {
      collection.fetch();
      var request = mostRecentAjaxRequest();
      expect(request).not.toBeNull();
      expect(request.url).toMatch(/\/reddits$/);
    });
  });
});
