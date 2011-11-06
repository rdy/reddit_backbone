(function(namespace) {
  namespace.views = namespace.views || {};
  namespace.views.reddits = namespace.views.reddits || {};
  namespace.views.reddits.comments = namespace.views.reddits.comments || {};
  namespace.views.reddits.comments.Show = function(options) {
    var self = new (Backbone.View.extend({}))(options);

    var $dialog = self.$('.dialog').dialog({
      autoOpen: false,
      title: self.model.get('title'),
      width: 500,
      height: 500
    });

    self.render = function() {
      var $tmpl = $.tmpl('comments/index', {comments: self.collection.toJSON()});
      $dialog.dialog('widget').find('.ui-dialog-content').empty().append($tmpl);
      return self;
    };

    self.openDialog = function() {
      $dialog.dialog('open');
    };

    function initialize() {
      self.collection.bind('reset', self.render);
    }

    initialize();
    return self;
  };
})(redditBackbone);
