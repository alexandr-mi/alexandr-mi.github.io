(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var attrRE = /([\w-]+)|['"]{1}([^'"]*)['"]{1}/g;

// create optimized lookup object for
// void elements as listed here: 
// http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
var lookup = (Object.create) ? Object.create(null) : {};
lookup.area = true;
lookup.base = true;
lookup.br = true;
lookup.col = true;
lookup.embed = true;
lookup.hr = true;
lookup.img = true;
lookup.input = true;
lookup.keygen = true;
lookup.link = true;
lookup.menuitem = true;
lookup.meta = true;
lookup.param = true;
lookup.source = true;
lookup.track = true;
lookup.wbr = true;

var parseTag = function (tag) {
    var i = 0;
    var key;
    var res = {
        type: 'tag',
        name: '',
        voidElement: false,
        attrs: {},
        children: []
    };

    tag.replace(attrRE, function (match) {
        if (i % 2) {
            key = match;
        } else {
            if (i === 0) {
                if (lookup[match] || tag.charAt(tag.length - 2) === '/') {
                    res.voidElement = true;
                }
                res.name = match;
            } else {
                res.attrs[key] = match.replace(/['"]/g, '');
            }
        }
        i++;
    });

    return res;
};

/*jshint -W030 */
var tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

// re-used obj for quick lookups of components
var empty = Object.create ? Object.create(null) : {};

var parse = function parse(html, options) {
    options || (options = {});
    options.components || (options.components = empty);
    var result = [];
    var current;
    var level = -1;
    var arr = [];
    var byTag = {};
    var inComponent = false;

    html.replace(tagRE, function (tag, index) {
        if (inComponent) {
            if (tag !== ('</' + current.name + '>')) {
                return;
            } else {
                inComponent = false;
            }
        }
        var isOpen = tag.charAt(1) !== '/';
        var start = index + tag.length;
        var nextChar = html.charAt(start);
        var parent;

        if (isOpen) {
            level++;

            current = parseTag(tag);
            if (current.type === 'tag' && options.components[current.name]) {
                current.type = 'component';
                inComponent = true;
            }

            if (!current.voidElement && !inComponent && nextChar && nextChar !== '<') {
                current.children.push({
                    type: 'text',
                    content: html.slice(start, html.indexOf('<', start))
                });
            }

            byTag[current.tagName] = current;

            // if we're at root, push new base node
            if (level === 0) {
                result.push(current);
            }

            parent = arr[level - 1];

            if (parent) {
                parent.children.push(current);
            }

            arr[level] = current;
        }

        if (!isOpen || current.voidElement) {
            level--;
            if (!inComponent && nextChar !== '<' && nextChar) {
                // trailing text node
                arr[level].children.push({
                    type: 'text',
                    content: html.slice(start, html.indexOf('<', start))
                });
            }
        }
    });

    return result;
};

function attrString(attrs) {
    var buff = [];
    for (var key in attrs) {
        buff.push(key + '="' + attrs[key] + '"');
    }
    if (!buff.length) {
        return '';
    }
    return ' ' + buff.join(' ');
}

function stringify(buff, doc) {
    switch (doc.type) {
    case 'text':
        return buff + doc.content;
    case 'tag':
        buff += '<' + doc.name + (doc.attrs ? attrString(doc.attrs) : '') + (doc.voidElement ? '/>' : '>');
        if (doc.voidElement) {
            return buff;
        }
        return buff + doc.children.reduce(stringify, '') + '</' + doc.name + '>';
    }
}

var stringify_1 = function (doc) {
    return doc.reduce(function (token, rootEl) {
        return token + stringify('', rootEl);
    }, '');
};

var index = {
    parse: parse,
    stringify: stringify_1
};

Array.prototype.clean = function (deleteValue) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == deleteValue) {
			this.splice(i, 1);
			i--;
		}
	}
	return this;
};

function recur(obj, template, words) {
	// template = (template =='')? '$' : template;
	if (obj.type == "text") {
		obj.content = obj.content.split(/(?!$)/).map(function (char) {
			return template.replace(/\$/g, char);
		}).join("");

		if (words) {
			obj.content = obj.content.split(template.replace(/\$/g, ' ')).clean("").map(function (parsedword) {
				return words.replace(/\$/g, parsedword);
			}).join("");
		}
	}
	if (obj.children) {
		obj.children.forEach(function (tag) {
			recur(tag, template, words);
		});
	}
}

function Splitter(html, template, words) {
	var ast = index.parse(html);
	ast.forEach(function (tag) {
		recur(tag, template, words);
	});
	return index.stringify(ast);
}

module.exports = Splitter;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _splitHtmlToChars = require('split-html-to-chars');

