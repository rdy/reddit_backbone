(function(namespace) {
  namespace.views = namespace.views || {};
  namespace.views.reddits = namespace.views.reddits || {};

  namespace.views.reddits.Index = Backbone.View.extend({
    initialize: function(options) {
      _(this).bindAll('render');

      this.collection.bind('reset', this.render);
    },
    render: function() {
      var helpers = {
        timeAgo: function(time) {
          return $.timeago(new Date(time * 1000))
        }
      };
      var $tmpl = $.tmpl('reddits/index', {reddits: this.collection.toJSON()}, helpers);
      $(this.el).empty().append($tmpl);

      return this;
    }
  });
})(redditBackbone);
