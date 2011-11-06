//= require config/routes
(function(namespace) {
  namespace.Router = function() {
    var self = new Backbone.Router();

    self.routes = {
      '': 'reddits#index'
    };

    function drawRoutes() {
      _(namespace.routes).chain().values().each(function(resource) {
        var matches = _(resource.match(/^(.*)\.?([^.]*)#(.*)$/)).chain().rest(1).compact().value();
        var actionName = matches.pop();
        var paths = matches[0].split('.');
        var controllerName = _(paths.pop() + 'Controller').classify();
        var module = _(paths).inject(function(n, name) {
          return n[name];
        }, namespace);
        self[resource] = function() {
          var controller = new (module[controllerName])();
          var args = Array.prototype.slice.call(arguments, 0);
          var last = _(args).last();
          if (last && last.indexOf('=') !== -1) {
            args.push($.unparam(args.pop()));
          }
          controller[actionName].apply(controller, args);
        };
      });
      self._bindRoutes();
    }

    drawRoutes();
    return self;
  };
})(redditBackbone);

