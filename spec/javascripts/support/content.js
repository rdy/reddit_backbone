(function() {
  $.extend(this, {
    content: function() {
      return $("#jasmine_content");
    }
  });
}).apply(jasmine);

beforeEach(function() {
  jasmine.content().empty();
});
