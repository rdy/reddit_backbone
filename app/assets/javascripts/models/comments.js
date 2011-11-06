//= require models/comment
(function (namespace) {
  namespace.Comments = Backbone.Collection.extend({
    model: namespace.Comment
  });
})(redditBackbone);
