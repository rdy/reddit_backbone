(function(namespace) {
  namespace.RedditsController = function() {
    var self = {};

    self.index = function() {
      var reddits = new redditBackbone.Reddits();
      var view = new redditBackbone.views.reddits.Index({collection: reddits}).render();
      $(namespace.application.el).empty().append(view.el);
      reddits.fetch();
    };

    return self;
  };
})(redditBackbone);