var _splitHtmlToChars2 = _interopRequireDefault(_splitHtmlToChars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gradient_letters = function () {
  function Gradient_letters(string_selector, color_start, color_end, options) {
    _classCallCheck(this, Gradient_letters);

    this.string_selector = string_selector;
    this.string = document.querySelectorAll(this.string_selector);
    this.color_start = color_start;
    this.color_end = color_end;

    this.init();
  }

  _createClass(Gradient_letters, [{
    key: 'init',
    value: function init() {
      this.split_string();
      this.create_gradient();
    }
  }, {
    key: 'split_string',
    value: function split_string() {
      [].forEach.call(this.string, function (el) {
        el.outerHTML = (0, _splitHtmlToChars2.default)(el.outerHTML, '<span class="letter">$</span>');
      });
    }
  }, {
    key: 'create_gradient',
    value: function create_gradient() {
      var el = document.querySelector(this.string_selector),
          el_childNodes = el.childNodes,
          el_childNodes_length = el.childNodes.length,
          color_start_hex = this.color_start.slice(1),
          color_end_hex = this.color_end.slice(1);

      var color_start_rgb_hex = {
        r: color_start_hex[0] + color_start_hex[1],
        g: color_start_hex[2] + color_start_hex[3],
        b: color_start_hex[4] + color_start_hex[5]
      };

      var color_end_rgb_hex = {
        r: color_end_hex[0] + color_end_hex[1],
        g: color_end_hex[2] + color_end_hex[3],
        b: color_end_hex[4] + color_end_hex[5]
      };

      var color_start_rgb = {
        r: parseInt(color_start_rgb_hex.r, 16),
        g: parseInt(color_start_rgb_hex.g, 16),
        b: parseInt(color_start_rgb_hex.b, 16)
      };

      var color_end_rgb = {
        r: parseInt(color_end_rgb_hex.r, 16),
        g: parseInt(color_end_rgb_hex.g, 16),
        b: parseInt(color_end_rgb_hex.b, 16)
      };

      console.log(color_start_rgb, color_end_rgb);

      var difference = {
        r: color_start_rgb.r - color_end_rgb.r,
        g: color_start_rgb.g - color_end_rgb.g,
        b: color_start_rgb.b - color_end_rgb.b
      };

      var k = 1 / (el_childNodes_length - 1);

      for (var i = 0; i < el_childNodes_length; i++) {
        if (i === 0) {
          el_childNodes[i].style.color = 'rgb(' + color_start_rgb.r + ', ' + color_start_rgb.g + ', ' + color_start_rgb.b + ' )';
          continue;
        }

        var color = {
          r: color_start_rgb.r - difference.r * (k * i),
          g: color_start_rgb.g - difference.g * (k * i),
          b: color_start_rgb.b - difference.b * (k * i)
        };

        el_childNodes[i].style.color = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ' )';
      }
    }
  }]);

  return Gradient_letters;
}();

exports.default = Gradient_letters;
module.exports = exports['default'];

},{"split-html-to-chars":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite_animation = function () {
  function Sprite_animation(args) {
    _classCallCheck(this, Sprite_animation);

    this.container = args.container;
    this.img = args.img;
    this.img_width = args.img_width;
    this.img_height = args.img_height;
    this.col = args.col;
    this.row = args.row;
    this.scale = args.scale || 1;
    this.classes = args.class ? args.class.split(' ') : '';
    this.speed = args.speed || 50;

    this.init();
  }

  _createClass(Sprite_animation, [{
    key: 'add_container_style',
    value: function add_container_style() {
      this.container.style.width = this.img_width / this.col * this.scale + 'px';
      this.container.style.height = this.img_height / this.row * this.scale + 'px';
      this.container.style.position = 'relative';
      this.container.style.overflow = 'hidden';
    }
  }, {
    key: 'create_sprite',
    value: function create_sprite() {
      var sprite = document.createElement('img');
      sprite.style.width = 100 * this.col + '%';
      sprite.style.height = 100 * this.row + '%';
      sprite.style.position = 'absolute';
      sprite.style.top = '0';
      sprite.style.left = '0';
      sprite.setAttribute('src', this.img);
      sprite.classList.add('sprite_animation');

      if (this.classes[0] != '') {
        for (var i = 0; i < this.classes.length; i++) {
          sprite.classList.add(this.classes[i]);
        }
      };

      this.container.appendChild(sprite);
      this.sprite = document.querySelector('.sprite_animation');
    }
  }, {
    key: 'animation',
    value: function animation() {
      var _this = this;

      var counter = 0;
      var now_col = 0;
      var now_row = 0;
      var iteration = this.col * this.row;
      var sprite_width = this.img_width / this.col * this.scale;
      var sprite_height = this.img_height / this.row * this.scale;

      var go_animation = function go_animation() {
        setTimeout(function () {
          _this.sprite.style.transform = 'translate3D(' + -sprite_width * now_col + 'px, ' + -sprite_height * now_row + 'px, 0)';

          if (now_col === _this.col - 1) {
            now_col = 0;
            now_row++;
          } else {
            now_col++;
          }

          counter++;
          if (counter < iteration) {
            go_animation();
          }
        }, _this.speed);
      };

      go_animation();
    }
  }, {
    key: 'init',
    value: function init() {
      this.add_container_style();
      this.create_sprite();
      this.animation();
    }
  }]);

  return Sprite_animation;
}();

exports.default = Sprite_animation;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

var _Gradient = require('./Gradient');

var _Gradient2 = _interopRequireDefault(_Gradient);

var _Sprite_animation = require('./Sprite_animation');

var _Sprite_animation2 = _interopRequireDefault(_Sprite_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var title_animation = document.querySelector('.hero__lookbook-desktop');

new _Sprite_animation2.default({
  container: title_animation,
  img: './images/sprite/sprite-lookbook.png',
  img_width: 1614,
  img_height: 16800,
  col: 2,
  row: 42,
  scale: 1,
  speed: 35
});

},{"./Gradient":2,"./Sprite_animation":3}]},{},[4])

//# sourceMappingURL=main.js.map
