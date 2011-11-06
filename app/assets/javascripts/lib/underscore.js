(function() {
  this.mixin({
    classify: function(str) {
      var s = this.trim(str).replace(/(\-|_|\s)+(.)?/g, function(match, separator, chr) {
        return chr ? chr.toUpperCase() : '';
      });
      return s.charAt(0).toUpperCase() + s.substring(1);
    },
    except: function(obj) {
      if (obj === null) { return results; }
      var args;
      if (arguments.length === 2 && _(arguments[1]).isArray()) {
        args = arguments[1];
      } else {
        args = Array.prototype.slice.call(arguments, 1);
      }
      var result = _(obj).clone();
      _(args).each(function(arg) {
        delete result[arg];
      });
      return result;
    },
    only: function(obj) {
      function only() {
        var args = _(arguments);
        return _(obj).inject(function(result, value, key) {
          if (args.include(key)) {
            result[key] = value;
          }
          return result;
        }, {});
      }
      if (arguments.length === 2 && _(arguments[1]).isArray()) {
        return only.apply(this, arguments[1]);
      } else {
        return only.apply(this, Array.prototype.slice.call(arguments, 1));
      }
    }
  });
}).apply(_);
