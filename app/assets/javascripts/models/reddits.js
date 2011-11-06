//= require models/reddit
(function (namespace) {
  namespace.Reddits = Backbone.Collection.extend({
    model: namespace.Reddit,
    url: '/reddits'
  });
})(redditBackbone);
