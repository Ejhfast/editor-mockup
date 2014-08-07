// Generated by CoffeeScript 1.7.1
(function() {
  var CommonWords, Dash, Editor, FlowBar, Hinter,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Editor = (function(_super) {
    __extends(Editor, _super);

    function Editor() {
      return Editor.__super__.constructor.apply(this, arguments);
    }

    Editor.content = function(params) {
      return this.div({
        "class": "pane"
      }, (function(_this) {
        return function() {
          _this.div({
            "class": "document"
          }, function() {
            return _this.textarea({
              "class": "editor",
              keydown: 'update',
              outlet: "text"
            });
          });
          _this.div({
            "class": "document"
          }, function() {
            return _this.subview('flow_bar', new FlowBar);
          });
          return _this.div({
            "class": "document"
          }, function() {
            _this.subview('hinter', new Hinter);
            _this.subview('common_words', new CommonWords);
            return _this.subview('dash', new Dash);
          });
        };
      })(this));
    };

    Editor.prototype.initialize = function(params) {
      return setInterval(((function(_this) {
        return function() {
          return _this.flow_bar.update(_this.text.val());
        };
      })(this)), 3000);
    };

    Editor.prototype.update = function(args) {
      var content, _ref;
      content = this.text.val();
      this.dash.update(content);
      if ((190 <= (_ref = args.keyCode) && _ref <= 191)) {
        this.hinter.shuffle();
        return this.common_words.update(content);
      }
    };

    return Editor;

  })(View);

  Hinter = (function(_super) {
    __extends(Hinter, _super);

    function Hinter() {
      return Hinter.__super__.constructor.apply(this, arguments);
    }

    Hinter.content = function(params) {
      return this.div({
        "class": 'hinter'
      }, (function(_this) {
        return function() {
          return _this.ol({
            outlet: "hints"
          });
        };
      })(this));
    };

    Hinter.prototype.initialize = function(params) {
      return this.shuffle();
    };

    Hinter.prototype.shuffle = function() {
      var el, possible, _i, _len, _ref, _results;
      possible = ["run", "walk", "hike", "eat", "drink", "laugh", "door", "color", "hill", "sky", "field", "land", "basement", "what's up?", "how's it going?", "red", "blue", "deserted", "empty", "wind-swept", "tree"];
      this.hints.html("");
      _ref = _.sample(possible, 10);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        _results.push(this.hints.append("<li>" + el + "</li>"));
      }
      return _results;
    };

    return Hinter;

  })(View);

  Dash = (function(_super) {
    __extends(Dash, _super);

    function Dash() {
      return Dash.__super__.constructor.apply(this, arguments);
    }

    Dash.content = function(params) {
      return this.div({
        "class": 'dash'
      }, (function(_this) {
        return function() {
          _this.b("Paragraphs:");
          _this.span({
            outlet: "paras"
          }, 0);
          _this.b("Words:");
          _this.span({
            outlet: "words"
          }, 0);
          _this.b("Characters:");
          return _this.span({
            outlet: "chars"
          }, 0);
        };
      })(this));
    };

    Dash.prototype.update = function(text) {
      var count_c, count_p, count_w;
      console.log(text);
      count_c = text.length;
      this.chars.html(count_c);
      count_w = text.split(" ").length;
      this.words.html(count_w);
      count_p = text.split("\n").length;
      return this.paras.html(count_p);
    };

    return Dash;

  })(View);

  CommonWords = (function(_super) {
    __extends(CommonWords, _super);

    function CommonWords() {
      return CommonWords.__super__.constructor.apply(this, arguments);
    }

    CommonWords.content = function(params) {
      return this.div({
        "class": "common_words"
      }, (function(_this) {
        return function() {
          return _this.ol({
            outlet: "words"
          });
        };
      })(this));
    };

    CommonWords.prototype.initialize = function(params) {
      this.empty = "<li>no repeated words</li>";
      return this.words.html(this.empty);
    };

    CommonWords.prototype.update = function(text) {
      var best, counts, groups, n, t, to_lc, word, _i, _len, _ref, _results;
      this.words.html(this.empty);
      to_lc = (function() {
        var _i, _len, _ref, _results;
        _ref = text.split(" ");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          _results.push(t.toLowerCase());
        }
        return _results;
      })();
      counts = {};
      groups = _.filter(_.map(_.groupBy(to_lc, function(l) {
        return l;
      }), function(v, k) {
        return [k, v.length];
      }), function(_arg) {
        var n, w;
        w = _arg[0], n = _arg[1];
        return n > 1;
      });
      best = _.first(_.sortBy(groups, function(_arg) {
        var k, n;
        k = _arg[0], n = _arg[1];
        return n * -1;
      }), 10);
      if (best.length >= 1) {
        this.words.html("");
        _results = [];
        for (_i = 0, _len = best.length; _i < _len; _i++) {
          _ref = best[_i], word = _ref[0], n = _ref[1];
          _results.push(this.words.append("<li><b>" + word + ":</b><span>" + n + "</span></li>"));
        }
        return _results;
      }
    };

    return CommonWords;

  })(View);

  FlowBar = (function(_super) {
    __extends(FlowBar, _super);

    function FlowBar() {
      return FlowBar.__super__.constructor.apply(this, arguments);
    }

    FlowBar.content = function(params) {
      return this.div({
        "class": "flow_bar"
      }, (function(_this) {
        return function() {
          return _this.ol({
            outlet: "bar"
          });
        };
      })(this));
    };

    FlowBar.prototype.initialize = function(params) {
      return this.count = 0;
    };

    FlowBar.prototype.update = function(text) {
      var diff, i, word_count, _i, _ref;
      word_count = text.length;
      diff = word_count - this.count;
      if (diff < 0) {
        diff = 0;
      }
      this.bar.html("");
      for (i = _i = 0, _ref = diff * 3; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.bar.append("-");
      }
      return this.count = word_count;
    };

    return FlowBar;

  })(View);

  $('document').ready(function() {
    return $('body').append(new Editor);
  });

}).call(this);
