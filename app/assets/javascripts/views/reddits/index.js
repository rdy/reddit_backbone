(function(namespace) {
  namespace.views = namespace.views || {};
  namespace.views.reddits = namespace.views.reddits || {};

  namespace.views.reddits.Index = function(options) {
    var self = new (Backbone.View.extend({}))(options);

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

    function initialize() {
      self.collection.bind('reset', self.render);
    }

    initialize();
    return self;
  };
})(redditBackbone);
