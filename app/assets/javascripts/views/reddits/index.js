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
      var reddit = self.collection.get($target.closest('.reddit').data('id'));
      $target.next('.dialog').dialog({
        title: reddit.get('title'),
        width: 500,
        height: 500
      });
    };

    function initialize() {
      self.collection.bind('reset', self.render);

      self.delegateEvents();
    }

    initialize();
    return self;
  };
})(redditBackbone);
