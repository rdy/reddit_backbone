(function(namespace) {
  namespace.views = namespace.views || {};
  namespace.views.reddits = namespace.views.reddits || {};

  namespace.views.reddits.Index = function(options) {
    var self = new (Backbone.View.extend({}))(options);

    self.events = {
      'click .comments a': 'clickComments'
    };

    var helpers = {
      timeAgo: function(time) {
        return $.timeago(new Date(time * 1000))
      }
    };

    self.render = function() {
      var $tmpl = $.tmpl('reddits/index', {reddits: self.collection.toJSON()}, helpers);
      $(self.el).empty().append($tmpl);
      return self;
    };

    self.clickComments = function(e) {
      e.preventDefault();
      var $target = $(e.currentTarget);
      var $reddit = $target.closest('.reddit');
      var reddit = self.collection.get($reddit.data('id'));
      var comments = new redditBackbone.Comments();

      var view = $reddit.data('view');
      if (!view) {
        view = new redditBackbone.views.reddits.comments.Show({el: $reddit, model: reddit, collection: comments});
        $reddit.data('view', view);
      }
      view.openDialog();
      comments.fetch({url: '/comment?' + $.param({permalink: reddit.get('permalink')})});
    };

    function initialize() {
      self.collection.bind('reset', self.render);
      self.delegateEvents();
    }
    initialize();
    return self;
  };
})(redditBackbone);
