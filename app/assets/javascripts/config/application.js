//= require lib/router
(function(namespace) {
  namespace.Application = function(options) {
    options = options || {};

    var self = {};
    self.el = options.el || $('#root').get();

    self.ready = function() {
      new namespace.Router();
      Backbone.history.start();
    };

    return self;
  };

  namespace.application = new namespace.Application();
})(redditBackbone);

$(redditBackbone.application.ready);
