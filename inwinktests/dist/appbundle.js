webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(4);
	module.exports = __webpack_require__(15);


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot check for update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
					} else {
						console.warn("[HMR] Update check failed: " + err.stack || err.message);
					}
					return;
				}
	
				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					return;
				}
	
				module.hot.apply({
					ignoreUnaccepted: true
				}, function(err, renewedModules) {
					if(err) {
						if(module.hot.status() in {
								abort: 1,
								fail: 1
							}) {
							console.warn("[HMR] Cannot apply update. Need to do a full reload!");
							console.warn("[HMR] " + err.stack || err.message);
						} else {
							console.warn("[HMR] Update failed: " + err.stack || err.message);
						}
						return;
					}
	
					if(!upToDate()) {
						check();
					}
	
					__webpack_require__(3)(updatedModules, renewedModules);
	
					if(upToDate()) {
						console.log("[HMR] App is up to date.");
					}
				});
			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ },

/***/ 3:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});
	
		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}
	
		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*eslint-env browser*/
	/*global __resourceQuery*/
	
	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false,
	  log: true,
	  warn: true
	};
	if (false) {
	  var querystring = require('querystring');
	  var overrides = querystring.parse(__resourceQuery.slice(1));
	  if (overrides.path) options.path = overrides.path;
	  if (overrides.timeout) options.timeout = overrides.timeout;
	  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
	  if (overrides.reload) options.reload = overrides.reload !== 'false';
	  if (overrides.noInfo && overrides.noInfo !== 'false') {
	    options.log = false;
	  }
	  if (overrides.quiet && overrides.quiet !== 'false') {
	    options.log = false;
	    options.warn = false;
	  }
	}
	
	if (typeof window === 'undefined') {
	  // do nothing
	} else if (typeof window.EventSource === 'undefined') {
	  console.warn(
	    "webpack-hot-middleware's client requires EventSource to work. " +
	    "You should include a polyfill if you want to support this browser: " +
	    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
	  );
	} else {
	  connect(window.EventSource);
	}
	
	function connect(EventSource) {
	  var source = new EventSource(options.path);
	  var lastActivity = new Date();
	
	  source.onopen = handleOnline;
	  source.onmessage = handleMessage;
	  source.onerror = handleDisconnect;
	
	  var timer = setInterval(function() {
	    if ((new Date() - lastActivity) > options.timeout) {
	      handleDisconnect();
	    }
	  }, options.timeout / 2);
	
	  function handleOnline() {
	    if (options.log) console.log("[HMR] connected");
	    lastActivity = new Date();
	  }
	
	  function handleMessage(event) {
	    lastActivity = new Date();
	    if (event.data == "\uD83D\uDC93") {
	      return;
	    }
	    try {
	      processMessage(JSON.parse(event.data));
	    } catch (ex) {
	      if (options.warn) {
	        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	      }
	    }
	  }
	
	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(function() { connect(EventSource); }, options.timeout);
	  }
	
	}
	
	var reporter;
	// the reporter needs to be a singleton on the page
	// in case the client is being used by mutliple bundles
	// we only want to report once.
	// all the errors will go to all clients
	var singletonKey = '__webpack_hot_middleware_reporter__';
	if (typeof window !== 'undefined' && !window[singletonKey]) {
	  reporter = window[singletonKey] = createReporter();
	}
	
	function createReporter() {
	  var strip = __webpack_require__(6);
	
	  var overlay;
	  if (typeof document !== 'undefined' && options.overlay) {
	    overlay = __webpack_require__(8);
	  }
	
	  return {
	    problems: function(type, obj) {
	      if (options.warn) {
	        console.warn("[HMR] bundle has " + type + ":");
	        obj[type].forEach(function(msg) {
	          console.warn("[HMR] " + strip(msg));
	        });
	      }
	      if (overlay && type !== 'warnings') overlay.showProblems(type, obj[type]);
	    },
	    success: function() {
	      if (overlay) overlay.clear();
	    },
	    useCustomOverlay: function(customOverlay) {
	      overlay = customOverlay;
	    }
	  };
	}
	
	var processUpdate = __webpack_require__(14);
	
	var customHandler;
	function processMessage(obj) {
	  if (obj.action == "building") {
	    if (options.log) console.log("[HMR] bundle rebuilding");
	  } else if (obj.action == "built") {
	    if (options.log) {
	      console.log(
	        "[HMR] bundle " + (obj.name ? obj.name + " " : "") +
	        "rebuilt in " + obj.time + "ms"
	      );
	    }
	    if (obj.errors.length > 0) {
	      if (reporter) reporter.problems('errors', obj);
	    } else {
	      if (reporter) {
	        if (obj.warnings.length > 0) reporter.problems('warnings', obj);
	        reporter.success();
	      }
	
	      processUpdate(obj.hash, obj.modules, options);
	    }
	  } else if (customHandler) {
	    customHandler(obj);
	  }
	}
	
	if (module) {
	  module.exports = {
	    subscribe: function subscribe(handler) {
	      customHandler = handler;
	    },
	    useCustomOverlay: function useCustomOverlay(customOverlay) {
	      if (reporter) reporter.useCustomOverlay(customOverlay);
	    }
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(7)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },

/***/ 7:
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
	};


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	/*eslint-env browser*/
	
	var clientOverlay = document.createElement('div');
	var styles = {
	  background: 'rgba(0,0,0,0.85)',
	  color: '#E8E8E8',
	  lineHeight: '1.2',
	  whiteSpace: 'pre',
	  fontFamily: 'Menlo, Consolas, monospace',
	  fontSize: '13px',
	  position: 'fixed',
	  zIndex: 9999,
	  padding: '10px',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  overflow: 'auto'
	};
	for (var key in styles) {
	  clientOverlay.style[key] = styles[key];
	}
	
	var ansiHTML = __webpack_require__(9);
	var colors = {
	  reset: ['transparent', 'transparent'],
	  black: '181818',
	  red: 'E36049',
	  green: 'B3CB74',
	  yellow: 'FFD080',
	  blue: '7CAFC2',
	  magenta: '7FACCA',
	  cyan: 'C3C2EF',
	  lightgrey: 'EBE7E3',
	  darkgrey: '6D7891'
	};
	ansiHTML.setColors(colors);
	
	var Entities = __webpack_require__(10).AllHtmlEntities;
	var entities = new Entities();
	
	exports.showProblems =
	function showProblems(type, lines) {
	  clientOverlay.innerHTML = '';
	  lines.forEach(function(msg) {
	    msg = ansiHTML(entities.encode(msg));
	    var div = document.createElement('div');
	    div.style.marginBottom = '26px';
	    div.innerHTML = problemType(type) + ' in ' + msg;
	    clientOverlay.appendChild(div);
	  });
	  if (document.body) {
	    document.body.appendChild(clientOverlay);
	  }
	};
	
	exports.clear =
	function clear() {
	  if (document.body && clientOverlay.parentNode) {
	    document.body.removeChild(clientOverlay);
	  }
	};
	
	var problemColors = {
	  errors: colors.red,
	  warnings: colors.yellow
	};
	
	function problemType (type) {
	  var color = problemColors[type] || colors.red;
	  return (
	    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
	      type.slice(0, -1).toUpperCase() +
	    '</span>'
	  );
	}


/***/ },

/***/ 9:
/***/ function(module, exports) {

	module.exports = ansiHTML;
	
	// Reference to https://github.com/sindresorhus/ansi-regex
	var re_ansi = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
	
	var _defColors = {
	  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
	  black: '000',
	  red: 'ff0000',
	  green: '209805',
	  yellow: 'e8bf03',
	  blue: '0000ff',
	  magenta: 'ff00ff',
	  cyan: '00ffee',
	  lightgrey: 'f0f0f0',
	  darkgrey: '888'
	};
	var _styles = {
	  30: 'black',
	  31: 'red',
	  32: 'green',
	  33: 'yellow',
	  34: 'blue',
	  35: 'magenta',
	  36: 'cyan',
	  37: 'lightgrey'
	};
	var _openTags = {
	  '1': 'font-weight:bold', // bold
	  '2': 'opacity:0.8', // dim
	  '3': '<i>', // italic
	  '4': '<u>', // underscore
	  '8': 'display:none', // hidden
	  '9': '<del>', // delete
	};
	var _closeTags = {
	  '23': '</i>', // reset italic
	  '24': '</u>', // reset underscore
	  '29': '</del>' // reset delete
	};
	[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
	  _closeTags[n] = '</span>';
	});
	
	/**
	 * Converts text with ANSI color codes to HTML markup.
	 * @param {String} text
	 * @returns {*}
	 */
	function ansiHTML(text) {
	  // Returns the text if the string has no ANSI escape code.
	  if (!re_ansi.test(text)) {
	    return text;
	  }
	
	  // Cache opened sequence.
	  var ansiCodes = [];
	  // Replace with markup.
	  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
	    var ot = _openTags[seq];
	    if (ot) {
	      // If current sequence has been opened, close it.
	      if (!!~ansiCodes.indexOf(seq)) {
	        ansiCodes.pop();
	        return '</span>';
	      }
	      // Open tag.
	      ansiCodes.push(seq);
	      return ot[0] == '<' ? ot : '<span style="' + ot + ';">';
	    }
	
	    var ct = _closeTags[seq];
	    if (ct) {
	      // Pop sequence
	      ansiCodes.pop();
	      return ct;
	    }
	    return '';
	  });
	
	  // Make sure tags are closed.
	  var l = ansiCodes.length;
	  (l > 0) && (ret += Array(l + 1).join('</span>'));
	
	  return ret;
	}
	
	/**
	 * Customize colors.
	 * @param {Object} colors reference to _defColors
	 */
	ansiHTML.setColors = function (colors) {
	  if (typeof colors != 'object') {
	    throw new Error('`colors` parameter must be an Object.');
	  }
	
	  var _finalColors = {};
	  for (var key in _defColors) {
	    var hex = colors.hasOwnProperty(key) ? colors[key] : null;
	    if (!hex) {
	      _finalColors[key] = _defColors[key];
	      continue;
	    }
	    if ('reset' == key) {
	    	if(typeof hex == 'string'){
	    		hex = [hex];
	    	}
	      if (!Array.isArray(hex) || hex.length == 0 || hex.some(function (h) {
	          return typeof h != 'string';
	        })) {
	        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
	      }
	      var defHexColor = _defColors[key];
	      if(!hex[0]){
	      	hex[0] = defHexColor[0];
	      }
	      if (hex.length == 1 || !hex[1]) {
	      	hex = [hex[0]];
	        hex.push(defHexColor[1]);
	      }
	
	      hex = hex.slice(0, 2);
	    } else if (typeof hex != 'string') {
	      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
	    }
	    _finalColors[key] = hex;
	  }
	  _setTags(_finalColors);
	};
	
	/**
	 * Reset colors.
	 */
	ansiHTML.reset = function(){
		_setTags(_defColors);
	};
	
	/**
	 * Expose tags, including open and close.
	 * @type {Object}
	 */
	ansiHTML.tags = {
	  get open() {
	    return _openTags;
	  },
	  get close() {
	    return _closeTags;
	  }
	};
	
	function _setTags(colors) {
	  // reset all
	  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1];
	  // inverse
	  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0];
	  // dark grey
	  _openTags['90'] = 'color:#' + colors.darkgrey;
	
	  for (var code in _styles) {
	    var color = _styles[code];
	    var oriColor = colors[color] || '000';
	    _openTags[code] = 'color:#' + oriColor;
	    code = parseInt(code);
	    _openTags[(code + 10).toString()] = 'background:#' + oriColor;
	  }
	}
	
	ansiHTML.reset();


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  XmlEntities: __webpack_require__(11),
	  Html4Entities: __webpack_require__(12),
	  Html5Entities: __webpack_require__(13),
	  AllHtmlEntities: __webpack_require__(13)
	};


/***/ },

/***/ 11:
/***/ function(module, exports) {

	var ALPHA_INDEX = {
	    '&lt': '<',
	    '&gt': '>',
	    '&quot': '"',
	    '&apos': '\'',
	    '&amp': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&apos;': '\'',
	    '&amp;': '&'
	};
	
	var CHAR_INDEX = {
	    60: 'lt',
	    62: 'gt',
	    34: 'quot',
	    39: 'apos',
	    38: 'amp'
	};
	
	var CHAR_S_INDEX = {
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    '\'': '&apos;',
	    '&': '&amp;'
	};
	
	/**
	 * @constructor
	 */
	function XmlEntities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/<|>|"|'|&/g, function(s) {
	        return CHAR_S_INDEX[s];
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encode = function(str) {
	    return new XmlEntities().encode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
	        if (s.charAt(1) === '#') {
	            var code = s.charAt(2).toLowerCase() === 'x' ?
	                parseInt(s.substr(3), 16) :
	                parseInt(s.substr(2));
	
	            if (isNaN(code) || code < -32768 || code > 65535) {
	                return '';
	            }
	            return String.fromCharCode(code);
	        }
	        return ALPHA_INDEX[s] || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.decode = function(str) {
	    return new XmlEntities().decode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var alpha = CHAR_INDEX[c];
	        if (alpha) {
	            result += "&" + alpha + ";";
	            i++;
	            continue;
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonUTF = function(str) {
	    return new XmlEntities().encodeNonUTF(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonASCII = function(str) {
	    var strLenght = str.length;
	    if (strLenght === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLenght) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonASCII = function(str) {
	    return new XmlEntities().encodeNonASCII(str);
	 };
	
	module.exports = XmlEntities;


/***/ },

/***/ 12:
/***/ function(module, exports) {

	var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'Oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'oelig', 'oelig', 'scaron', 'scaron', 'yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
	var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
	
	var alphaIndex = {};
	var numIndex = {};
	
	var i = 0;
	var length = HTML_ALPHA.length;
	while (i < length) {
	    var a = HTML_ALPHA[i];
	    var c = HTML_CODES[i];
	    alphaIndex[a] = String.fromCharCode(c);
	    numIndex[c] = a;
	    i++;
	}
	
	/**
	 * @constructor
	 */
	function Html4Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1).toLowerCase() === 'x' ?
	                parseInt(entity.substr(2), 16) :
	                parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.decode = function(str) {
	    return new Html4Entities().decode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encode = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var alpha = numIndex[str.charCodeAt(i)];
	        result += alpha ? "&" + alpha + ";" : str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encode = function(str) {
	    return new Html4Entities().encode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var cc = str.charCodeAt(i);
	        var alpha = numIndex[cc];
	        if (alpha) {
	            result += "&" + alpha + ";";
	        } else if (cc < 32 || cc > 126) {
	            result += "&#" + cc + ";";
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonUTF = function(str) {
	    return new Html4Entities().encodeNonUTF(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonASCII = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonASCII = function(str) {
	    return new Html4Entities().encodeNonASCII(str);
	};
	
	module.exports = Html4Entities;


/***/ },

/***/ 13:
/***/ function(module, exports) {

	var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['CloseCurlyDoubleQuote', [8221]], ['CloseCurlyQuote', [8217]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
	
	var alphaIndex = {};
	var charIndex = {};
	
	createIndexes(alphaIndex, charIndex);
	
	/**
	 * @constructor
	 */
	function Html5Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1) === 'x' ?
	                parseInt(entity.substr(2).toLowerCase(), 16) :
	                parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.decode = function(str) {
	    return new Html5Entities().decode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encode = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var charInfo = charIndex[str.charCodeAt(i)];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        result += str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encode = function(str) {
	    return new Html5Entities().encode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var charInfo = charIndex[c];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonUTF = function(str) {
	    return new Html5Entities().encodeNonUTF(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonASCII = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonASCII = function(str) {
	    return new Html5Entities().encodeNonASCII(str);
	 };
	
	/**
	 * @param {Object} alphaIndex Passed by reference.
	 * @param {Object} charIndex Passed by reference.
	 */
	function createIndexes(alphaIndex, charIndex) {
	    var i = ENTITIES.length;
	    var _results = [];
	    while (i--) {
	        var e = ENTITIES[i];
	        var alpha = e[0];
	        var chars = e[1];
	        var chr = chars[0];
	        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
	        var charInfo;
	        if (addChar) {
	            charInfo = charIndex[chr] = charIndex[chr] || {};
	        }
	        if (chars[1]) {
	            var chr2 = chars[1];
	            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
	            _results.push(addChar && (charInfo[chr2] = alpha));
	        } else {
	            alphaIndex[alpha] = String.fromCharCode(chr);
	            _results.push(addChar && (charInfo[''] = alpha));
	        }
	    }
	}
	
	module.exports = Html5Entities;


/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Based heavily on https://github.com/webpack/webpack/blob/
	 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
	 * Original copyright Tobias Koppers @sokra (MIT license)
	 */
	
	/* global window __webpack_hash__ */
	
	if (false) {
	  throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	var hmrDocsUrl = "http://webpack.github.io/docs/hot-module-replacement-with-webpack.html"; // eslint-disable-line max-len
	
	var lastHash;
	var failureStatuses = { abort: 1, fail: 1 };
	var applyOptions = { ignoreUnaccepted: true };
	
	function upToDate(hash) {
	  if (hash) lastHash = hash;
	  return lastHash == __webpack_require__.h();
	}
	
	module.exports = function(hash, moduleMap, options) {
	  var reload = options.reload;
	  if (!upToDate(hash) && module.hot.status() == "idle") {
	    if (options.log) console.log("[HMR] Checking for updates on the server...");
	    check();
	  }
	
	  function check() {
	    var cb = function(err, updatedModules) {
	      if (err) return handleError(err);
	
	      if(!updatedModules) {
	        if (options.warn) {
	          console.warn("[HMR] Cannot find update (Full reload needed)");
	          console.warn("[HMR] (Probably because of restarting the server)");
	        }
	        performReload();
	        return null;
	      }
	
	      var applyCallback = function(applyErr, renewedModules) {
	        if (applyErr) return handleError(applyErr);
	
	        if (!upToDate()) check();
	
	        logUpdates(updatedModules, renewedModules);
	      };
	
	      var applyResult = module.hot.apply(applyOptions, applyCallback);
	      // webpack 2 promise
	      if (applyResult && applyResult.then) {
	        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
	        applyResult.then(function(outdatedModules) {
	          applyCallback(null, outdatedModules);
	        });
	        applyResult.catch(applyCallback);
	      }
	
	    };
	
	    var result = module.hot.check(false, cb);
	    // webpack 2 promise
	    if (result && result.then) {
	        result.then(function(updatedModules) {
	            cb(null, updatedModules);
	        });
	        result.catch(cb);
	    }
	  }
	
	  function logUpdates(updatedModules, renewedModules) {
	    var unacceptedModules = updatedModules.filter(function(moduleId) {
	      return renewedModules && renewedModules.indexOf(moduleId) < 0;
	    });
	
	    if(unacceptedModules.length > 0) {
	      if (options.warn) {
	        console.warn(
	          "[HMR] The following modules couldn't be hot updated: " +
	          "(Full reload needed)\n" +
	          "This is usually because the modules which have changed " +
	          "(and their parents) do not know how to hot reload themselves. " +
	          "See " + hmrDocsUrl + " for more details."
	        );
	        unacceptedModules.forEach(function(moduleId) {
	          console.warn("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	      performReload();
	      return;
	    }
	
	    if (options.log) {
	      if(!renewedModules || renewedModules.length === 0) {
	        console.log("[HMR] Nothing hot updated.");
	      } else {
	        console.log("[HMR] Updated modules:");
	        renewedModules.forEach(function(moduleId) {
	          console.log("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	
	      if (upToDate()) {
	        console.log("[HMR] App is up to date.");
	      }
	    }
	  }
	
	  function handleError(err) {
	    if (module.hot.status() in failureStatuses) {
	      if (options.warn) {
	        console.warn("[HMR] Cannot check for update (Full reload needed)");
	        console.warn("[HMR] " + err.stack || err.message);
	      }
	      performReload();
	      return;
	    }
	    if (options.warn) {
	      console.warn("[HMR] Update check failed: " + err.stack || err.message);
	    }
	  }
	
	  function performReload() {
	    if (reload) {
	      if (options.warn) console.warn("[HMR] Reloading page");
	      window.location.reload();
	    }
	  }
	};


/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var React = __webpack_require__(89);
	var ReactDOM = __webpack_require__(105);
	var i18nservice_1 = __webpack_require__(192);
	var app_routes_1 = __webpack_require__(201);
	__webpack_require__(320);
	__webpack_require__(322);
	var approot = document.getElementById("approot");
	var supportedLanguages = ["fr", "en"];
	ReactDOM.render(React.createElement(i18nservice_1.Localized, {supported: supportedLanguages, default: "en"}, React.createElement(app_routes_1.AppRoutes, null)), approot);
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "app.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(17);

/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var makePatchReactClass = __webpack_require__(18);
	
	/**
	 * Returns a function that, when invoked, patches a React class with a new
	 * version of itself. To patch different classes, pass different IDs.
	 */
	module.exports = function makeMakeHot(getRootInstances, React) {
	  if (typeof getRootInstances !== 'function') {
	    throw new Error('Expected getRootInstances to be a function.');
	  }
	
	  var patchers = {};
	
	  return function makeHot(NextClass, persistentId) {
	    persistentId = persistentId || NextClass.displayName || NextClass.name;
	
	    if (!persistentId) {
	      console.error(
	        'Hot reload is disabled for one of your types. To enable it, pass a ' +
	        'string uniquely identifying this class within this current module ' +
	        'as a second parameter to makeHot.'
	      );
	      return NextClass;
	    }
	
	    if (!patchers[persistentId]) {
	      patchers[persistentId] = makePatchReactClass(getRootInstances, React);
	    }
	
	    var patchReactClass = patchers[persistentId];
	    return patchReactClass(NextClass);
	  };
	};

/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var makeAssimilatePrototype = __webpack_require__(19),
	    requestForceUpdateAll = __webpack_require__(20);
	
	function hasNonStubTypeProperty(ReactClass) {
	  if (!ReactClass.hasOwnProperty('type')) {
	    return false;
	  }
	
	  var descriptor = Object.getOwnPropertyDescriptor(ReactClass, 'type');
	  if (typeof descriptor.get === 'function') {
	    return false;
	  }
	
	  return true;
	}
	
	function getPrototype(ReactClass) {
	  var prototype = ReactClass.prototype,
	      seemsLegit = prototype && typeof prototype.render === 'function';
	
	  if (!seemsLegit && hasNonStubTypeProperty(ReactClass)) {
	    prototype = ReactClass.type.prototype;
	  }
	
	  return prototype;
	}
	
	/**
	 * Returns a function that will patch React class with new versions of itself
	 * on subsequent invocations. Both legacy and ES6 style classes are supported.
	 */
	module.exports = function makePatchReactClass(getRootInstances, React) {
	  var assimilatePrototype = makeAssimilatePrototype(),
	      FirstClass = null;
	
	  return function patchReactClass(NextClass) {
	    var nextPrototype = getPrototype(NextClass);
	    assimilatePrototype(nextPrototype);
	
	    if (FirstClass) {
	      requestForceUpdateAll(getRootInstances, React);
	    }
	
	    return FirstClass || (FirstClass = NextClass);
	  };
	};

/***/ },

/***/ 19:
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Returns a function that establishes the first prototype passed to it
	 * as the "source of truth" and patches its methods on subsequent invocations,
	 * also patching current and previous prototypes to forward calls to it.
	 */
	module.exports = function makeAssimilatePrototype() {
	  var storedPrototype,
	      knownPrototypes = [];
	
	  function wrapMethod(key) {
	    return function () {
	      if (storedPrototype[key]) {
	        return storedPrototype[key].apply(this, arguments);
	      }
	    };
	  }
	
	  function patchProperty(proto, key) {
	    proto[key] = storedPrototype[key];
	
	    if (typeof proto[key] !== 'function' ||
	      key === 'type' ||
	      key === 'constructor') {
	      return;
	    }
	
	    proto[key] = wrapMethod(key);
	
	    if (storedPrototype[key].isReactClassApproved) {
	      proto[key].isReactClassApproved = storedPrototype[key].isReactClassApproved;
	    }
	
	    if (proto.__reactAutoBindMap && proto.__reactAutoBindMap[key]) {
	      proto.__reactAutoBindMap[key] = proto[key];
	    }
	  }
	
	  function updateStoredPrototype(freshPrototype) {
	    storedPrototype = {};
	
	    Object.getOwnPropertyNames(freshPrototype).forEach(function (key) {
	      storedPrototype[key] = freshPrototype[key];
	    });
	  }
	
	  function reconcileWithStoredPrototypes(freshPrototype) {
	    knownPrototypes.push(freshPrototype);
	    knownPrototypes.forEach(function (proto) {
	      Object.getOwnPropertyNames(storedPrototype).forEach(function (key) {
	        patchProperty(proto, key);
	      });
	    });
	  }
	
	  return function assimilatePrototype(freshPrototype) {
	    if (Object.prototype.hasOwnProperty.call(freshPrototype, '__isAssimilatedByReactHotAPI')) {
	      return;
	    }
	
	    updateStoredPrototype(freshPrototype);
	    reconcileWithStoredPrototypes(freshPrototype);
	    freshPrototype.__isAssimilatedByReactHotAPI = true;
	  };
	};

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	var deepForceUpdate = __webpack_require__(21);
	
	var isRequestPending = false;
	
	module.exports = function requestForceUpdateAll(getRootInstances, React) {
	  if (isRequestPending) {
	    return;
	  }
	
	  /**
	   * Forces deep re-render of all mounted React components.
	   * Hats off to Omar Skalli (@Chetane) for suggesting this approach:
	   * https://gist.github.com/Chetane/9a230a9fdcdca21a4e29
	   */
	  function forceUpdateAll() {
	    isRequestPending = false;
	
	    var rootInstances = getRootInstances(),
	        rootInstance;
	
	    for (var key in rootInstances) {
	      if (rootInstances.hasOwnProperty(key)) {
	        rootInstance = rootInstances[key];
	
	        // `|| rootInstance` for React 0.12 and earlier
	        rootInstance = rootInstance._reactInternalInstance || rootInstance;
	        deepForceUpdate(rootInstance, React);
	      }
	    }
	  }
	
	  setTimeout(forceUpdateAll);
	};


/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindAutoBindMethods = __webpack_require__(22);
	var traverseRenderedChildren = __webpack_require__(23);
	
	function setPendingForceUpdate(internalInstance) {
	  if (internalInstance._pendingForceUpdate === false) {
	    internalInstance._pendingForceUpdate = true;
	  }
	}
	
	function forceUpdateIfPending(internalInstance, React) {
	  if (internalInstance._pendingForceUpdate === true) {
	    // `|| internalInstance` for React 0.12 and earlier
	    var instance = internalInstance._instance || internalInstance;
	
	    if (instance.forceUpdate) {
	      instance.forceUpdate();
	    } else if (React && React.Component) {
	      React.Component.prototype.forceUpdate.call(instance);
	    }
	  }
	}
	
	/**
	 * Updates a React component recursively, so even if children define funky
	 * `shouldComponentUpdate`, they are forced to re-render.
	 * Makes sure that any newly added methods are properly auto-bound.
	 */
	function deepForceUpdate(internalInstance, React) {
	  traverseRenderedChildren(internalInstance, bindAutoBindMethods);
	  traverseRenderedChildren(internalInstance, setPendingForceUpdate);
	  traverseRenderedChildren(internalInstance, forceUpdateIfPending, React);
	}
	
	module.exports = deepForceUpdate;


/***/ },

/***/ 22:
/***/ function(module, exports) {

	'use strict';
	
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	
	  boundMethod.__reactBoundContext = component;
	  boundMethod.__reactBoundMethod = method;
	  boundMethod.__reactBoundArguments = null;
	
	  var componentName = component.constructor.displayName,
	      _bind = boundMethod.bind;
	
	  boundMethod.bind = function (newThis) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    if (newThis !== component && newThis !== null) {
	      console.warn(
	        'bind(): React component methods may only be bound to the ' +
	        'component instance. See ' + componentName
	      );
	    } else if (!args.length) {
	      console.warn(
	        'bind(): You are binding a component method to the component. ' +
	        'React does this for you automatically in a high-performance ' +
	        'way, so you can safely remove this call. See ' + componentName
	      );
	      return boundMethod;
	    }
	
	    var reboundMethod = _bind.apply(boundMethod, arguments);
	    reboundMethod.__reactBoundContext = component;
	    reboundMethod.__reactBoundMethod = method;
	    reboundMethod.__reactBoundArguments = args;
	
	    return reboundMethod;
	  };
	
	  return boundMethod;
	}
	
	/**
	 * Performs auto-binding similar to how React does it.
	 * Skips already auto-bound methods.
	 * Based on https://github.com/facebook/react/blob/b264372e2b3ad0b0c0c0cc95a2f383e4a1325c3d/src/classic/class/ReactClass.js#L639-L705
	 */
	module.exports = function bindAutoBindMethods(internalInstance) {
	  var component = typeof internalInstance.getPublicInstance === 'function' ?
	    internalInstance.getPublicInstance() :
	    internalInstance;
	
	  if (!component) {
	    // React 0.14 stateless component has no instance
	    return;
	  }
	
	  for (var autoBindKey in component.__reactAutoBindMap) {
	    if (!component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
	      continue;
	    }
	
	    // Skip already bound methods
	    if (component.hasOwnProperty(autoBindKey) &&
	        component[autoBindKey].__reactBoundContext === component) {
	      continue;
	    }
	
	    var method = component.__reactAutoBindMap[autoBindKey];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	};

/***/ },

/***/ 23:
/***/ function(module, exports) {

	'use strict';
	
	function traverseRenderedChildren(internalInstance, callback, argument) {
	  callback(internalInstance, argument);
	
	  if (internalInstance._renderedComponent) {
	    traverseRenderedChildren(
	      internalInstance._renderedComponent,
	      callback,
	      argument
	    );
	  } else {
	    for (var key in internalInstance._renderedChildren) {
	      traverseRenderedChildren(
	        internalInstance._renderedChildren[key],
	        callback,
	        argument
	      );
	    }
	  }
	}
	
	module.exports = traverseRenderedChildren;


/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getRootInstancesFromReactMount = __webpack_require__(25);
	
	var injectedProvider = null,
	    didWarn = false;
	
	function warnOnce() {
	  if (!didWarn) {
	    console.warn(
	      'It appears that React Hot Loader isn\'t configured correctly. ' +
	      'If you\'re using NPM, make sure your dependencies don\'t drag duplicate React distributions into their node_modules and that require("react") corresponds to the React instance you render your app with.',
	      'If you\'re using a precompiled version of React, see https://github.com/gaearon/react-hot-loader/tree/master/docs#usage-with-external-react for integration instructions.'
	    );
	  }
	
	  didWarn = true;
	}
	
	var RootInstanceProvider = {
	  injection: {
	    injectProvider: function (provider) {
	      injectedProvider = provider;
	    }
	  },
	
	  getRootInstances: function (ReactMount) {
	    if (injectedProvider) {
	      return injectedProvider.getRootInstances();
	    }
	
	    var instances = ReactMount && getRootInstancesFromReactMount(ReactMount) || [];
	    if (!Object.keys(instances).length) {
	      warnOnce();
	    }
	
	    return instances;
	  }
	};
	
	module.exports = RootInstanceProvider;

/***/ },

/***/ 25:
/***/ function(module, exports) {

	'use strict';
	
	function getRootInstancesFromReactMount(ReactMount) {
	  return ReactMount._instancesByReactRootID || ReactMount._instancesByContainerID || [];
	}
	
	module.exports = getRootInstancesFromReactMount;

/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var Promise = __webpack_require__(193);
	var $ = __webpack_require__(196);
	var React = __webpack_require__(89);
	var decorators_1 = __webpack_require__(197);
	var LocalisationManager = (function () {
	    function LocalisationManager(supported, defaultlng) {
	        var userLang = (navigator.language || navigator.userLanguage).split('-')[0];
	        // console.log("language " + userLang);
	        this.ready = Promise.resolve({ message: "not loaded" });
	        this.translations = {};
	        this.supported = supported;
	        if (this.supported.indexOf(userLang) >= 0) {
	            this.currentLanguageCode = userLang;
	        }
	        else {
	            this.currentLanguageCode = defaultlng;
	        }
	        this.attached = [];
	    }
	    LocalisationManager.prototype.attach = function (callback) {
	        var _this = this;
	        this.attached.push(callback);
	        return function () {
	            var idx = _this.attached.indexOf(callback);
	            if (idx >= 0) {
	                _this.attached.splice(idx, 1);
	            }
	        };
	    };
	    LocalisationManager.prototype.broadcast = function () {
	        var _this = this;
	        this.attached.forEach(function (callback) {
	            callback(_this.currentLanguage);
	        });
	    };
	    LocalisationManager.prototype.load = function () {
	        var _this = this;
	        this.ready = new Promise(function (resolve, reject) {
	            $.ajax({
	                url: 'trads.json'
	            }).then(function (res) {
	                _this.isReady = true;
	                if (res) {
	                    _this.translations = res;
	                    if (_this.currentLanguageCode) {
	                        _this.currentLanguage = _this.translations[_this.currentLanguageCode];
	                    }
	                }
	                resolve();
	            }, reject);
	        });
	        return this.ready;
	    };
	    LocalisationManager.prototype.setLanguage = function (code) {
	        var _this = this;
	        return this.ready.then(function () {
	            if (_this.translations && _this.translations[code]) {
	                _this.currentLanguageCode = code;
	                _this.currentLanguage = _this.translations[_this.currentLanguageCode];
	                _this.broadcast();
	            }
	        });
	    };
	    LocalisationManager.prototype.translate = function (key) {
	        if (this.currentLanguage)
	            return this.currentLanguage[key] || key;
	        return key;
	    };
	    return LocalisationManager;
	}());
	exports.LocalisationManager = LocalisationManager;
	var Localized = (function (_super) {
	    __extends(Localized, _super);
	    function Localized(props) {
	        var _this = this;
	        _super.call(this, props);
	        this.state = {
	            i18n: new LocalisationManager(props.supported, props.default)
	        };
	        this.state.i18n.load();
	        this.state.i18n.attach(function () { return _this.setState({}); });
	    }
	    Localized.prototype.getChildContext = function () {
	        return {
	            i18n: this.state.i18n
	        };
	    };
	    Localized.prototype.render = function () {
	        return React.cloneElement(this.props.children);
	    };
	    Localized.childContextTypes = {
	        i18n: React.PropTypes.object
	    };
	    return Localized;
	}(React.Component));
	exports.Localized = Localized;
	var AppLabel = (function (_super) {
	    __extends(AppLabel, _super);
	    function AppLabel() {
	        _super.apply(this, arguments);
	    }
	    AppLabel.prototype.render = function () {
	        var _this = this;
	        var i18n = this.context["i18n"];
	        if (i18n.isReady) {
	            return React.createElement(this.props.component || 'span', { className: this.props.className }, i18n.translate(this.props.i18n));
	        }
	        if (i18n.ready)
	            i18n.ready.then(function () { return _this.setState({}); });
	        return React.createElement(this.props.component || 'span', { className: this.props.className });
	    };
	    AppLabel = __decorate([
	        decorators_1.injectcontext({ i18n: React.PropTypes.object.isRequired })
	    ], AppLabel);
	    return AppLabel;
	}(React.Component));
	exports.AppLabel = AppLabel;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "i18nservice.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	function injectcontext(context) {
	    return function (target // The class the decorator is declared on
	        ) {
	        target.contextTypes = context;
	    };
	}
	exports.injectcontext = injectcontext;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "decorators.ts" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isReactClassish = __webpack_require__(199),
	    isReactElementish = __webpack_require__(200);
	
	function makeExportsHot(m, React) {
	  if (isReactElementish(m.exports, React)) {
	    // React elements are never valid React classes
	    return false;
	  }
	
	  var freshExports = m.exports,
	      exportsReactClass = isReactClassish(m.exports, React),
	      foundReactClasses = false;
	
	  if (exportsReactClass) {
	    m.exports = m.makeHot(m.exports, '__MODULE_EXPORTS');
	    foundReactClasses = true;
	  }
	
	  for (var key in m.exports) {
	    if (!Object.prototype.hasOwnProperty.call(freshExports, key)) {
	      continue;
	    }
	
	    if (exportsReactClass && key === 'type') {
	      // React 0.12 also puts classes under `type` property for compat.
	      // Skip to avoid updating twice.
	      continue;
	    }
	
	    var value;
	    try {
	      value = freshExports[key];
	    } catch (err) {
	      continue;
	    }
	
	    if (!isReactClassish(value, React)) {
	      continue;
	    }
	
	    if (Object.getOwnPropertyDescriptor(m.exports, key).writable) {
	      m.exports[key] = m.makeHot(value, '__MODULE_EXPORTS_' + key);
	      foundReactClasses = true;
	    } else {
	      console.warn("Can't make class " + key + " hot reloadable due to being read-only. To fix this you can try two solutions. First, you can exclude files or directories (for example, /node_modules/) using 'exclude' option in loader configuration. Second, if you are using Babel, you can enable loose mode for `es6.modules` using the 'loose' option. See: http://babeljs.io/docs/advanced/loose/ and http://babeljs.io/docs/usage/options/");
	    }
	  }
	
	  return foundReactClasses;
	}
	
	module.exports = makeExportsHot;


/***/ },

/***/ 199:
/***/ function(module, exports) {

	function hasRender(Class) {
	  var prototype = Class.prototype;
	  if (!prototype) {
	    return false;
	  }
	
	  return typeof prototype.render === 'function';
	}
	
	function descendsFromReactComponent(Class, React) {
	  if (!React.Component) {
	    return false;
	  }
	
	  var Base = Object.getPrototypeOf(Class);
	  while (Base) {
	    if (Base === React.Component) {
	      return true;
	    }
	
	    Base = Object.getPrototypeOf(Base);
	  }
	
	  return false;
	}
	
	function isReactClassish(Class, React) {
	  if (typeof Class !== 'function') {
	    return false;
	  }
	
	  // React 0.13
	  if (hasRender(Class) || descendsFromReactComponent(Class, React)) {
	    return true;
	  }
	
	  // React 0.12 and earlier
	  if (Class.type && hasRender(Class.type)) {
	    return true;
	  }
	
	  return false;
	}
	
	module.exports = isReactClassish;

/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	var isReactClassish = __webpack_require__(199);
	
	function isReactElementish(obj, React) {
	  if (!obj) {
	    return false;
	  }
	
	  return Object.prototype.toString.call(obj.props) === '[object Object]' &&
	         isReactClassish(obj.type, React);
	}
	
	module.exports = isReactElementish;

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var react_router_1 = __webpack_require__(202);
	var app_shell_1 = __webpack_require__(265);
	var homepage_1 = __webpack_require__(290);
	var speakerspage_1 = __webpack_require__(309);
	var sessionspage_1 = __webpack_require__(310);
	var loginpage_1 = __webpack_require__(311);
	var datagridtests_1 = __webpack_require__(314);
	var userservice_1 = __webpack_require__(287);
	var AppRoutes = (function (_super) {
	    __extends(AppRoutes, _super);
	    function AppRoutes() {
	        _super.apply(this, arguments);
	    }
	    AppRoutes.prototype.shouldComponentUpdate = function () {
	        return false;
	    };
	    AppRoutes.prototype.mustBeLogged = function (nextState, replace) {
	        if (!userservice_1.isLoggedIn()) {
	            replace({
	                pathname: '/login',
	                state: { nextPathname: nextState.location.pathname }
	            });
	        }
	    };
	    AppRoutes.prototype.render = function () {
	        return React.createElement(react_router_1.Router, {history: react_router_1.hashHistory}, React.createElement(react_router_1.Route, {path: "/login", component: loginpage_1.LoginPage}), React.createElement(react_router_1.Route, {path: "/", onEnter: this.mustBeLogged.bind(this), component: app_shell_1.AppShell}, React.createElement(react_router_1.IndexRoute, {component: homepage_1.HomePage}), React.createElement(react_router_1.Route, {path: "sessions", component: sessionspage_1.SessionsPage}), React.createElement(react_router_1.Route, {path: "speakers", component: speakerspage_1.SpeakersPage}), React.createElement(react_router_1.Route, {path: "grid", component: datagridtests_1.DataGridPage})));
	    };
	    return AppRoutes;
	}(React.Component));
	exports.AppRoutes = AppRoutes;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "app.routes.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var _ = __webpack_require__(266);
	var React = __webpack_require__(89);
	var ReactCSSTransitionGroup = __webpack_require__(267);
	var containerquery_1 = __webpack_require__(274);
	var app_header_1 = __webpack_require__(275);
	var app_menu_1 = __webpack_require__(284);
	var userservice_1 = __webpack_require__(287);
	var decorators_1 = __webpack_require__(197);
	__webpack_require__(288);
	var mediaquery = {
	    XXS: {
	        minWidth: 200
	    },
	    XS: {
	        minWidth: 468
	    },
	    S: {
	        minWidth: 768,
	    },
	    M: {
	        minWidth: 1024,
	    },
	    L: {
	        minWidth: 1366,
	    },
	    XL: {
	        minWidth: 1600
	    }
	};
	var limitForFixedMenu = "L";
	var AppShell = (function (_super) {
	    __extends(AppShell, _super);
	    function AppShell() {
	        _super.apply(this, arguments);
	    }
	    AppShell.prototype.render = function () {
	        return React.createElement(containerquery_1.ContainerQuery, {className: "app-shell", stateName: "appstate", query: mediaquery}, React.createElement(AppShellContent, this.props));
	    };
	    return AppShell;
	}(React.Component));
	exports.AppShell = AppShell;
	var AppShellContent = (function (_super) {
	    __extends(AppShellContent, _super);
	    function AppShellContent(props) {
	        _super.call(this, props);
	        var isLarge = (this.props.visualstate.indexOf(limitForFixedMenu) >= 0);
	        this.state = {
	            menu: {
	                allowFixed: isLarge,
	                collapsed: !isLarge,
	                collapsedWhenLarge: false
	            },
	            user: userservice_1.currentUser
	        };
	    }
	    AppShellContent.prototype.getChildContext = function () {
	        var res = {
	            appState: this.state
	        };
	    };
	    AppShellContent.prototype.componentDidMount = function () {
	        var _this = this;
	        var i18n = this.context["i18n"];
	        i18n.attach(function () {
	            _this.setState({});
	        });
	    };
	    AppShellContent.prototype.componentWillReceiveProps = function (nextprops) {
	        var wasLarge = (this.props.visualstate.indexOf(limitForFixedMenu) >= 0);
	        var isLarge = (nextprops.visualstate.indexOf(limitForFixedMenu) >= 0);
	        this.setState({
	            menu: _.assign(this.state.menu, { allowFixed: isLarge })
	        });
	        if (wasLarge && !isLarge) {
	            this.setState({
	                menu: _.assign(this.state.menu, { collapsed: true, collapsedWhenLarge: this.state.menu.collapsed })
	            });
	        }
	        else if (!wasLarge && isLarge) {
	            this.setState({
	                menu: _.assign(this.state.menu, { collapsed: this.state.menu.collapsedWhenLarge })
	            });
	        }
	    };
	    AppShellContent.prototype.showMenu = function (show) {
	        if (!this.state.menu.allowFixed) {
	            this.setState({
	                menu: _.assign(this.state.menu, { collapsed: !show })
	            });
	        }
	    };
	    AppShellContent.prototype.toggleMenu = function () {
	        console.log("toggle menu " + this.state.menu.collapsed);
	        this.setState({
	            menu: _.assign(this.state.menu, { collapsed: !this.state.menu.collapsed })
	        });
	    };
	    AppShellContent.prototype.render = function () {
	        var _this = this;
	        var childs = React.cloneElement(this.props.children, {
	            key: this.props.location.pathname,
	            visualstate: this.props.visualstate
	        });
	        var applayoutClasses = ["app-layout"];
	        if (!this.state.menu.allowFixed) {
	            applayoutClasses.push("menu-collapsible");
	        }
	        if (this.state.menu.collapsed) {
	            applayoutClasses.push("menu-collapsed");
	        }
	        return React.createElement("div", {className: applayoutClasses.join(" ")}, React.createElement("div", {className: "app-content"}, React.createElement(app_header_1.AppHeader, {user: userservice_1.currentUser}), React.createElement(ReactCSSTransitionGroup, {component: "section", className: "app-pages", transitionName: "pagestransition", transitionEnterTimeout: 600, transitionLeaveTimeout: 300}, childs)), React.createElement(app_menu_1.AppMenu, {visualstate: this.props.visualstate, user: userservice_1.currentUser, menustate: this.state.menu, onShow: function (show) { return _this.showMenu(show); }}), React.createElement(app_menu_1.BurgerMenu, {menustate: this.state.menu, onClick: this.toggleMenu.bind(this)}));
	    };
	    AppShellContent.contextTypes = {
	        appState: React.PropTypes.object
	    };
	    AppShellContent = __decorate([
	        decorators_1.injectcontext({ i18n: React.PropTypes.object.isRequired })
	    ], AppShellContent);
	    return AppShellContent;
	}(React.Component));
	exports.AppShellContent = AppShellContent;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "app.shell.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var ReactDOM = __webpack_require__(105);
	var ContainerQuery = (function (_super) {
	    __extends(ContainerQuery, _super);
	    function ContainerQuery(props) {
	        _super.call(this, props);
	        var activeStates = this.getActiveStates(document.body.clientWidth, document.body.clientHeight);
	        this.state = {
	            previousStates: activeStates.join(" "),
	            activeStates: activeStates
	        };
	        this.handleResizeBinded = this.handleResize.bind(this);
	    }
	    ContainerQuery.prototype.isValidQueryArg = function (qarg, w, h) {
	        var matches = true;
	        if (qarg.minWidth && w < qarg.minWidth) {
	            matches = false;
	        }
	        if (qarg.maxWidth && w > qarg.maxWidth) {
	            matches = false;
	        }
	        if (qarg.minHeight && h < qarg.minHeight) {
	            matches = false;
	        }
	        if (qarg.maxHeight && h > qarg.maxHeight) {
	            matches = false;
	        }
	        return matches;
	    };
	    ContainerQuery.prototype.evaluate = function () {
	        if (this.props.query) {
	            var node = ReactDOM.findDOMNode(this);
	            if (node) {
	                var w = node.clientWidth;
	                var h = node.clientHeight;
	                //console.log(w + "/" + h);
	                var currentstates = this.getActiveStates(w, h);
	                var token = currentstates.join(" ");
	                if (token != this.state.previousStates) {
	                    console.log("changing container query state to " + token);
	                    if (this.props.stateChanged) {
	                        this.props.stateChanged(currentstates);
	                    }
	                    if (!this.props.doNotApplyClasses) {
	                        this.setState({
	                            previousStates: token,
	                            activeStates: currentstates
	                        });
	                    }
	                }
	            }
	        }
	    };
	    ContainerQuery.prototype.getActiveStates = function (w, h) {
	        var currentstates = [];
	        for (var n in this.props.query) {
	            var queryArgument = this.props.query[n];
	            if (this.isValidQueryArg(queryArgument, w, h)) {
	                currentstates.push(n);
	            }
	        }
	        return currentstates;
	    };
	    ContainerQuery.prototype.getChildContext = function () {
	        var res = {
	            containerQueryState: {
	                activeStates: this.state.activeStates,
	                name: this.props.className,
	                parentVisualState: this.context["containerQueryState"]
	            }
	        };
	    };
	    ContainerQuery.prototype.handleResize = function () {
	        var _this = this;
	        if (this.lastrequest)
	            cancelAnimationFrame(this.lastrequest);
	        this.lastrequest = requestAnimationFrame(function () {
	            _this.lastrequest = null;
	            _this.evaluate();
	        });
	    };
	    ContainerQuery.prototype.componentWillMount = function () {
	        // window.addEventListener("resize", this.handleResizeBinded); 
	        // this.handleResizeBinded();           
	    };
	    ContainerQuery.prototype.componentDidMount = function () {
	        window.addEventListener("resize", this.handleResizeBinded);
	        this.evaluate();
	    };
	    ContainerQuery.prototype.componentWillUnmount = function () {
	        window.removeEventListener("resize", this.handleResizeBinded);
	    };
	    ContainerQuery.prototype.getClassName = function () {
	        var _this = this;
	        if (this.props.doNotApplyClasses) {
	            return "";
	        }
	        return this.props.className + " " + this.state.activeStates.map(function (s) { return _this.props.stateName + "-" + s; }).join(" ");
	    };
	    ContainerQuery.prototype.render = function () {
	        var child = React.cloneElement(this.props.children, {
	            visualstate: this.state.activeStates
	        });
	        return React.createElement(this.props.tagName || "div", { className: this.getClassName() }, child);
	    };
	    ContainerQuery.contextTypes = {
	        containerQueryState: React.PropTypes.object
	    };
	    return ContainerQuery;
	}(React.Component));
	exports.ContainerQuery = ContainerQuery;
	ContainerQuery.childContextTypes = {
	    containerQueryState: React.PropTypes.object
	};
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "containerquery.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var React = __webpack_require__(89);
	var popover_1 = __webpack_require__(276);
	var decorators_1 = __webpack_require__(197);
	__webpack_require__(282);
	var AppHeader = (function (_super) {
	    __extends(AppHeader, _super);
	    function AppHeader(props) {
	        _super.call(this, props);
	        this.state = {
	            showUserPanel: false,
	            showUserParent: null,
	        };
	    }
	    AppHeader.prototype.showUserPanel = function (arg) {
	        this.setState({
	            showUserPanel: true,
	            showUserParent: arg.currentTarget
	        });
	    };
	    AppHeader.prototype.hideUserPanel = function () {
	        this.setState({
	            showUserPanel: false,
	            showUserParent: null
	        });
	    };
	    AppHeader.prototype.render = function () {
	        var i18n = this.context["i18n"];
	        return React.createElement("header", {className: "app-header"}, React.createElement(AppSearchBox, null), React.createElement("div", {className: "right"}, React.createElement(AppUserEvent, {user: this.props.user, onClick: this.showUserPanel.bind(this)}), React.createElement("div", {className: "spacer"}), React.createElement(AppUserProfile, {user: this.props.user, onClick: this.showUserPanel.bind(this)})), React.createElement(popover_1.Popover, {className: "userpanel-popover", show: this.state.showUserPanel, parent: this.state.showUserParent, onhide: this.hideUserPanel.bind(this)}, React.createElement(AppUserPanel, {user: this.props.user, i18n: i18n, onhide: this.hideUserPanel.bind(this)})));
	    };
	    AppHeader = __decorate([
	        decorators_1.injectcontext({ i18n: React.PropTypes.object.isRequired })
	    ], AppHeader);
	    return AppHeader;
	}(React.Component));
	exports.AppHeader = AppHeader;
	var AppSearchBox = (function (_super) {
	    __extends(AppSearchBox, _super);
	    function AppSearchBox() {
	        _super.apply(this, arguments);
	    }
	    AppSearchBox.prototype.render = function () {
	        return React.createElement("div", {className: "left"}, React.createElement("i", {className: "icon dripicons-search"}), React.createElement("div", {className: "spacer"}), React.createElement("input", {type: "search", id: "txtsearch", placeholder: "search..."}));
	    };
	    return AppSearchBox;
	}(React.Component));
	exports.AppSearchBox = AppSearchBox;
	var AppUserEvent = (function (_super) {
	    __extends(AppUserEvent, _super);
	    function AppUserEvent() {
	        _super.apply(this, arguments);
	    }
	    AppUserEvent.prototype.render = function () {
	        var user = this.props.user;
	        if (!user || !user.event) {
	            return React.createElement("div", {className: "user-event"});
	        }
	        return React.createElement("div", {className: "headeritem user-event clickable", onClick: this.props.onClick}, React.createElement("img", {className: "icon", src: "assets/local.png", style: { maxHeight: 26 }}), " ", React.createElement("span", {className: "eventname label"}, user.event.name), " ", React.createElement("i", {className: "chevron dripicons-chevron-down"}));
	    };
	    return AppUserEvent;
	}(React.Component));
	exports.AppUserEvent = AppUserEvent;
	var AppUserProfile = (function (_super) {
	    __extends(AppUserProfile, _super);
	    function AppUserProfile() {
	        _super.apply(this, arguments);
	    }
	    AppUserProfile.prototype.render = function () {
	        var user = this.props.user;
	        if (!user) {
	            return React.createElement("div", {className: "user-profile"});
	        }
	        return React.createElement("div", {className: "headeritem user-profile clickable", onClick: this.props.onClick}, React.createElement("i", {className: "dripicons-user icon"}), " ", React.createElement("span", {className: "username label"}, user.fullname), " ", React.createElement("i", {className: "chevron dripicons-chevron-down"}));
	    };
	    return AppUserProfile;
	}(React.Component));
	exports.AppUserProfile = AppUserProfile;
	var AppUserPanel = (function (_super) {
	    __extends(AppUserPanel, _super);
	    function AppUserPanel() {
	        _super.apply(this, arguments);
	    }
	    AppUserPanel.prototype.setLanguage = function (arg, lng) {
	        this.props.i18n.setLanguage(lng);
	        this.props.onhide();
	    };
	    AppUserPanel.prototype.render = function () {
	        var _this = this;
	        var user = this.props.user;
	        var i18n = this.props.i18n;
	        var languages = i18n.supported.map(function (lng) {
	            return React.createElement("div", {key: lng, className: "lng clickable " + (lng == i18n.currentLanguageCode ? " selected" : ""), onClick: function (arg) { return _this.setLanguage(arg, lng); }}, lng);
	        });
	        return React.createElement("div", {className: "userpanel"}, React.createElement("div", {className: "icon"}, React.createElement("i", {className: "dripicons-user"})), React.createElement("h4", null, this.props.user.fullname), React.createElement("div", {className: "languages"}, languages));
	    };
	    return AppUserPanel;
	}(React.Component));
	exports.AppUserPanel = AppUserPanel;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "app.header.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _ = __webpack_require__(266);
	var React = __webpack_require__(89);
	var ReactDOM = __webpack_require__(105);
	var ReactCSSTransitionGroup = __webpack_require__(267);
	var popover_positioning_1 = __webpack_require__(277);
	__webpack_require__(278);
	var Popover = (function (_super) {
	    __extends(Popover, _super);
	    function Popover(props) {
	        _super.call(this, props);
	        this.state = {
	            dismiss: false
	        };
	    }
	    Popover.prototype.hide = function (arg) {
	        this.setState({ dismiss: true });
	        if (this.props.onhide) {
	            this.props.onhide();
	        }
	    };
	    Popover.prototype.renderWrapper = function () {
	        if (!this.wrapperNode) {
	            //TODO check si parent...
	            this.wrapperNode = document.createElement("DIV");
	            this.wrapperNode.className = "popover-wrapper";
	            document.body.appendChild(this.wrapperNode);
	        }
	        var content;
	        if (!this.state.dismiss) {
	            content = React.createElement(PopoverWrapper, {parent: this.props.parent, children: this.props.children, hidePopover: this.hide.bind(this), useOverlay: this.props.useOverlay, placement: this.props.placement, targetPlacement: this.props.placement, offset: this.props.offset, borderOffset: this.props.borderOffset, inject: this.props.inject});
	        }
	        ReactDOM.render(React.createElement(ReactCSSTransitionGroup, {component: "div", className: "popover-shell " + (this.props.useOverlay !== false ? 'with-overlay ' : '') + (this.props.className || ''), transitionName: this.props.transitionName || "popovertransition", transitionAppear: true, transitionAppearTimeout: this.props.transitionAppearTimeout || 400, transitionEnterTimeout: this.props.transitionEnterTimeout || 400, transitionLeaveTimeout: this.props.transitionLeaveTimeout || 300}, content), this.wrapperNode);
	    };
	    Popover.prototype.destroyWrapper = function () {
	        if (this.wrapperNode) {
	            ReactDOM.unmountComponentAtNode(this.wrapperNode);
	            this.wrapperNode.parentElement.removeChild(this.wrapperNode);
	            this.wrapperNode = null;
	        }
	    };
	    Popover.prototype.componentDidMount = function () {
	        if (this.props.show) {
	            this.renderWrapper();
	        }
	        else {
	            this.destroyWrapper();
	        }
	    };
	    Popover.prototype.componentWillUnmount = function () {
	        this.destroyWrapper();
	    };
	    Popover.prototype.componentWillReceiveProps = function (nextprops) {
	        if (nextprops.show) {
	            this.setState({ dismiss: false });
	        }
	        else if (this.wrapperNode) {
	            this.setState({ dismiss: true });
	        }
	    };
	    Popover.prototype.componentDidUpdate = function () {
	        if (this.props.addClassNameToBody) {
	            if (this.props.show) {
	                document.body.classList.add(this.props.addClassNameToBody);
	            }
	            else {
	                document.body.classList.remove(this.props.addClassNameToBody);
	            }
	        }
	        if (this.props.show || this.wrapperNode) {
	            this.renderWrapper();
	        }
	        else {
	            this.destroyWrapper();
	        }
	        if (this.state.dismiss) {
	            var wrapper = this.wrapperNode;
	            this.wrapperNode = null;
	            setTimeout(function () {
	                ReactDOM.unmountComponentAtNode(wrapper);
	                wrapper.parentElement.removeChild(wrapper);
	            }, 500);
	        }
	    };
	    Popover.prototype.render = function () {
	        return React.createElement("div", {className: "popover-placeholder", style: { display: "none" }});
	    };
	    return Popover;
	}(React.Component));
	exports.Popover = Popover;
	var PopoverWrapper = (function (_super) {
	    __extends(PopoverWrapper, _super);
	    function PopoverWrapper(props) {
	        _super.call(this, props);
	        this.state = {
	            elementstyle: null,
	            visible: false
	        };
	    }
	    PopoverWrapper.prototype.componentDidMount = function () {
	        var _this = this;
	        this.refresh();
	        this.onresize = function () {
	            requestAnimationFrame(function () {
	                _this.refresh();
	            });
	        };
	        window.addEventListener("resize", this.onresize);
	    };
	    PopoverWrapper.prototype.refresh = function () {
	        var node = ReactDOM.findDOMNode(this);
	        var popover = node.querySelector(".popover-content");
	        var target = this.props.parent;
	        if (typeof target == "string")
	            target = document.querySelector(target);
	        if (target) {
	            this.setState({
	                elementstyle: popover_positioning_1.position(popover, target, {
	                    placement: this.props.placement ? this.props.placement.split(' ') : ['top', 'center'],
	                    targetPlacement: this.props.targetPlacement ? this.props.targetPlacement.split(' ') : ['bottom', 'center'],
	                    offset: this.props.offset != undefined ? this.props.offset : 10,
	                    borderOffset: this.props.borderOffset != undefined ? this.props.borderOffset : 10
	                })
	            });
	        }
	    };
	    PopoverWrapper.prototype.componentWillUnmount = function () {
	        window.removeEventListener("resize", this.onresize);
	        if (this.tether) {
	            this.tether.destroy();
	            this.tether.remove();
	        }
	    };
	    PopoverWrapper.prototype.overlayDismiss = function (arg) {
	        if (arg.target.classList.contains("popover-overlay")) {
	            var content = this.refs['popovercontent'];
	            if (!content || !content.canClose || content.canClose()) {
	                this.props.hidePopover(arg);
	            }
	        }
	    };
	    PopoverWrapper.prototype.containerDismiss = function (arg) {
	        if (arg.target.classList.contains("popover-container")) {
	            var content = this.refs['popovercontent'];
	            if (!content || !content.canClose || content.canClose()) {
	                this.props.hidePopover(arg);
	            }
	        }
	    };
	    PopoverWrapper.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {className: "popover-wrapper-content"}, React.createElement("div", {className: "popover-overlay", onMouseDown: this.overlayDismiss.bind(this), onTouchStart: function (arg) { return _this.overlayDismiss.bind(_this); }}), React.createElement("div", {className: "popover-container", onMouseDown: this.containerDismiss.bind(this), onTouchStart: this.containerDismiss.bind(this)}, React.createElement("div", {className: "popover-content", style: this.state.elementstyle}, React.createElement("div", {className: "popover-modal"}, React.createElement(this.props.children.type, _.assign({}, this.props.children.props, { ref: 'popovercontent' }))))));
	    };
	    return PopoverWrapper;
	}(React.Component));
	exports.PopoverWrapper = PopoverWrapper;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "popover.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	function cloneRect(targetrect) {
	    return {
	        left: targetrect.left,
	        right: targetrect.right,
	        top: targetrect.top,
	        bottom: targetrect.bottom,
	        width: targetrect.width,
	        height: targetrect.height
	    };
	}
	function position(element, target, ctx) {
	    element.style.width = '';
	    element.style.height = '';
	    var targetrect = target.getBoundingClientRect();
	    var elementrect = element.getBoundingClientRect();
	    var targetpos = cloneRect(targetrect);
	    var elementpos = cloneRect(elementrect);
	    var viewportWidth = document.body.clientWidth, viewportHeight = document.body.clientHeight;
	    if (elementpos.width + 2 * ctx.borderOffset > viewportWidth) {
	        elementpos.width = viewportWidth - 2 * ctx.borderOffset;
	    }
	    if (elementpos.height + 2 * ctx.borderOffset > viewportHeight) {
	        elementpos.height = viewportHeight - 2 * ctx.borderOffset;
	    }
	    var style = getposition(elementpos, targetpos, ctx);
	    if (style.left < ctx.borderOffset) {
	        style.left = ctx.borderOffset;
	    }
	    if (style.left + elementpos.width + 2 * ctx.borderOffset > viewportWidth) {
	        style.left = viewportWidth - elementpos.width - ctx.borderOffset;
	    }
	    if (style.top < ctx.borderOffset) {
	        style.top = ctx.borderOffset;
	    }
	    if (style.top + elementpos.height + 2 * ctx.borderOffset > viewportHeight) {
	        style.top = viewportHeight - elementpos.height - ctx.borderOffset;
	    }
	    return style;
	}
	exports.position = position;
	function swapVertical(token) {
	    if (token == 'top')
	        return 'bottom';
	    if (token == 'bottom')
	        return 'top';
	    return token;
	}
	function swapHorizontal(token) {
	    if (token == 'left')
	        return 'right';
	    if (token == 'right')
	        return 'left';
	    return token;
	}
	function getposition(elementpos, targetpos, ctx) {
	    var refpoint = getRefPoint(targetpos, ctx.targetPlacement);
	    var pos = {
	        left: refpoint.left + ctx.offset,
	        top: refpoint.top + ctx.offset,
	        width: elementpos.width,
	        height: elementpos.height
	    };
	    var placement = ctx.placement;
	    if (placement[0] == 'bottom') {
	        pos.top = refpoint.top - elementpos.height - ctx.offset;
	    }
	    else if (placement[0] == 'center') {
	        pos.top = refpoint.top - (elementpos.height / 2);
	    }
	    if (placement[1] == 'right') {
	        pos.left = refpoint.left - elementpos.width - ctx.offset;
	    }
	    else if (placement[1] == 'center') {
	        pos.left = refpoint.left - (elementpos.width / 2);
	    }
	    return pos;
	}
	exports.getposition = getposition;
	function getRefPoint(target, placement) {
	    var refpoint = { left: target.left, top: target.top };
	    if (placement[0] == "center") {
	        refpoint.top = target.top + (target.height / 2);
	    }
	    else if (placement[0] == "bottom") {
	        refpoint.top = target.top + target.height;
	    }
	    if (placement[1] == "center") {
	        refpoint.left = target.left + (target.width / 2);
	    }
	    else if (placement[1] == "right") {
	        refpoint.left = target.left + target.width;
	    }
	    return refpoint;
	}
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "popover.positioning.ts" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 278:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 282:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var ReactCSSTransitionGroup = __webpack_require__(267);
	var react_router_1 = __webpack_require__(202);
	var i18nservice_1 = __webpack_require__(192);
	__webpack_require__(285);
	var BurgerMenu = (function (_super) {
	    __extends(BurgerMenu, _super);
	    function BurgerMenu() {
	        _super.apply(this, arguments);
	    }
	    BurgerMenu.prototype.menuClicked = function (arg) {
	        this.props.onClick(arg);
	    };
	    BurgerMenu.prototype.render = function () {
	        if (!this.props.menustate.collapsed && !this.props.menustate.allowFixed) {
	            document.body.classList.add("burger-on");
	        }
	        else {
	            document.body.classList.remove("burger-on");
	        }
	        return React.createElement("div", {className: 'burger-menu' + (!this.props.menustate.collapsed && !this.props.menustate.allowFixed ? ' expanded' : ''), onClick: this.menuClicked.bind(this)}, React.createElement("div", {className: "burger"}, React.createElement("div", {className: "split1"}), React.createElement("div", {className: "split2"}), React.createElement("div", {className: "split3"})));
	    };
	    return BurgerMenu;
	}(React.Component));
	exports.BurgerMenu = BurgerMenu;
	var AppMenu = (function (_super) {
	    __extends(AppMenu, _super);
	    function AppMenu() {
	        _super.apply(this, arguments);
	    }
	    AppMenu.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {className: "app-menu"}, React.createElement("div", {className: "app-menu-content"}, React.createElement("div", {className: "menu-overlay", onClick: function () { return _this.props.onShow(false); }}), React.createElement("div", {className: "menu-bar"}, React.createElement("div", {className: "applogo"}, React.createElement(react_router_1.Link, {to: "/"}, React.createElement("img", {src: "assets/logo-lg.png"}))), React.createElement("div", {className: "menu-bar-content"}, React.createElement(AppMenuItems, {items: menuitems, user: this.props.user, onShow: this.props.onShow})))));
	    };
	    return AppMenu;
	}(React.Component));
	exports.AppMenu = AppMenu;
	var menuitems = [
	    {
	        path: '/',
	        label: 'menu.home',
	        icon: 'assets/dashboard.png'
	    },
	    {
	        label: 'menu.attendees',
	        icon: 'assets/user.png',
	        items: [
	            {
	                label: 'menu.attendees.manage',
	                path: '/grid',
	            },
	            {
	                label: 'menu.attendees.statistics',
	                path: '/sessions',
	            },
	            {
	                label: 'menu.attendees.mailing',
	                path: '/speakers',
	            }
	        ]
	    },
	    {
	        label: 'menu.sessions',
	        icon: 'assets/menu-sessions.png',
	        items: [
	            {
	                label: 'menu.sessions.managesessions',
	                path: '/sessions',
	            },
	            {
	                label: 'menu.sessions.managespeakers',
	                path: '/speakers',
	            },
	            {
	                label: 'menu.sessions.manageexhibitings',
	                path: '/sessions',
	            }
	        ]
	    },
	    {
	        label: 'menu.settings',
	        icon: 'assets/settings.png',
	        items: [
	            {
	                label: 'menu.settings.permissions',
	                path: '/speakers',
	            }
	        ]
	    }
	];
	var AppMenuItems = (function (_super) {
	    __extends(AppMenuItems, _super);
	    function AppMenuItems() {
	        _super.apply(this, arguments);
	    }
	    AppMenuItems.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {className: "menu-items"}, this.props.items.map(function (m, idx) {
	            return React.createElement(AppMenuItem, {key: idx + '|' + m.path, item: m, onShow: _this.props.onShow});
	        }));
	    };
	    return AppMenuItems;
	}(React.Component));
	exports.AppMenuItems = AppMenuItems;
	var AppMenuItem = (function (_super) {
	    __extends(AppMenuItem, _super);
	    function AppMenuItem(props) {
	        _super.call(this, props);
	        this.state = {
	            expanded: false
	        };
	    }
	    AppMenuItem.prototype.toggleState = function () {
	        this.setState({ expanded: !this.state.expanded });
	    };
	    AppMenuItem.prototype.hideMenu = function () {
	        this.props.onShow(false);
	    };
	    AppMenuItem.prototype.render = function () {
	        var _this = this;
	        var item = this.props.item;
	        var icon;
	        if (item.icon) {
	            icon = React.createElement("img", {src: item.icon, className: "icon"});
	        }
	        else {
	            icon = React.createElement("i", {className: "dripicons-chevron-right"});
	        }
	        if (item.items) {
	            var items;
	            if (this.state.expanded) {
	                items = item.items.map(function (m, idx) {
	                    return React.createElement(AppMenuItem, {key: idx + '|' + m.path, item: m, onShow: _this.props.onShow});
	                });
	            }
	            return React.createElement("div", {className: "menu-item-wrapper"}, React.createElement("div", {className: "menu-item clickable" + (this.state.expanded ? " expanded" : ""), onClick: function () { return _this.toggleState(); }}, icon, React.createElement(i18nservice_1.AppLabel, {className: "label", i18n: item.label}), React.createElement("i", {className: "chevron dripicons-chevron-right"})), React.createElement(ReactCSSTransitionGroup, {component: "div", className: "menu-item-items", transitionName: "fadetransition", transitionEnterTimeout: 200, transitionLeave: false}, items));
	        }
	        else {
	            return React.createElement("div", {className: "menu-item clickable"}, icon, React.createElement(react_router_1.Link, {to: item.path, onClick: this.hideMenu.bind(this)}, React.createElement(i18nservice_1.AppLabel, {className: "label", i18n: item.label})));
	        }
	    };
	    return AppMenuItem;
	}(React.Component));
	exports.AppMenuItem = AppMenuItem;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "app.menu.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 285:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var Promise = __webpack_require__(193);
	exports.currentUser = null;
	function isLoggedIn() {
	    return exports.currentUser != null;
	}
	exports.isLoggedIn = isLoggedIn;
	function signin(login, password) {
	    return Promise.try(function () {
	        exports.currentUser = {
	            login: login,
	            fullname: "John Doe",
	            permissions: [],
	            event: {
	                name: 'my event',
	                id: 'abcd'
	            }
	        };
	        return { authenticated: true, message: null };
	    });
	}
	exports.signin = signin;
	function signout(login, password) {
	    return Promise.try(function () {
	        exports.currentUser = null;
	    });
	}
	exports.signout = signout;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "userservice.ts" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 288:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 290:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var page_1 = __webpack_require__(291);
	var card_1 = __webpack_require__(294);
	var modal_1 = __webpack_require__(297);
	var i18nservice_1 = __webpack_require__(192);
	var entityedit_1 = __webpack_require__(300);
	var react_router_1 = __webpack_require__(202);
	var HomePage = (function (_super) {
	    __extends(HomePage, _super);
	    function HomePage(props) {
	        _super.call(this, props);
	        this.state = {
	            showModal: false,
	            showSideModal: false
	        };
	    }
	    HomePage.prototype.hideModal = function () {
	        this.setState({ showModal: false });
	    };
	    HomePage.prototype.hideSideModal = function () {
	        this.setState({ showSideModal: false });
	    };
	    HomePage.prototype.render = function () {
	        var _this = this;
	        return React.createElement(page_1.AppPage, {className: "homepage", withHeader: true, defaultPadding: true}, React.createElement("header", null, React.createElement(i18nservice_1.AppLabel, {component: "h1", i18n: "homepage.title"})), React.createElement("section", null, React.createElement("div", {className: "card-grid"}, React.createElement(card_1.Card, null, React.createElement("button", {onClick: function () { return _this.setState({ showModal: true }); }}, "modal"), React.createElement("button", {onClick: function () { return _this.setState({ showSideModal: true }); }}, "side modal"), React.createElement(react_router_1.Link, {to: "/grid", role: "button"}, "Test grille")), React.createElement(card_1.Card, null), React.createElement(card_1.Card, {dark: true}))), React.createElement(modal_1.Modal, {show: this.state.showModal, onhide: this.hideModal.bind(this)}, React.createElement(card_1.Card, {defaultPadding: true}, "Hello world, bla bla, bla,", React.createElement("br", null), "Hello world, bla bla, bla,", React.createElement("br", null), "Hello world, bla bla, bla,", React.createElement("br", null), "Hello world, bla bla, bla,", React.createElement("br", null), "Hello world, bla bla, bla,", React.createElement("br", null))), React.createElement(modal_1.SideModal, {show: this.state.showSideModal, onhide: this.hideSideModal.bind(this)}, React.createElement(entityedit_1.EntityEditPage, null)));
	    };
	    return HomePage;
	}(React.Component));
	exports.HomePage = HomePage;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "homepage.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 291:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	__webpack_require__(292);
	var AppPage = (function (_super) {
	    __extends(AppPage, _super);
	    function AppPage() {
	        _super.apply(this, arguments);
	    }
	    AppPage.prototype.render = function () {
	        var classes = ['app-page', this.props.className || ''];
	        if (!(this.props.defaultPadding == false))
	            classes.push("defaultPadding");
	        if (!(this.props.withHeader == false))
	            classes.push("withHeader");
	        if (!(this.props.scrollable == false))
	            classes.push("scrollable");
	        return React.createElement("div", {className: classes.join(" ")}, this.props.children);
	    };
	    return AppPage;
	}(React.Component));
	exports.AppPage = AppPage;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "page.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 292:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	__webpack_require__(295);
	var Card = (function (_super) {
	    __extends(Card, _super);
	    function Card() {
	        _super.apply(this, arguments);
	    }
	    Card.prototype.render = function () {
	        var classes = ['card', this.props.className || ''];
	        if (!(this.props.defaultPadding == false))
	            classes.push("defaultPadding");
	        if (this.props.dark)
	            classes.push("dark");
	        return React.createElement("div", {className: classes.join(" ")}, this.props.children);
	    };
	    return Card;
	}(React.Component));
	exports.Card = Card;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "card.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 295:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var popover_1 = __webpack_require__(276);
	__webpack_require__(298);
	var Modal = (function (_super) {
	    __extends(Modal, _super);
	    function Modal() {
	        _super.apply(this, arguments);
	    }
	    Modal.prototype.render = function () {
	        return React.createElement(popover_1.Popover, {show: this.props.show, onhide: this.props.onhide, className: "popover-as-modal " + (this.props.className || ''), addClassNameToBody: this.props.addClassNameToBody || "modalpopover-on", parent: null, useOverlay: true, transitionName: this.props.transitionName || 'modalpopovertransition', transitionAppearTimeout: this.props.transitionAppearTimeout, transitionEnterTimeout: this.props.transitionEnterTimeout, transitionLeaveTimeout: this.props.transitionLeaveTimeout}, this.props.children);
	    };
	    return Modal;
	}(React.Component));
	exports.Modal = Modal;
	var SideModal = (function (_super) {
	    __extends(SideModal, _super);
	    function SideModal() {
	        _super.apply(this, arguments);
	    }
	    SideModal.prototype.render = function () {
	        return React.createElement(popover_1.Popover, {show: this.props.show, onhide: this.props.onhide, className: "popover-as-sidemodal " + (this.props.className || ''), addClassNameToBody: this.props.addClassNameToBody || "sidemodalpopover-on", parent: null, useOverlay: true, transitionName: this.props.transitionName || 'sidemodalpopovertransition', transitionAppearTimeout: this.props.transitionAppearTimeout, transitionEnterTimeout: this.props.transitionEnterTimeout, transitionLeaveTimeout: this.props.transitionLeaveTimeout}, this.props.children);
	    };
	    return SideModal;
	}(React.Component));
	exports.SideModal = SideModal;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "modal.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 298:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var page_1 = __webpack_require__(291);
	var entityform_1 = __webpack_require__(301);
	var EntityEditPage = (function (_super) {
	    __extends(EntityEditPage, _super);
	    function EntityEditPage() {
	        _super.apply(this, arguments);
	    }
	    EntityEditPage.prototype.canClose = function () {
	        return confirm("save changes ?");
	    };
	    EntityEditPage.prototype.render = function () {
	        return React.createElement(page_1.AppPage, {className: "homepage", defaultPadding: true}, React.createElement("header", null, React.createElement("h2", null, "test")), React.createElement("section", null, React.createElement(entityform_1.EntityForm, {ref: "dataform", schema: sessionSchema, currentLanguage: "fr", entity: {}})));
	    };
	    return EntityEditPage;
	}(React.Component));
	exports.EntityEditPage = EntityEditPage;
	var sessionSchema = {
	    "languages": [
	        "fr"
	    ],
	    "fields": [
	        {
	            "key": "category",
	            "isMandatory": true,
	            "isLocalizable": false,
	            "type": "selectlist",
	            "labels": {
	                "fr": "Category"
	            },
	            "values": {
	                "session": {
	                    "fr": "Session"
	                },
	                "talk": {
	                    "fr": "Talk"
	                },
	                "askthespeaker": {
	                    "fr": "Ask the speaker"
	                },
	                "recordstudio": {
	                    "fr": "Record Studio"
	                }
	            },
	            "value": null
	        },
	        {
	            "key": "track",
	            "isMandatory": true,
	            "isLocalizable": false,
	            "type": "selectlist",
	            "labels": {
	                "fr": "Track"
	            },
	            "values": {
	                "j1empower": {
	                    "fr": "J1 - Empower your employees"
	                },
	                "j1engage": {
	                    "fr": "J1 - Engage your customers"
	                },
	                "j1isv": {
	                    "fr": "J1 - ISV"
	                },
	                "j1optimize": {
	                    "fr": "J1 - Optimize your operations"
	                },
	                "j1pme": {
	                    "fr": "J1 - PME"
	                },
	                "j1startups": {
	                    "fr": "J1 - Startups"
	                },
	                "j1transform": {
	                    "fr": "J1 - Transform your business"
	                },
	                "j2cloud": {
	                    "fr": "J2 - Cloud"
	                },
	                "j2dataiot": {
	                    "fr": "J2 - Data / IoT"
	                },
	                "j2innovation": {
	                    "fr": "J2 - Innovation"
	                },
	                "j2managementcollaboration": {
	                    "fr": "J2 - Management & Collaboration"
	                },
	                "j2mobilite": {
	                    "fr": "J2 - Transform your business"
	                },
	                "j2mobilit�": {
	                    "fr": "J2 - Mobilit�"
	                },
	                "j2securite": {
	                    "fr": "J2 - S�curit�"
	                }
	            },
	            "value": null
	        },
	        {
	            "key": "level",
	            "isMandatory": false,
	            "isLocalizable": false,
	            "type": "selectlist",
	            "labels": {
	                "fr": "Level"
	            },
	            "values": {
	                "l100": {
	                    "fr": "100"
	                },
	                "l200": {
	                    "fr": "200"
	                },
	                "l300": {
	                    "fr": "300"
	                }
	            },
	            "value": null
	        },
	        {
	            "key": "tags",
	            "isMandatory": false,
	            "isLocalizable": false,
	            "type": "multiselectlist",
	            "labels": {
	                "fr": "Tags"
	            },
	            "values": {
	                "tag1": {
	                    "fr": "tag1"
	                },
	                "tag2": {
	                    "fr": "tag2"
	                },
	                "tag3": {
	                    "fr": "tag3"
	                }
	            },
	            "value": null
	        },
	        {
	            "key": "ispublished",
	            "type": "bool",
	            "isMandatory": false,
	            "isLocalizable": false,
	            "labels": {
	                "fr": "Is published"
	            },
	            "values": null,
	            "value": null
	        }
	    ]
	};
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "entityedit.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var fieldbloc_1 = __webpack_require__(302);
	__webpack_require__(307);
	var EntityFormProps = (function () {
	    function EntityFormProps() {
	    }
	    return EntityFormProps;
	}());
	exports.EntityFormProps = EntityFormProps;
	var EntityForm = (function (_super) {
	    __extends(EntityForm, _super);
	    function EntityForm() {
	        _super.apply(this, arguments);
	    }
	    EntityForm.prototype.fieldChanged = function (fieldSchema) {
	    };
	    EntityForm.prototype.render = function () {
	        var _this = this;
	        var fieldChanged = this.fieldChanged.bind(this);
	        var fields = this.props.schema.fields.map(function (field) {
	            return React.createElement(fieldbloc_1.FieldBloc, {key: field.key, schema: field, onChange: fieldChanged, currentLanguage: _this.props.currentLanguage, entity: _this.props.entity});
	        });
	        return React.createElement("div", {className: "entityform"}, fields);
	    };
	    return EntityForm;
	}(React.Component));
	exports.EntityForm = EntityForm;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "entityform.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var _ = __webpack_require__(266);
	var notsupported_1 = __webpack_require__(303);
	var selectfield_1 = __webpack_require__(304);
	var textfield_1 = __webpack_require__(305);
	var boolfield_1 = __webpack_require__(306);
	var FieldBlocProps = (function () {
	    function FieldBlocProps() {
	    }
	    return FieldBlocProps;
	}());
	exports.FieldBlocProps = FieldBlocProps;
	var fieldTypes = {
	    "selectlist": selectfield_1.SelectField,
	    "text": textfield_1.TextField,
	    "bool": boolfield_1.BoolField
	};
	var FieldBloc = (function (_super) {
	    __extends(FieldBloc, _super);
	    function FieldBloc() {
	        _super.apply(this, arguments);
	    }
	    FieldBloc.prototype.fieldChanged = function (field) {
	        if (this.props.onChange)
	            this.props.onChange(field);
	    };
	    FieldBloc.prototype.render = function () {
	        var elt = fieldTypes[this.props.schema.type];
	        if (!elt)
	            elt = notsupported_1.FieldNotSupported;
	        var ctrl = React.createElement(elt, _.assign({ onChange: this.fieldChanged.bind(this) }, this.props));
	        return React.createElement("div", {className: "entityfield"}, ctrl);
	    };
	    return FieldBloc;
	}(React.Component));
	exports.FieldBloc = FieldBloc;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "fieldbloc.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var FieldNotSupported = (function (_super) {
	    __extends(FieldNotSupported, _super);
	    function FieldNotSupported() {
	        _super.apply(this, arguments);
	    }
	    FieldNotSupported.prototype.render = function () {
	        return React.createElement("span", {className: "notsupported"}, React.createElement("b", null, this.props.schema.type, " field not yet supported"));
	    };
	    return FieldNotSupported;
	}(React.Component));
	exports.FieldNotSupported = FieldNotSupported;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "notsupported.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var SelectField = (function (_super) {
	    __extends(SelectField, _super);
	    function SelectField() {
	        _super.apply(this, arguments);
	    }
	    SelectField.prototype.valuechanged = function (arg) {
	        this.props.entity[this.props.schema.key] = arg.currentTarget.value;
	        this.setState({});
	        this.props.onChange(this.props.schema);
	    };
	    SelectField.prototype.render = function () {
	        var _this = this;
	        var keys = Object.keys(this.props.schema.values);
	        var lng = this.props.currentLanguage;
	        var options = [React.createElement("option", {key: "_empty", value: ""})];
	        keys.forEach(function (k) {
	            var item = _this.props.schema.values[k];
	            var label = item[lng];
	            options.push(React.createElement("option", {key: k, value: k}, label));
	        });
	        var label = this.props.schema.labels[this.props.currentLanguage];
	        return React.createElement("div", null, React.createElement("label", {htmlFor: this.props.schema.key}, label), React.createElement("select", {id: this.props.schema.key, name: this.props.schema.key, value: this.props.entity[this.props.schema.key], onChange: this.valuechanged.bind(this)}, options));
	    };
	    return SelectField;
	}(React.Component));
	exports.SelectField = SelectField;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "selectfield.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var TextField = (function (_super) {
	    __extends(TextField, _super);
	    function TextField() {
	        _super.apply(this, arguments);
	    }
	    TextField.prototype.render = function () {
	        return React.createElement("div", null, React.createElement("label", {className: "forcheckbox", htmlFor: this.props.schema.key}, this.props.schema.labels[this.props.currentLanguage]), React.createElement("input", {id: this.props.schema.key, name: this.props.schema.key, type: "text"}));
	    };
	    return TextField;
	}(React.Component));
	exports.TextField = TextField;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "textfield.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var BoolField = (function (_super) {
	    __extends(BoolField, _super);
	    function BoolField() {
	        _super.apply(this, arguments);
	    }
	    BoolField.prototype.valuechanged = function (arg) {
	        this.props.entity[this.props.schema.key] = arg.currentTarget.checked;
	        this.setState({});
	        this.props.onChange(this.props.schema);
	    };
	    BoolField.prototype.render = function () {
	        return React.createElement("div", null, React.createElement("input", {id: this.props.schema.key, name: this.props.schema.key, value: this.props.entity[this.props.schema.key] || false, onChange: this.valuechanged.bind(this), type: "checkbox"}), React.createElement("label", {className: "forcheckbox", htmlFor: this.props.schema.key}, this.props.schema.labels[this.props.currentLanguage]));
	    };
	    return BoolField;
	}(React.Component));
	exports.BoolField = BoolField;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "boolfield.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 307:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 309:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var page_1 = __webpack_require__(291);
	var SpeakersPage = (function (_super) {
	    __extends(SpeakersPage, _super);
	    function SpeakersPage() {
	        _super.apply(this, arguments);
	    }
	    SpeakersPage.prototype.render = function () {
	        return React.createElement(page_1.AppPage, {className: "speakerspage", defaultPadding: true}, React.createElement("header", null, "speakers page"), React.createElement("section", null, "page content"));
	    };
	    return SpeakersPage;
	}(React.Component));
	exports.SpeakersPage = SpeakersPage;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "speakerspage.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 310:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var page_1 = __webpack_require__(291);
	var SessionsPage = (function (_super) {
	    __extends(SessionsPage, _super);
	    function SessionsPage() {
	        _super.apply(this, arguments);
	    }
	    SessionsPage.prototype.render = function () {
	        return React.createElement(page_1.AppPage, {className: "sessionspage", defaultPadding: true}, React.createElement("header", null, "sessions page"), React.createElement("section", null, "page content"));
	    };
	    return SessionsPage;
	}(React.Component));
	exports.SessionsPage = SessionsPage;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "sessionspage.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(89);
	var page_1 = __webpack_require__(291);
	var card_1 = __webpack_require__(294);
	var i18nservice_1 = __webpack_require__(192);
	var userservice_1 = __webpack_require__(287);
	__webpack_require__(312);
	var LoginPage = (function (_super) {
	    __extends(LoginPage, _super);
	    function LoginPage(props) {
	        _super.call(this, props);
	        this.state = {
	            login: "",
	            password: "",
	            message: null
	        };
	    }
	    LoginPage.prototype.trylogin = function () {
	        var _this = this;
	        userservice_1.signin(this.state.login, this.state.password).then(function (res) {
	            if (res.authenticated) {
	                var router = _this.context["router"];
	                var location_1 = _this.props.location;
	                if (location_1.state && location_1.state.nextPathname) {
	                    router.replace(location_1.state.nextPathname);
	                }
	                else {
	                    router.replace('/');
	                }
	            }
	            else {
	                _this.setState({ message: res.message });
	            }
	        });
	    };
	    LoginPage.prototype.render = function () {
	        var _this = this;
	        var message;
	        if (this.state.message) {
	            message = React.createElement("p", {className: "message"}, this.state.message);
	        }
	        return React.createElement(page_1.AppPage, {className: "loginpage", defaultPadding: false, withHeader: false}, React.createElement(card_1.Card, {className: "loginform", defaultPadding: false}, React.createElement("header", null, React.createElement("img", {src: "assets/logo-lg.png"})), React.createElement("section", null, React.createElement(i18nservice_1.AppLabel, {component: "h3", i18n: "loginpage.title"}), React.createElement("form", {action: "#"}, React.createElement("p", null, React.createElement("label", {htmlFor: "login"}, React.createElement(i18nservice_1.AppLabel, {i18n: "loginpage.login"})), React.createElement("input", {type: "text", id: "login", value: this.state.login, onChange: function (arg) { return _this.setState({ login: arg.currentTarget.value }); }})), React.createElement("p", null, React.createElement("label", {htmlFor: "password"}, React.createElement(i18nservice_1.AppLabel, {i18n: "loginpage.password"})), React.createElement("input", {type: "password", id: "password", value: this.state.password, onChange: function (arg) { return _this.setState({ password: arg.currentTarget.value }); }})), message)), React.createElement("footer", null, React.createElement("button", {onClick: this.trylogin.bind(this)}, React.createElement(i18nservice_1.AppLabel, {i18n: "loginpage.loginbtn"})))));
	    };
	    LoginPage.contextTypes = {
	        router: React.PropTypes.object.isRequired
	    };
	    return LoginPage;
	}(React.Component));
	exports.LoginPage = LoginPage;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "loginpage.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 312:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(16), RootInstanceProvider = __webpack_require__(24), ReactMount = __webpack_require__(26), React = __webpack_require__(89); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _ = __webpack_require__(266);
	var React = __webpack_require__(89);
	var ReactDataGrid = __webpack_require__(315);
	var page_1 = __webpack_require__(291);
	__webpack_require__(316);
	__webpack_require__(318);
	function createRows(nb) {
	    var _rows = [];
	    for (var i = 1; i < nb; i++) {
	        _rows.push({
	            id: i,
	            titles: "Dr.",
	            title: 'Title ' + i,
	            count: i * 1000
	        });
	    }
	    return _rows;
	}
	var Grid = ReactDataGrid;
	var DropDownEditor = ReactDataGrid.Editors.DropDownEditor;
	var titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];
	var columns = [
	    {
	        key: 'id',
	        name: 'ID',
	        sortable: true,
	        width: 80
	    },
	    {
	        key: 'titles',
	        name: 'C.',
	        resizable: true,
	        sortable: true,
	    },
	    {
	        key: 'title',
	        name: 'Title',
	        resizable: true,
	        sortable: true,
	    },
	    {
	        key: 'count',
	        resizable: true,
	        sortable: true,
	        name: 'Count'
	    }
	];
	var DataGridPage = (function (_super) {
	    __extends(DataGridPage, _super);
	    function DataGridPage(props) {
	        _super.call(this, props);
	        this.state = {
	            rows: [],
	            columns: []
	        };
	    }
	    DataGridPage.prototype.componentDidMount = function () {
	        var _this = this;
	        setTimeout(function () {
	            _this.setState({ rows: createRows(500), columns: columns });
	        }, 350);
	    };
	    DataGridPage.prototype.rowGetter = function (i) {
	        return this.state.rows[i];
	    };
	    DataGridPage.prototype.handleRowUpdated = function (e) {
	        //merge updated row with current row and rerender by setting state
	        var rows = this.state.rows;
	        rows[e.rowIdx] = _.assign(rows[e.rowIdx], e.updated);
	        this.setState({ rows: rows });
	    };
	    DataGridPage.prototype.stringSort = function (column, direction) {
	        var comparer = function (a, b) { return a[column].localeCompare(b[column]); };
	        if (direction == 'DESC') {
	            comparer = function (a, b) { return a[column].localeCompare(b[column]) * -1; };
	        }
	        return comparer;
	    };
	    DataGridPage.prototype.nbSort = function (column, direction) {
	        var comparer = function (a, b) { return a[column] - b[column]; };
	        if (direction == 'DESC') {
	            comparer = function (a, b) { return b[column] - a[column]; };
	        }
	        return comparer;
	    };
	    DataGridPage.prototype.getSort = function (column, direction) {
	        if (column == 'title' || column == 'titles') {
	            return this.stringSort(column, direction);
	        }
	        else if (column == 'id' || column == 'count') {
	            return this.nbSort(column, direction);
	        }
	    };
	    DataGridPage.prototype.handleSort = function (column, direction) {
	        var comparer = this.getSort(column, direction);
	        this.setState({ rows: this.state.rows.sort(comparer) });
	    };
	    DataGridPage.prototype.render = function () {
	        return React.createElement(page_1.AppPage, {className: "datagridpage"}, React.createElement("header", null, React.createElement("h1", null, "Tests de datagrid"), React.createElement("div", {className: "actions"})), React.createElement("section", {className: "defaultpadding"}, React.createElement("div", {className: "gridcontainer"}, React.createElement(Grid, {columns: this.state.columns, onGridSort: this.handleSort.bind(this), rowGetter: this.rowGetter.bind(this), rowsCount: this.state.rows.length, minHeight: 400, enableCellSelect: true, onRowUpdated: this.handleRowUpdated.bind(this)}))));
	    };
	    return DataGridPage;
	}(React.Component));
	exports.DataGridPage = DataGridPage;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(198); if (makeExportsHot(module, __webpack_require__(89))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "datagridtests.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },

/***/ 315:
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(89), __webpack_require__(105));
		else if(typeof define === 'function' && define.amd)
			define(["react", "react-dom"], factory);
		else if(typeof exports === 'object')
			exports["ReactDataGrid"] = factory(require("react"), require("react-dom"));
		else
			root["ReactDataGrid"] = factory(root["React"], root["ReactDOM"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		module.exports = __webpack_require__(1);
		module.exports.Editors = __webpack_require__(103);
		module.exports.Formatters = __webpack_require__(107);
		module.exports.Toolbar = __webpack_require__(109);
		module.exports.Row = __webpack_require__(87);
		module.exports.Menu = __webpack_require__(110);
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
		var React = __webpack_require__(2);
		var ReactDOM = __webpack_require__(3);
		var BaseGrid = __webpack_require__(4);
		var Row = __webpack_require__(87);
		var ExcelColumn = __webpack_require__(15);
		var KeyboardHandlerMixin = __webpack_require__(90);
		var CheckboxEditor = __webpack_require__(99);
		var DOMMetrics = __webpack_require__(97);
		var ColumnMetricsMixin = __webpack_require__(100);
		var RowUtils = __webpack_require__(102);
		var ColumnUtils = __webpack_require__(10);
	
		if (!Object.assign) {
		  Object.assign = __webpack_require__(101);
		}
	
	
		var ReactDataGrid = React.createClass({
		  displayName: 'ReactDataGrid',
	
	
		  mixins: [ColumnMetricsMixin, DOMMetrics.MetricsComputatorMixin, KeyboardHandlerMixin],
	
		  propTypes: {
		    rowHeight: React.PropTypes.number.isRequired,
		    headerRowHeight: React.PropTypes.number,
		    minHeight: React.PropTypes.number.isRequired,
		    minWidth: React.PropTypes.number,
		    enableRowSelect: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
		    onRowUpdated: React.PropTypes.func,
		    rowGetter: React.PropTypes.func.isRequired,
		    rowsCount: React.PropTypes.number.isRequired,
		    toolbar: React.PropTypes.element,
		    enableCellSelect: React.PropTypes.bool,
		    columns: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
		    onFilter: React.PropTypes.func,
		    onCellCopyPaste: React.PropTypes.func,
		    onCellsDragged: React.PropTypes.func,
		    onAddFilter: React.PropTypes.func,
		    onGridSort: React.PropTypes.func,
		    onDragHandleDoubleClick: React.PropTypes.func,
		    onGridRowsUpdated: React.PropTypes.func,
		    onRowSelect: React.PropTypes.func,
		    rowKey: React.PropTypes.string,
		    rowScrollTimeout: React.PropTypes.number,
		    onClearFilters: React.PropTypes.func,
		    contextMenu: React.PropTypes.element,
		    cellNavigationMode: React.PropTypes.oneOf(['none', 'loopOverRow', 'changeRow']),
		    onCellSelected: React.PropTypes.func,
		    onCellDeSelected: React.PropTypes.func
		  },
	
		  getDefaultProps: function getDefaultProps() {
		    return {
		      enableCellSelect: false,
		      tabIndex: -1,
		      rowHeight: 35,
		      enableRowSelect: false,
		      minHeight: 350,
		      rowKey: 'id',
		      rowScrollTimeout: 0,
		      cellNavigationMode: 'none'
		    };
		  },
	
	
		  getInitialState: function getInitialState() {
		    var columnMetrics = this.createColumnMetrics();
		    var initialState = { columnMetrics: columnMetrics, selectedRows: [], copied: null, expandedRows: [], canFilter: false, columnFilters: {}, sortDirection: null, sortColumn: null, dragged: null, scrollOffset: 0 };
		    if (this.props.enableCellSelect) {
		      initialState.selected = { rowIdx: 0, idx: 0 };
		    } else {
		      initialState.selected = { rowIdx: -1, idx: -1 };
		    }
		    return initialState;
		  },
	
		  hasSelectedCellChanged: function hasSelectedCellChanged(selected) {
		    var previouslySelected = Object.assign({}, this.state.selected);
		    return previouslySelected.rowIdx !== selected.rowIdx || previouslySelected.idx !== selected.idx || previouslySelected.active === false;
		  },
	
		  onContextMenuHide: function onContextMenuHide() {
		    document.removeEventListener('click', this.onContextMenuHide);
		    var newSelected = Object.assign({}, this.state.selected, { contextMenuDisplayed: false });
		    this.setState({ selected: newSelected });
		  },
	
		  onColumnEvent: function onColumnEvent(ev, columnEvent) {
		    var idx = columnEvent.idx;
		    var name = columnEvent.name;
	
	
		    if (name && typeof idx !== 'undefined') {
		      var column = this.getColumn(idx);
	
		      if (column && column.events && column.events[name] && typeof column.events[name] === 'function') {
		        var eventArgs = {
		          rowIdx: columnEvent.rowIdx,
		          idx: idx,
		          column: column
		        };
	
		        column.events[name](ev, eventArgs);
		      }
		    }
		  },
	
		  onSelect: function onSelect(selected) {
		    var _this = this;
	
		    if (this.state.selected.rowIdx !== selected.rowIdx || this.state.selected.idx !== selected.idx || this.state.selected.active === false) {
		      var _idx = selected.idx;
		      var _rowIdx = selected.rowIdx;
		      if (_idx >= 0 && _rowIdx >= 0 && _idx < ColumnUtils.getSize(this.state.columnMetrics.columns) && _rowIdx < this.props.rowsCount) {
		        (function () {
		          var oldSelection = _this.state.selected;
		          _this.setState({ selected: selected }, function () {
		            if (typeof _this.props.onCellDeSelected === 'function') {
		              _this.props.onCellDeSelected(oldSelection);
		            }
		            if (typeof _this.props.onCellSelected === 'function') {
		              _this.props.onCellSelected(selected);
		            }
		          });
		        })();
		      }
		    }
		  },
	
		  onCellClick: function onCellClick(cell) {
		    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx });
		  },
	
		  onCellContextMenu: function onCellContextMenu(cell) {
		    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx, contextMenuDisplayed: this.props.contextMenu });
		    if (this.props.contextMenu) {
		      document.addEventListener('click', this.onContextMenuHide);
		    }
		  },
	
		  onCellDoubleClick: function onCellDoubleClick(cell) {
		    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx });
		    this.setActive('Enter');
		  },
	
		  onViewportDoubleClick: function onViewportDoubleClick() {
		    this.setActive();
		  },
	
		  onPressArrowUp: function onPressArrowUp(e) {
		    this.moveSelectedCell(e, -1, 0);
		  },
		  onPressArrowDown: function onPressArrowDown(e) {
		    this.moveSelectedCell(e, 1, 0);
		  },
		  onPressArrowLeft: function onPressArrowLeft(e) {
		    this.moveSelectedCell(e, 0, -1);
		  },
		  onPressArrowRight: function onPressArrowRight(e) {
		    this.moveSelectedCell(e, 0, 1);
		  },
		  onPressTab: function onPressTab(e) {
		    this.moveSelectedCell(e, 0, e.shiftKey ? -1 : 1);
		  },
		  onPressEnter: function onPressEnter(e) {
		    this.setActive(e.key);
		  },
		  onPressDelete: function onPressDelete(e) {
		    this.setActive(e.key);
		  },
		  onPressEscape: function onPressEscape(e) {
		    this.setInactive(e.key);
		  },
		  onPressBackspace: function onPressBackspace(e) {
		    this.setActive(e.key);
		  },
		  onPressChar: function onPressChar(e) {
		    if (this.isKeyPrintable(e.keyCode)) {
		      this.setActive(e.keyCode);
		    }
		  },
		  onPressKeyWithCtrl: function onPressKeyWithCtrl(e) {
		    var keys = {
		      KeyCode_c: 99,
		      KeyCode_C: 67,
		      KeyCode_V: 86,
		      KeyCode_v: 118
		    };
	
		    var rowIdx = this.state.selected.rowIdx;
		    var row = this.props.rowGetter(rowIdx);
	
		    var idx = this.state.selected.idx;
		    var col = this.getColumn(idx);
	
		    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
		      if (e.keyCode === keys.KeyCode_c || e.keyCode === keys.KeyCode_C) {
		        var _value = this.getSelectedValue();
		        this.handleCopy({ value: _value });
		      } else if (e.keyCode === keys.KeyCode_v || e.keyCode === keys.KeyCode_V) {
		        this.handlePaste();
		      }
		    }
		  },
		  onCellCommit: function onCellCommit(commit) {
		    var selected = Object.assign({}, this.state.selected);
		    selected.active = false;
		    if (commit.key === 'Tab') {
		      selected.idx += 1;
		    }
		    var expandedRows = this.state.expandedRows;
		    // if(commit.changed && commit.changed.expandedHeight){
		    //   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
		    // }
		    this.setState({ selected: selected, expandedRows: expandedRows });
	
		    if (this.props.onRowUpdated) {
		      this.props.onRowUpdated(commit);
		    }
	
		    var targetRow = commit.rowIdx;
	
		    if (this.props.onGridRowsUpdated) {
		      this.props.onGridRowsUpdated({
		        cellKey: commit.cellKey,
		        fromRow: targetRow,
		        toRow: targetRow,
		        updated: commit.updated,
		        action: 'cellUpdate' });
		    }
		  },
		  onDragStart: function onDragStart(e) {
		    var value = this.getSelectedValue();
		    this.handleDragStart({ idx: this.state.selected.idx, rowIdx: this.state.selected.rowIdx, value: value });
		    // need to set dummy data for FF
		    if (e && e.dataTransfer) {
		      if (e.dataTransfer.setData) {
		        e.dataTransfer.dropEffect = 'move';
		        e.dataTransfer.effectAllowed = 'move';
		        e.dataTransfer.setData('text/plain', 'dummy');
		      }
		    }
		  },
		  onToggleFilter: function onToggleFilter() {
		    var _this2 = this;
	
		    // setState() does not immediately mutate this.state but creates a pending state transition.
		    // Therefore if you want to do something after the state change occurs, pass it in as a callback function.
		    this.setState({ canFilter: !this.state.canFilter }, function () {
		      if (_this2.state.canFilter === false && _this2.props.onClearFilters) {
		        _this2.props.onClearFilters();
		      }
		    });
		  },
		  onDragHandleDoubleClick: function onDragHandleDoubleClick(e) {
		    if (this.props.onDragHandleDoubleClick) {
		      this.props.onDragHandleDoubleClick(e);
		    }
	
		    if (this.props.onGridRowsUpdated) {
		      var cellKey = this.getColumn(e.idx).key;
	
		      var updated = _defineProperty({}, cellKey, e.rowData[cellKey]);
	
		      this.props.onGridRowsUpdated({
		        cellKey: cellKey,
		        fromRow: e.rowIdx,
		        toRow: this.props.rowsCount - 1,
		        updated: updated,
		        action: 'columnFill' });
		    }
		  },
		  handleDragStart: function handleDragStart(dragged) {
		    if (!this.dragEnabled()) {
		      return;
		    }
		    var idx = dragged.idx;
		    var rowIdx = dragged.rowIdx;
		    if (idx >= 0 && rowIdx >= 0 && idx < this.getSize() && rowIdx < this.props.rowsCount) {
		      this.setState({ dragged: dragged });
		    }
		  },
		  handleDragEnd: function handleDragEnd() {
		    if (!this.dragEnabled()) {
		      return;
		    }
		    var fromRow = void 0;
		    var toRow = void 0;
		    var selected = this.state.selected;
		    var dragged = this.state.dragged;
		    var cellKey = this.getColumn(this.state.selected.idx).key;
		    fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
		    toRow = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
		    if (this.props.onCellsDragged) {
		      this.props.onCellsDragged({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, value: dragged.value });
		    }
		    if (this.props.onGridRowsUpdated) {
		      var updated = _defineProperty({}, cellKey, dragged.value);
	
		      this.props.onGridRowsUpdated({
		        cellKey: cellKey,
		        fromRow: fromRow,
		        toRow: toRow,
		        updated: updated,
		        action: 'cellDrag' });
		    }
		    this.setState({ dragged: { complete: true } });
		  },
		  handleDragEnter: function handleDragEnter(row) {
		    if (!this.dragEnabled()) {
		      return;
		    }
		    var dragged = this.state.dragged;
		    dragged.overRowIdx = row;
		    this.setState({ dragged: dragged });
		  },
		  handleTerminateDrag: function handleTerminateDrag() {
		    if (!this.dragEnabled()) {
		      return;
		    }
		    this.setState({ dragged: null });
		  },
		  handlePaste: function handlePaste() {
		    if (!this.copyPasteEnabled()) {
		      return;
		    }
		    var selected = this.state.selected;
		    var cellKey = this.getColumn(this.state.selected.idx).key;
		    var textToCopy = this.state.textToCopy;
		    var toRow = selected.rowIdx;
	
		    if (this.props.onCellCopyPaste) {
		      this.props.onCellCopyPaste({ cellKey: cellKey, rowIdx: toRow, value: textToCopy, fromRow: this.state.copied.rowIdx, toRow: toRow });
		    }
	
		    if (this.props.onGridRowsUpdated) {
		      var updated = _defineProperty({}, cellKey, textToCopy);
	
		      this.props.onGridRowsUpdated({
		        cellKey: cellKey,
		        fromRow: toRow,
		        toRow: toRow,
		        updated: updated,
		        action: 'copyPaste' });
		    }
	
		    this.setState({ copied: null });
		  },
		  handleCopy: function handleCopy(args) {
		    if (!this.copyPasteEnabled()) {
		      return;
		    }
		    var textToCopy = args.value;
		    var selected = this.state.selected;
		    var copied = { idx: selected.idx, rowIdx: selected.rowIdx };
		    this.setState({ textToCopy: textToCopy, copied: copied });
		  },
	
	
		  handleSort: function handleSort(columnKey, direction) {
		    this.setState({ sortDirection: direction, sortColumn: columnKey }, function () {
		      this.props.onGridSort(columnKey, direction);
		    });
		  },
	
		  getSelectedRow: function getSelectedRow(rows, key) {
		    var _this3 = this;
	
		    var selectedRow = rows.filter(function (r) {
		      if (r[_this3.props.rowKey] === key) {
		        return true;
		      }
		      return false;
		    });
		    if (selectedRow.length > 0) {
		      return selectedRow[0];
		    }
		  },
	
	
		  // columnKey not used here as this function will select the whole row,
		  // but needed to match the function signature in the CheckboxEditor
		  handleRowSelect: function handleRowSelect(rowIdx, columnKey, rowData, e) {
		    e.stopPropagation();
		    var selectedRows = this.props.enableRowSelect === 'single' ? [] : this.state.selectedRows.slice(0);
		    var selectedRow = this.getSelectedRow(selectedRows, rowData[this.props.rowKey]);
		    if (selectedRow) {
		      selectedRow.isSelected = !selectedRow.isSelected;
		    } else {
		      rowData.isSelected = true;
		      selectedRows.push(rowData);
		    }
		    this.setState({ selectedRows: selectedRows, selected: { rowIdx: rowIdx, idx: 0 } });
		    if (this.props.onRowSelect) {
		      this.props.onRowSelect(selectedRows.filter(function (r) {
		        return r.isSelected === true;
		      }));
		    }
		  },
	
	
		  handleCheckboxChange: function handleCheckboxChange(e) {
		    var allRowsSelected = void 0;
		    if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true) {
		      allRowsSelected = true;
		    } else {
		      allRowsSelected = false;
		    }
		    var selectedRows = [];
		    for (var i = 0; i < this.props.rowsCount; i++) {
		      var row = Object.assign({}, this.props.rowGetter(i), { isSelected: allRowsSelected });
		      selectedRows.push(row);
		    }
		    this.setState({ selectedRows: selectedRows });
		    if (typeof this.props.onRowSelect === 'function') {
		      this.props.onRowSelect(selectedRows.filter(function (r) {
		        return r.isSelected === true;
		      }));
		    }
		  },
	
		  getScrollOffSet: function getScrollOffSet() {
		    var scrollOffset = 0;
		    var canvas = ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');
		    if (canvas) {
		      scrollOffset = canvas.offsetWidth - canvas.clientWidth;
		    }
		    this.setState({ scrollOffset: scrollOffset });
		  },
		  getRowOffsetHeight: function getRowOffsetHeight() {
		    var offsetHeight = 0;
		    this.getHeaderRows().forEach(function (row) {
		      return offsetHeight += parseFloat(row.height, 10);
		    });
		    return offsetHeight;
		  },
		  getHeaderRows: function getHeaderRows() {
		    var rows = [{ ref: 'row', height: this.props.headerRowHeight || this.props.rowHeight, rowType: 'header' }];
		    if (this.state.canFilter === true) {
		      rows.push({
		        ref: 'filterRow',
		        filterable: true,
		        onFilterChange: this.props.onAddFilter,
		        height: 45,
		        rowType: 'filter'
		      });
		    }
		    return rows;
		  },
	
	
		  getInitialSelectedRows: function getInitialSelectedRows() {
		    var selectedRows = [];
		    for (var i = 0; i < this.props.rowsCount; i++) {
		      selectedRows.push(false);
		    }
		    return selectedRows;
		  },
	
		  getSelectedValue: function getSelectedValue() {
		    var rowIdx = this.state.selected.rowIdx;
		    var idx = this.state.selected.idx;
		    var cellKey = this.getColumn(idx).key;
		    var row = this.props.rowGetter(rowIdx);
		    return RowUtils.get(row, cellKey);
		  },
		  moveSelectedCell: function moveSelectedCell(e, rowDelta, cellDelta) {
		    // we need to prevent default as we control grid scroll
		    // otherwise it moves every time you left/right which is janky
		    e.preventDefault();
		    var rowIdx = void 0;
		    var idx = void 0;
		    var cellNavigationMode = this.props.cellNavigationMode;
	
		    if (cellNavigationMode !== 'none') {
		      var _calculateNextSelecti = this.calculateNextSelectionPosition(cellNavigationMode, cellDelta, rowDelta);
	
		      idx = _calculateNextSelecti.idx;
		      rowIdx = _calculateNextSelecti.rowIdx;
		    } else {
		      rowIdx = this.state.selected.rowIdx + rowDelta;
		      idx = this.state.selected.idx + cellDelta;
		    }
		    this.onSelect({ idx: idx, rowIdx: rowIdx });
		  },
		  getNbrColumns: function getNbrColumns() {
		    var _props = this.props;
		    var columns = _props.columns;
		    var enableRowSelect = _props.enableRowSelect;
	
		    return enableRowSelect ? columns.length + 1 : columns.length;
		  },
		  calculateNextSelectionPosition: function calculateNextSelectionPosition(cellNavigationMode, cellDelta, rowDelta) {
		    var _rowDelta = rowDelta;
		    var idx = this.state.selected.idx + cellDelta;
		    var nbrColumns = this.getNbrColumns();
		    if (cellDelta > 0) {
		      if (this.isAtLastCellInRow(nbrColumns)) {
		        if (cellNavigationMode === 'changeRow') {
		          _rowDelta = this.isAtLastRow() ? rowDelta : rowDelta + 1;
		          idx = this.isAtLastRow() ? idx : 0;
		        } else {
		          idx = 0;
		        }
		      }
		    } else if (cellDelta < 0) {
		      if (this.isAtFirstCellInRow()) {
		        if (cellNavigationMode === 'changeRow') {
		          _rowDelta = this.isAtFirstRow() ? rowDelta : rowDelta - 1;
		          idx = this.isAtFirstRow() ? 0 : nbrColumns - 1;
		        } else {
		          idx = nbrColumns - 1;
		        }
		      }
		    }
		    var rowIdx = this.state.selected.rowIdx + _rowDelta;
		    return { idx: idx, rowIdx: rowIdx };
		  },
		  isAtLastCellInRow: function isAtLastCellInRow(nbrColumns) {
		    return this.state.selected.idx === nbrColumns - 1;
		  },
		  isAtLastRow: function isAtLastRow() {
		    return this.state.selected.rowIdx === this.props.rowsCount - 1;
		  },
		  isAtFirstCellInRow: function isAtFirstCellInRow() {
		    return this.state.selected.idx === 0;
		  },
		  isAtFirstRow: function isAtFirstRow() {
		    return this.state.selected.rowIdx === 0;
		  },
		  openCellEditor: function openCellEditor(rowIdx, idx) {
		    var _this4 = this;
	
		    var row = this.props.rowGetter(rowIdx);
		    var col = this.getColumn(idx);
	
		    if (!ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
		      return;
		    }
	
		    var selected = { rowIdx: rowIdx, idx: idx };
		    if (this.hasSelectedCellChanged(selected)) {
		      this.setState({ selected: selected }, function () {
		        _this4.setActive('Enter');
		      });
		    } else {
		      this.setActive('Enter');
		    }
		  },
		  setActive: function setActive(keyPressed) {
		    var rowIdx = this.state.selected.rowIdx;
		    var row = this.props.rowGetter(rowIdx);
	
		    var idx = this.state.selected.idx;
		    var col = this.getColumn(idx);
	
		    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect) && !this.isActive()) {
		      var _selected = Object.assign(this.state.selected, { idx: idx, rowIdx: rowIdx, active: true, initialKeyCode: keyPressed });
		      this.setState({ selected: _selected });
		    }
		  },
		  setInactive: function setInactive() {
		    var rowIdx = this.state.selected.rowIdx;
		    var row = this.props.rowGetter(rowIdx);
	
		    var idx = this.state.selected.idx;
		    var col = this.getColumn(idx);
	
		    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect) && this.isActive()) {
		      var _selected2 = Object.assign(this.state.selected, { idx: idx, rowIdx: rowIdx, active: false });
		      this.setState({ selected: _selected2 });
		    }
		  },
		  isActive: function isActive() {
		    return this.state.selected.active === true;
		  },
	
	
		  setupGridColumns: function setupGridColumns() {
		    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
		    var cols = props.columns.slice(0);
		    var unshiftedCols = {};
		    if (props.enableRowSelect) {
		      var headerRenderer = props.enableRowSelect === 'single' ? null : React.createElement(
		        'div',
		        { className: 'react-grid-checkbox-container' },
		        React.createElement('input', { className: 'react-grid-checkbox', type: 'checkbox', name: 'select-all-checkbox', onChange: this.handleCheckboxChange }),
		        React.createElement('label', { htmlFor: 'select-all-checkbox', className: 'react-grid-checkbox-label' })
		      );
		      var selectColumn = {
		        key: 'select-row',
		        name: '',
		        formatter: React.createElement(CheckboxEditor, null),
		        onCellChange: this.handleRowSelect,
		        filterable: false,
		        headerRenderer: headerRenderer,
		        width: 60,
		        locked: true,
		        getRowMetaData: function getRowMetaData(rowData) {
		          return rowData;
		        }
		      };
		      unshiftedCols = cols.unshift(selectColumn);
		      cols = unshiftedCols > 0 ? cols : unshiftedCols;
		    }
		    return cols;
		  },
	
		  copyPasteEnabled: function copyPasteEnabled() {
		    return this.props.onCellCopyPaste !== null;
		  },
	
		  dragEnabled: function dragEnabled() {
		    return this.props.onCellsDragged !== null;
		  },
	
		  renderToolbar: function renderToolbar() {
		    var Toolbar = this.props.toolbar;
		    if (React.isValidElement(Toolbar)) {
		      return React.cloneElement(Toolbar, { onToggleFilter: this.onToggleFilter, numberOfRows: this.props.rowsCount });
		    }
		  },
	
	
		  render: function render() {
		    var cellMetaData = {
		      selected: this.state.selected,
		      dragged: this.state.dragged,
		      onCellClick: this.onCellClick,
		      onCellContextMenu: this.onCellContextMenu,
		      onCellDoubleClick: this.onCellDoubleClick,
		      onCommit: this.onCellCommit,
		      onCommitCancel: this.setInactive,
		      copied: this.state.copied,
		      handleDragEnterRow: this.handleDragEnter,
		      handleTerminateDrag: this.handleTerminateDrag,
		      onDragHandleDoubleClick: this.onDragHandleDoubleClick,
		      enableCellSelect: this.props.enableCellSelect,
		      onColumnEvent: this.onColumnEvent,
		      openCellEditor: this.openCellEditor
		    };
	
		    var toolbar = this.renderToolbar();
		    var containerWidth = this.props.minWidth || this.DOMMetrics.gridWidth();
		    var gridWidth = containerWidth - this.state.scrollOffset;
	
		    // depending on the current lifecycle stage, gridWidth() may not initialize correctly
		    // this also handles cases where it always returns undefined -- such as when inside a div with display:none
		    // eg Bootstrap tabs and collapses
		    if (typeof containerWidth === 'undefined' || isNaN(containerWidth) || containerWidth === 0) {
		      containerWidth = '100%';
		    }
		    if (typeof gridWidth === 'undefined' || isNaN(gridWidth) || gridWidth === 0) {
		      gridWidth = '100%';
		    }
	
		    return React.createElement(
		      'div',
		      { className: 'react-grid-Container', style: { width: containerWidth } },
		      toolbar,
		      React.createElement(
		        'div',
		        { className: 'react-grid-Main' },
		        React.createElement(BaseGrid, _extends({
		          ref: 'base'
		        }, this.props, {
		          rowKey: this.props.rowKey,
		          headerRows: this.getHeaderRows(),
		          columnMetrics: this.state.columnMetrics,
		          rowGetter: this.props.rowGetter,
		          rowsCount: this.props.rowsCount,
		          rowHeight: this.props.rowHeight,
		          cellMetaData: cellMetaData,
		          selectedRows: this.state.selectedRows.filter(function (r) {
		            return r.isSelected === true;
		          }),
		          expandedRows: this.state.expandedRows,
		          rowOffsetHeight: this.getRowOffsetHeight(),
		          sortColumn: this.state.sortColumn,
		          sortDirection: this.state.sortDirection,
		          onSort: this.handleSort,
		          minHeight: this.props.minHeight,
		          totalWidth: gridWidth,
		          onViewportKeydown: this.onKeyDown,
		          onViewportDragStart: this.onDragStart,
		          onViewportDragEnd: this.handleDragEnd,
		          onViewportDoubleClick: this.onViewportDoubleClick,
		          onColumnResize: this.onColumnResize,
		          rowScrollTimeout: this.props.rowScrollTimeout,
		          contextMenu: this.props.contextMenu }))
		      )
		    );
		  }
		});
	
		module.exports = ReactDataGrid;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_3__;
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var React = __webpack_require__(2);
		var PropTypes = React.PropTypes;
		var Header = __webpack_require__(5);
		var Viewport = __webpack_require__(21);
		var GridScrollMixin = __webpack_require__(98);
		var DOMMetrics = __webpack_require__(97);
		var cellMetaDataShape = __webpack_require__(94);
	
		var Grid = React.createClass({
		  displayName: 'Grid',
	
		  propTypes: {
		    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
		    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		    columnMetrics: PropTypes.object,
		    minHeight: PropTypes.number,
		    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		    headerRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
		    rowHeight: PropTypes.number,
		    rowRenderer: PropTypes.func,
		    emptyRowsView: PropTypes.func,
		    expandedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
		    selectedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
		    rowsCount: PropTypes.number,
		    onRows: PropTypes.func,
		    sortColumn: React.PropTypes.string,
		    sortDirection: React.PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
		    rowOffsetHeight: PropTypes.number.isRequired,
		    onViewportKeydown: PropTypes.func.isRequired,
		    onViewportDragStart: PropTypes.func.isRequired,
		    onViewportDragEnd: PropTypes.func.isRequired,
		    onViewportDoubleClick: PropTypes.func.isRequired,
		    onColumnResize: PropTypes.func,
		    onSort: PropTypes.func,
		    cellMetaData: PropTypes.shape(cellMetaDataShape),
		    rowKey: PropTypes.string.isRequired,
		    rowScrollTimeout: PropTypes.number,
		    contextMenu: PropTypes.element
		  },
	
		  mixins: [GridScrollMixin, DOMMetrics.MetricsComputatorMixin],
	
		  getDefaultProps: function getDefaultProps() {
		    return {
		      rowHeight: 35,
		      minHeight: 350
		    };
		  },
	
	
		  getStyle: function getStyle() {
		    return {
		      overflow: 'hidden',
		      outline: 0,
		      position: 'relative',
		      minHeight: this.props.minHeight
		    };
		  },
	
		  render: function render() {
		    var headerRows = this.props.headerRows || [{ ref: 'row' }];
		    var EmptyRowsView = this.props.emptyRowsView;
	
		    return React.createElement(
		      'div',
		      _extends({}, this.props, { style: this.getStyle(), className: 'react-grid-Grid' }),
		      React.createElement(Header, {
		        ref: 'header',
		        columnMetrics: this.props.columnMetrics,
		        onColumnResize: this.props.onColumnResize,
		        height: this.props.rowHeight,
		        totalWidth: this.props.totalWidth,
		        headerRows: headerRows,
		        sortColumn: this.props.sortColumn,
		        sortDirection: this.props.sortDirection,
		        onSort: this.props.onSort,
		        onScroll: this.onHeaderScroll
		      }),
		      this.props.rowsCount >= 1 || this.props.rowsCount === 0 && !this.props.emptyRowsView ? React.createElement(
		        'div',
		        { ref: 'viewPortContainer', onKeyDown: this.props.onViewportKeydown, onDoubleClick: this.props.onViewportDoubleClick, onDragStart: this.props.onViewportDragStart, onDragEnd: this.props.onViewportDragEnd },
		        React.createElement(Viewport, {
		          ref: 'viewport',
		          rowKey: this.props.rowKey,
		          width: this.props.columnMetrics.width,
		          rowHeight: this.props.rowHeight,
		          rowRenderer: this.props.rowRenderer,
		          rowGetter: this.props.rowGetter,
		          rowsCount: this.props.rowsCount,
		          selectedRows: this.props.selectedRows,
		          expandedRows: this.props.expandedRows,
		          columnMetrics: this.props.columnMetrics,
		          totalWidth: this.props.totalWidth,
		          onScroll: this.onScroll,
		          onRows: this.props.onRows,
		          cellMetaData: this.props.cellMetaData,
		          rowOffsetHeight: this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length,
		          minHeight: this.props.minHeight,
		          rowScrollTimeout: this.props.rowScrollTimeout,
		          contextMenu: this.props.contextMenu
		        })
		      ) : React.createElement(
		        'div',
		        { ref: 'emptyView', className: 'react-grid-Empty' },
		        React.createElement(EmptyRowsView, null)
		      )
		    );
		  }
		});
	
		module.exports = Grid;
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var React = __webpack_require__(2);
		var ReactDOM = __webpack_require__(3);
		var joinClasses = __webpack_require__(6);
		var shallowCloneObject = __webpack_require__(7);
		var ColumnMetrics = __webpack_require__(8);
		var ColumnUtils = __webpack_require__(10);
		var HeaderRow = __webpack_require__(12);
		var PropTypes = React.PropTypes;
	
		var Header = React.createClass({
		  displayName: 'Header',
	
		  propTypes: {
		    columnMetrics: PropTypes.shape({ width: PropTypes.number.isRequired, columns: PropTypes.any }).isRequired,
		    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		    height: PropTypes.number.isRequired,
		    headerRows: PropTypes.array.isRequired,
		    sortColumn: PropTypes.string,
		    sortDirection: PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
		    onSort: PropTypes.func,
		    onColumnResize: PropTypes.func,
		    onScroll: PropTypes.func
		  },
	
		  getInitialState: function getInitialState() {
		    return { resizing: null };
		  },
		  componentWillReceiveProps: function componentWillReceiveProps() {
		    this.setState({ resizing: null });
		  },
	
	
		  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		    var update = !ColumnMetrics.sameColumns(this.props.columnMetrics.columns, nextProps.columnMetrics.columns, ColumnMetrics.sameColumn) || this.props.totalWidth !== nextProps.totalWidth || this.props.headerRows.length !== nextProps.headerRows.length || this.state.resizing !== nextState.resizing || this.props.sortColumn !== nextProps.sortColumn || this.props.sortDirection !== nextProps.sortDirection;
		    return update;
		  },
	
		  onColumnResize: function onColumnResize(column, width) {
		    var state = this.state.resizing || this.props;
	
		    var pos = this.getColumnPosition(column);
	
		    if (pos != null) {
		      var _resizing = {
		        columnMetrics: shallowCloneObject(state.columnMetrics)
		      };
		      _resizing.columnMetrics = ColumnMetrics.resizeColumn(_resizing.columnMetrics, pos, width);
	
		      // we don't want to influence scrollLeft while resizing
		      if (_resizing.columnMetrics.totalWidth < state.columnMetrics.totalWidth) {
		        _resizing.columnMetrics.totalWidth = state.columnMetrics.totalWidth;
		      }
	
		      _resizing.column = ColumnUtils.getColumn(_resizing.columnMetrics.columns, pos);
		      this.setState({ resizing: _resizing });
		    }
		  },
		  onColumnResizeEnd: function onColumnResizeEnd(column, width) {
		    var pos = this.getColumnPosition(column);
		    if (pos !== null && this.props.onColumnResize) {
		      this.props.onColumnResize(pos, width || column.width);
		    }
		  },
		  getHeaderRows: function getHeaderRows() {
		    var _this = this;
	
		    var columnMetrics = this.getColumnMetrics();
		    var resizeColumn = void 0;
		    if (this.state.resizing) {
		      resizeColumn = this.state.resizing.column;
		    }
		    var headerRows = [];
		    this.props.headerRows.forEach(function (row, index) {
		      var headerRowStyle = {
		        position: 'absolute',
		        top: _this.getCombinedHeaderHeights(index),
		        left: 0,
		        width: _this.props.totalWidth,
		        overflow: 'hidden'
		      };
	
		      headerRows.push(React.createElement(HeaderRow, {
		        key: row.ref,
		        ref: row.ref,
		        rowType: row.rowType,
		        style: headerRowStyle,
		        onColumnResize: _this.onColumnResize,
		        onColumnResizeEnd: _this.onColumnResizeEnd,
		        width: columnMetrics.width,
		        height: row.height || _this.props.height,
		        columns: columnMetrics.columns,
		        resizing: resizeColumn,
		        filterable: row.filterable,
		        onFilterChange: row.onFilterChange,
		        sortColumn: _this.props.sortColumn,
		        sortDirection: _this.props.sortDirection,
		        onSort: _this.props.onSort,
		        onScroll: _this.props.onScroll
		      }));
		    });
		    return headerRows;
		  },
		  getColumnMetrics: function getColumnMetrics() {
		    var columnMetrics = void 0;
		    if (this.state.resizing) {
		      columnMetrics = this.state.resizing.columnMetrics;
		    } else {
		      columnMetrics = this.props.columnMetrics;
		    }
		    return columnMetrics;
		  },
		  getColumnPosition: function getColumnPosition(column) {
		    var columnMetrics = this.getColumnMetrics();
		    var pos = -1;
		    columnMetrics.columns.forEach(function (c, idx) {
		      if (c.key === column.key) {
		        pos = idx;
		      }
		    });
		    return pos === -1 ? null : pos;
		  },
		  getCombinedHeaderHeights: function getCombinedHeaderHeights(until) {
		    var stopAt = this.props.headerRows.length;
		    if (typeof until !== 'undefined') {
		      stopAt = until;
		    }
	
		    var height = 0;
		    for (var index = 0; index < stopAt; index++) {
		      height += this.props.headerRows[index].height || this.props.height;
		    }
		    return height;
		  },
		  getStyle: function getStyle() {
		    return {
		      position: 'relative',
		      height: this.getCombinedHeaderHeights(),
		      overflow: 'hidden'
		    };
		  },
		  setScrollLeft: function setScrollLeft(scrollLeft) {
		    var node = ReactDOM.findDOMNode(this.refs.row);
		    node.scrollLeft = scrollLeft;
		    this.refs.row.setScrollLeft(scrollLeft);
		    if (this.refs.filterRow) {
		      var nodeFilters = ReactDOM.findDOMNode(this.refs.filterRow);
		      nodeFilters.scrollLeft = scrollLeft;
		      this.refs.filterRow.setScrollLeft(scrollLeft);
		    }
		  },
		  render: function render() {
		    var className = joinClasses({
		      'react-grid-Header': true,
		      'react-grid-Header--resizing': !!this.state.resizing
		    });
		    var headerRows = this.getHeaderRows();
	
		    return React.createElement(
		      'div',
		      _extends({}, this.props, { style: this.getStyle(), className: className }),
		      headerRows
		    );
		  }
		});
	
		module.exports = Header;
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
		  Copyright (c) 2015 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/
	
		function classNames() {
			var classes = '';
			var arg;
	
			for (var i = 0; i < arguments.length; i++) {
				arg = arguments[i];
				if (!arg) {
					continue;
				}
	
				if ('string' === typeof arg || 'number' === typeof arg) {
					classes += ' ' + arg;
				} else if (Object.prototype.toString.call(arg) === '[object Array]') {
					classes += ' ' + classNames.apply(null, arg);
				} else if ('object' === typeof arg) {
					for (var key in arg) {
						if (!arg.hasOwnProperty(key) || !arg[key]) {
							continue;
						}
						classes += ' ' + key;
					}
				}
			}
			return classes.substr(1);
		}
	
		// safely export classNames for node / browserify
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		}
	
		// safely export classNames for RequireJS
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
	
	
	/***/ },
	/* 7 */
	/***/ function(module, exports) {
	
		"use strict";
	
		function shallowCloneObject(obj) {
		  var result = {};
		  for (var k in obj) {
		    if (obj.hasOwnProperty(k)) {
		      result[k] = obj[k];
		    }
		  }
		  return result;
		}
	
		module.exports = shallowCloneObject;
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var shallowCloneObject = __webpack_require__(7);
		var sameColumn = __webpack_require__(9);
		var ColumnUtils = __webpack_require__(10);
		var getScrollbarSize = __webpack_require__(11);
	
		function setColumnWidths(columns, totalWidth) {
		  return columns.map(function (column) {
		    var colInfo = Object.assign({}, column);
		    if (column.width) {
		      if (/^([0-9]+)%$/.exec(column.width.toString())) {
		        colInfo.width = Math.floor(column.width / 100 * totalWidth);
		      }
		    }
		    return colInfo;
		  });
		}
	
		function setDefferedColumnWidths(columns, unallocatedWidth, minColumnWidth) {
		  var defferedColumns = columns.filter(function (c) {
		    return !c.width;
		  });
		  return columns.map(function (column) {
		    if (!column.width) {
		      if (unallocatedWidth <= 0) {
		        column.width = minColumnWidth;
		      } else {
		        column.width = Math.floor(unallocatedWidth / ColumnUtils.getSize(defferedColumns));
		      }
		    }
		    return column;
		  });
		}
	
		function setColumnOffsets(columns) {
		  var left = 0;
		  return columns.map(function (column) {
		    column.left = left;
		    left += column.width;
		    return column;
		  });
		}
	
		/**
		 * Update column metrics calculation.
		 *
		 * @param {ColumnMetricsType} metrics
		 */
		function recalculate(metrics) {
		  // compute width for columns which specify width
		  var columns = setColumnWidths(metrics.columns, metrics.totalWidth);
	
		  var unallocatedWidth = columns.filter(function (c) {
		    return c.width;
		  }).reduce(function (w, column) {
		    return w - column.width;
		  }, metrics.totalWidth);
		  unallocatedWidth -= getScrollbarSize();
	
		  var width = columns.filter(function (c) {
		    return c.width;
		  }).reduce(function (w, column) {
		    return w + column.width;
		  }, 0);
	
		  // compute width for columns which doesn't specify width
		  columns = setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);
	
		  // compute left offset
		  columns = setColumnOffsets(columns);
	
		  return {
		    columns: columns,
		    width: width,
		    totalWidth: metrics.totalWidth,
		    minColumnWidth: metrics.minColumnWidth
		  };
		}
	
		/**
		 * Update column metrics calculation by resizing a column.
		 *
		 * @param {ColumnMetricsType} metrics
		 * @param {Column} column
		 * @param {number} width
		 */
		function resizeColumn(metrics, index, width) {
		  var column = ColumnUtils.getColumn(metrics.columns, index);
		  var metricsClone = shallowCloneObject(metrics);
		  metricsClone.columns = metrics.columns.slice(0);
	
		  var updatedColumn = shallowCloneObject(column);
		  updatedColumn.width = Math.max(width, metricsClone.minColumnWidth);
	
		  metricsClone = ColumnUtils.spliceColumn(metricsClone, index, updatedColumn);
	
		  return recalculate(metricsClone);
		}
	
		function areColumnsImmutable(prevColumns, nextColumns) {
		  return typeof Immutable !== 'undefined' && prevColumns instanceof Immutable.List && nextColumns instanceof Immutable.List;
		}
	
		function compareEachColumn(prevColumns, nextColumns, isSameColumn) {
		  var i = void 0;
		  var len = void 0;
		  var column = void 0;
		  var prevColumnsByKey = {};
		  var nextColumnsByKey = {};
	
		  if (ColumnUtils.getSize(prevColumns) !== ColumnUtils.getSize(nextColumns)) {
		    return false;
		  }
	
		  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
		    column = prevColumns[i];
		    prevColumnsByKey[column.key] = column;
		  }
	
		  for (i = 0, len = ColumnUtils.getSize(nextColumns); i < len; i++) {
		    column = nextColumns[i];
		    nextColumnsByKey[column.key] = column;
		    var prevColumn = prevColumnsByKey[column.key];
		    if (prevColumn === undefined || !isSameColumn(prevColumn, column)) {
		      return false;
		    }
		  }
	
		  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
		    column = prevColumns[i];
		    var nextColumn = nextColumnsByKey[column.key];
		    if (nextColumn === undefined) {
		      return false;
		    }
		  }
		  return true;
		}
	
		function sameColumns(prevColumns, nextColumns, isSameColumn) {
		  if (areColumnsImmutable(prevColumns, nextColumns)) {
		    return prevColumns === nextColumns;
		  }
	
		  return compareEachColumn(prevColumns, nextColumns, isSameColumn);
		}
	
		module.exports = { recalculate: recalculate, resizeColumn: resizeColumn, sameColumn: sameColumn, sameColumns: sameColumns };
	
	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var isValidElement = __webpack_require__(2).isValidElement;
	
		module.exports = function sameColumn(a, b) {
		  var k = void 0;
	
		  for (k in a) {
		    if (a.hasOwnProperty(k)) {
		      if (typeof a[k] === 'function' && typeof b[k] === 'function' || isValidElement(a[k]) && isValidElement(b[k])) {
		        continue;
		      }
		      if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
		        return false;
		      }
		    }
		  }
	
		  for (k in b) {
		    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
		      return false;
		    }
		  }
	
		  return true;
		};
	
	/***/ },
	/* 10 */
	/***/ function(module, exports) {
	
		'use strict';
	
		module.exports = {
		  getColumn: function getColumn(columns, idx) {
		    if (Array.isArray(columns)) {
		      return columns[idx];
		    } else if (typeof Immutable !== 'undefined') {
		      return columns.get(idx);
		    }
		  },
		  spliceColumn: function spliceColumn(metrics, idx, column) {
		    if (Array.isArray(metrics.columns)) {
		      metrics.columns.splice(idx, 1, column);
		    } else if (typeof Immutable !== 'undefined') {
		      metrics.columns = metrics.columns.splice(idx, 1, column);
		    }
		    return metrics;
		  },
		  getSize: function getSize(columns) {
		    if (Array.isArray(columns)) {
		      return columns.length;
		    } else if (typeof Immutable !== 'undefined') {
		      return columns.size;
		    }
		  },
	
	
		  // Logic extented to allow for functions to be passed down in column.editable
		  // this allows us to deicde whether we can be edting from a cell level
		  canEdit: function canEdit(col, rowData, enableCellSelect) {
		    if (col.editable != null && typeof col.editable === 'function') {
		      return enableCellSelect === true && col.editable(rowData);
		    }
		    return enableCellSelect === true && (!!col.editor || !!col.editable);
		  }
		};
	
	/***/ },
	/* 11 */
	/***/ function(module, exports) {
	
		'use strict';
	
		var size = void 0;
	
		function getScrollbarSize() {
		  if (size === undefined) {
		    var outer = document.createElement('div');
		    outer.style.width = '50px';
		    outer.style.height = '50px';
		    outer.style.position = 'absolute';
		    outer.style.top = '-200px';
		    outer.style.left = '-200px';
	
		    var inner = document.createElement('div');
		    inner.style.height = '100px';
		    inner.style.width = '100%';
	
		    outer.appendChild(inner);
		    document.body.appendChild(outer);
	
		    var outerWidth = outer.clientWidth;
		    outer.style.overflowY = 'scroll';
		    var innerWidth = inner.clientWidth;
	
		    document.body.removeChild(outer);
	
		    size = outerWidth - innerWidth;
		  }
	
		  return size;
		}
	
		module.exports = getScrollbarSize;
	
	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var React = __webpack_require__(2);
		var shallowEqual = __webpack_require__(13);
		var HeaderCell = __webpack_require__(14);
		var getScrollbarSize = __webpack_require__(11);
		var ExcelColumn = __webpack_require__(15);
		var ColumnUtilsMixin = __webpack_require__(10);
		var SortableHeaderCell = __webpack_require__(18);
		var FilterableHeaderCell = __webpack_require__(19);
		var HeaderCellType = __webpack_require__(20);
	
		var PropTypes = React.PropTypes;
	
		var HeaderRowStyle = {
		  overflow: React.PropTypes.string,
		  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		  height: React.PropTypes.number,
		  position: React.PropTypes.string
		};
	
		var DEFINE_SORT = ['ASC', 'DESC', 'NONE'];
	
		var HeaderRow = React.createClass({
		  displayName: 'HeaderRow',
	
		  propTypes: {
		    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		    height: PropTypes.number.isRequired,
		    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		    onColumnResize: PropTypes.func,
		    onSort: PropTypes.func.isRequired,
		    onColumnResizeEnd: PropTypes.func,
		    style: PropTypes.shape(HeaderRowStyle),
		    sortColumn: PropTypes.string,
		    sortDirection: React.PropTypes.oneOf(DEFINE_SORT),
		    cellRenderer: PropTypes.func,
		    headerCellRenderer: PropTypes.func,
		    filterable: PropTypes.bool,
		    onFilterChange: PropTypes.func,
		    resizing: PropTypes.object,
		    onScroll: PropTypes.func,
		    rowType: PropTypes.string
		  },
	
		  mixins: [ColumnUtilsMixin],
	
		  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		    return nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.columns !== this.props.columns || !shallowEqual(nextProps.style, this.props.style) || this.props.sortColumn !== nextProps.sortColumn || this.props.sortDirection !== nextProps.sortDirection;
		  },
		  getHeaderCellType: function getHeaderCellType(column) {
		    if (column.filterable) {
		      if (this.props.filterable) return HeaderCellType.FILTERABLE;
		    }
	
		    if (column.sortable) return HeaderCellType.SORTABLE;
	
		    return HeaderCellType.NONE;
		  },
		  getFilterableHeaderCell: function getFilterableHeaderCell() {
		    return React.createElement(FilterableHeaderCell, { onChange: this.props.onFilterChange });
		  },
		  getSortableHeaderCell: function getSortableHeaderCell(column) {
		    var sortDirection = this.props.sortColumn === column.key ? this.props.sortDirection : DEFINE_SORT.NONE;
		    return React.createElement(SortableHeaderCell, { columnKey: column.key, onSort: this.props.onSort, sortDirection: sortDirection });
		  },
		  getHeaderRenderer: function getHeaderRenderer(column) {
		    var renderer = void 0;
		    if (column.headerRenderer) {
		      renderer = column.headerRenderer;
		    } else {
		      var headerCellType = this.getHeaderCellType(column);
		      switch (headerCellType) {
		        case HeaderCellType.SORTABLE:
		          renderer = this.getSortableHeaderCell(column);
		          break;
		        case HeaderCellType.FILTERABLE:
		          renderer = this.getFilterableHeaderCell();
		          break;
		        default:
		          break;
		      }
		    }
		    return renderer;
		  },
		  getStyle: function getStyle() {
		    return {
		      overflow: 'hidden',
		      width: '100%',
		      height: this.props.height,
		      position: 'absolute'
		    };
		  },
		  getCells: function getCells() {
		    var cells = [];
		    var lockedCells = [];
	
		    for (var i = 0, len = this.getSize(this.props.columns); i < len; i++) {
		      var column = this.getColumn(this.props.columns, i);
		      var _renderer = this.getHeaderRenderer(column);
		      if (column.key === 'select-row' && this.props.rowType === 'filter') {
		        _renderer = React.createElement('div', null);
		      }
		      var cell = React.createElement(HeaderCell, {
		        ref: i,
		        key: i,
		        height: this.props.height,
		        column: column,
		        renderer: _renderer,
		        resizing: this.props.resizing === column,
		        onResize: this.props.onColumnResize,
		        onResizeEnd: this.props.onColumnResizeEnd
		      });
		      if (column.locked) {
		        lockedCells.push(cell);
		      } else {
		        cells.push(cell);
		      }
		    }
	
		    return cells.concat(lockedCells);
		  },
		  setScrollLeft: function setScrollLeft(scrollLeft) {
		    var _this = this;
	
		    this.props.columns.forEach(function (column, i) {
		      if (column.locked) {
		        _this.refs[i].setScrollLeft(scrollLeft);
		      }
		    });
		  },
		  render: function render() {
		    var cellsStyle = {
		      width: this.props.width ? this.props.width + getScrollbarSize() : '100%',
		      height: this.props.height,
		      whiteSpace: 'nowrap',
		      overflowX: 'hidden',
		      overflowY: 'hidden'
		    };
	
		    var cells = this.getCells();
		    return React.createElement(
		      'div',
		      _extends({}, this.props, { className: 'react-grid-HeaderRow', onScroll: this.props.onScroll }),
		      React.createElement(
		        'div',
		        { style: cellsStyle },
		        cells
		      )
		    );
		  }
		});
	
		module.exports = HeaderRow;
	
	/***/ },
	/* 13 */
	/***/ function(module, exports) {
	
		/**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule shallowEqual
		 * @typechecks
		 * 
		 */
	
		'use strict';
	
		var hasOwnProperty = Object.prototype.hasOwnProperty;
	
		/**
		 * Performs equality by iterating through keys on an object and returning false
		 * when any key has values which are not strictly equal between the arguments.
		 * Returns true when the values of all keys are strictly equal.
		 */
		function shallowEqual(objA, objB) {
		  if (objA === objB) {
		    return true;
		  }
	
		  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
		    return false;
		  }
	
		  var keysA = Object.keys(objA);
		  var keysB = Object.keys(objB);
	
		  if (keysA.length !== keysB.length) {
		    return false;
		  }
	
		  // Test for A's keys different from B.
		  var bHasOwnProperty = hasOwnProperty.bind(objB);
		  for (var i = 0; i < keysA.length; i++) {
		    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
		      return false;
		    }
		  }
	
		  return true;
		}
	
		module.exports = shallowEqual;
	
	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
		var ReactDOM = __webpack_require__(3);
		var joinClasses = __webpack_require__(6);
		var ExcelColumn = __webpack_require__(15);
		var ResizeHandle = __webpack_require__(16);
		var PropTypes = React.PropTypes;
	
		function simpleCellRenderer(objArgs) {
		  return React.createElement(
		    'div',
		    { className: 'widget-HeaderCell__value' },
		    objArgs.column.name
		  );
		}
	
		var HeaderCell = React.createClass({
		  displayName: 'HeaderCell',
	
	
		  propTypes: {
		    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
		    column: PropTypes.shape(ExcelColumn).isRequired,
		    onResize: PropTypes.func.isRequired,
		    height: PropTypes.number.isRequired,
		    onResizeEnd: PropTypes.func.isRequired,
		    className: PropTypes.string
		  },
	
		  getDefaultProps: function getDefaultProps() {
		    return {
		      renderer: simpleCellRenderer
		    };
		  },
		  getInitialState: function getInitialState() {
		    return { resizing: false };
		  },
		  onDragStart: function onDragStart(e) {
		    this.setState({ resizing: true });
		    // need to set dummy data for FF
		    if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
		  },
		  onDrag: function onDrag(e) {
		    var resize = this.props.onResize || null; // for flows sake, doesnt recognise a null check direct
		    if (resize) {
		      var _width = this.getWidthFromMouseEvent(e);
		      if (_width > 0) {
		        resize(this.props.column, _width);
		      }
		    }
		  },
		  onDragEnd: function onDragEnd(e) {
		    var width = this.getWidthFromMouseEvent(e);
		    this.props.onResizeEnd(this.props.column, width);
		    this.setState({ resizing: false });
		  },
		  getWidthFromMouseEvent: function getWidthFromMouseEvent(e) {
		    var right = e.pageX || e.touches && e.touches[0] && e.touches[0].pageX || e.changedTouches && e.changedTouches[e.changedTouches.length - 1].pageX;
		    var left = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
		    return right - left;
		  },
		  getCell: function getCell() {
		    if (React.isValidElement(this.props.renderer)) {
		      return React.cloneElement(this.props.renderer, { column: this.props.column, height: this.props.height });
		    }
	
		    return this.props.renderer({ column: this.props.column });
		  },
		  getStyle: function getStyle() {
		    return {
		      width: this.props.column.width,
		      left: this.props.column.left,
		      display: 'inline-block',
		      position: 'absolute',
		      overflow: 'hidden',
		      height: this.props.height,
		      margin: 0,
		      textOverflow: 'ellipsis',
		      whiteSpace: 'nowrap'
		    };
		  },
		  setScrollLeft: function setScrollLeft(scrollLeft) {
		    var node = ReactDOM.findDOMNode(this);
		    node.style.webkitTransform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
		    node.style.transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
		  },
		  render: function render() {
		    var resizeHandle = void 0;
		    if (this.props.column.resizable) {
		      resizeHandle = React.createElement(ResizeHandle, {
		        onDrag: this.onDrag,
		        onDragStart: this.onDragStart,
		        onDragEnd: this.onDragEnd
		      });
		    }
		    var className = joinClasses({
		      'react-grid-HeaderCell': true,
		      'react-grid-HeaderCell--resizing': this.state.resizing,
		      'react-grid-HeaderCell--locked': this.props.column.locked
		    });
		    className = joinClasses(className, this.props.className, this.props.column.cellClass);
		    var cell = this.getCell();
		    return React.createElement(
		      'div',
		      { className: className, style: this.getStyle() },
		      cell,
		      resizeHandle
		    );
		  }
		});
	
		module.exports = HeaderCell;
	
	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
	
		var ExcelColumnShape = {
		  name: React.PropTypes.node.isRequired,
		  key: React.PropTypes.string.isRequired,
		  width: React.PropTypes.number.isRequired,
		  filterable: React.PropTypes.bool
		};
	
		module.exports = ExcelColumnShape;
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var React = __webpack_require__(2);
		var Draggable = __webpack_require__(17);
	
		var ResizeHandle = React.createClass({
		  displayName: 'ResizeHandle',
	
		  style: {
		    position: 'absolute',
		    top: 0,
		    right: 0,
		    width: 6,
		    height: '100%'
		  },
	
		  render: function render() {
		    return React.createElement(Draggable, _extends({}, this.props, {
		      className: 'react-grid-HeaderCell__resizeHandle',
		      style: this.style
		    }));
		  }
		});
	
		module.exports = ResizeHandle;
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var React = __webpack_require__(2);
		var PropTypes = React.PropTypes;
	
		var Draggable = React.createClass({
		  displayName: 'Draggable',
	
		  propTypes: {
		    onDragStart: PropTypes.func,
		    onDragEnd: PropTypes.func,
		    onDrag: PropTypes.func,
		    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor])
		  },
	
		  getDefaultProps: function getDefaultProps() {
		    return {
		      onDragStart: function onDragStart() {
		        return true;
		      },
		      onDragEnd: function onDragEnd() {},
		      onDrag: function onDrag() {}
		    };
		  },
		  getInitialState: function getInitialState() {
		    return {
		      drag: null
		    };
		  },
		  componentWillUnmount: function componentWillUnmount() {
		    this.cleanUp();
		  },
		  onMouseDown: function onMouseDown(e) {
		    var drag = this.props.onDragStart(e);
	
		    if (drag === null && e.button !== 0) {
		      return;
		    }
	
		    window.addEventListener('mouseup', this.onMouseUp);
		    window.addEventListener('mousemove', this.onMouseMove);
		    window.addEventListener('touchend', this.onMouseUp);
		    window.addEventListener('touchmove', this.onMouseMove);
	
		    this.setState({ drag: drag });
		  },
		  onMouseMove: function onMouseMove(e) {
		    if (this.state.drag === null) {
		      return;
		    }
	
		    if (e.preventDefault) {
		      e.preventDefault();
		    }
	
		    this.props.onDrag(e);
		  },
		  onMouseUp: function onMouseUp(e) {
		    this.cleanUp();
		    this.props.onDragEnd(e, this.state.drag);
		    this.setState({ drag: null });
		  },
		  cleanUp: function cleanUp() {
		    window.removeEventListener('mouseup', this.onMouseUp);
		    window.removeEventListener('mousemove', this.onMouseMove);
		    window.removeEventListener('touchend', this.onMouseUp);
		    window.removeEventListener('touchmove', this.onMouseMove);
		  },
		  render: function render() {
		    return React.createElement('div', _extends({}, this.props, {
		      onMouseDown: this.onMouseDown,
		      onTouchStart: this.onMouseDown,
		      className: 'react-grid-HeaderCell__draggable' }));
		  }
		});
	
		module.exports = Draggable;
	
	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
		var joinClasses = __webpack_require__(6);
		var DEFINE_SORT = {
		  ASC: 'ASC',
		  DESC: 'DESC',
		  NONE: 'NONE'
		};
	
		var SortableHeaderCell = React.createClass({
		  displayName: 'SortableHeaderCell',
	
		  propTypes: {
		    columnKey: React.PropTypes.string.isRequired,
		    column: React.PropTypes.shape({ name: React.PropTypes.node }),
		    onSort: React.PropTypes.func.isRequired,
		    sortDirection: React.PropTypes.oneOf(['ASC', 'DESC', 'NONE'])
		  },
	
		  onClick: function onClick() {
		    var direction = void 0;
		    switch (this.props.sortDirection) {
		      default:
		      case null:
		      case undefined:
		      case DEFINE_SORT.NONE:
		        direction = DEFINE_SORT.ASC;
		        break;
		      case DEFINE_SORT.ASC:
		        direction = DEFINE_SORT.DESC;
		        break;
		      case DEFINE_SORT.DESC:
		        direction = DEFINE_SORT.NONE;
		        break;
		    }
		    this.props.onSort(this.props.columnKey, direction);
		  },
	
		  getSortByText: function getSortByText() {
		    var unicodeKeys = {
		      ASC: '9650',
		      DESC: '9660',
		      NONE: ''
		    };
		    return String.fromCharCode(unicodeKeys[this.props.sortDirection]);
		  },
	
		  render: function render() {
		    var className = joinClasses({
		      'react-grid-HeaderCell-sortable': true,
		      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
		      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
		    });
	
		    return React.createElement(
		      'div',
		      { className: className,
		        onClick: this.onClick,
		        style: { cursor: 'pointer' } },
		      this.props.column.name,
		      React.createElement(
		        'span',
		        { className: 'pull-right' },
		        this.getSortByText()
		      )
		    );
		  }
		});
	
		module.exports = SortableHeaderCell;
	
	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
		var ExcelColumn = __webpack_require__(15);
	
		var FilterableHeaderCell = React.createClass({
		  displayName: 'FilterableHeaderCell',
	
	
		  propTypes: {
		    onChange: React.PropTypes.func.isRequired,
		    column: React.PropTypes.shape(ExcelColumn)
		  },
	
		  getInitialState: function getInitialState() {
		    return { filterTerm: '' };
		  },
		  handleChange: function handleChange(e) {
		    var val = e.target.value;
		    this.setState({ filterTerm: val });
		    this.props.onChange({ filterTerm: val, columnKey: this.props.column.key });
		  },
	
	
		  renderInput: function renderInput() {
		    if (this.props.column.filterable === false) {
		      return React.createElement('span', null);
		    }
	
		    var inputKey = 'header-filter-' + this.props.column.key;
		    return React.createElement('input', { key: inputKey, type: 'text', className: 'form-control input-sm', placeholder: 'Search', value: this.state.filterTerm, onChange: this.handleChange });
		  },
	
		  render: function render() {
		    return React.createElement(
		      'div',
		      null,
		      React.createElement(
		        'div',
		        { className: 'form-group' },
		        this.renderInput()
		      )
		    );
		  }
		});
	
		module.exports = FilterableHeaderCell;
	
	/***/ },
	/* 20 */
	/***/ function(module, exports) {
	
		"use strict";
	
		var HeaderCellType = {
		  SORTABLE: 0,
		  FILTERABLE: 1,
		  NONE: 2,
		  CHECKBOX: 3
		};
	
		module.exports = HeaderCellType;
	
	/***/ },
	/* 21 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
		var Canvas = __webpack_require__(22);
		var ViewportScroll = __webpack_require__(96);
		var cellMetaDataShape = __webpack_require__(94);
		var PropTypes = React.PropTypes;
	
		var Viewport = React.createClass({
		  displayName: 'Viewport',
	
		  mixins: [ViewportScroll],
	
		  propTypes: {
		    rowOffsetHeight: PropTypes.number.isRequired,
		    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
		    columnMetrics: PropTypes.object.isRequired,
		    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
		    selectedRows: PropTypes.array,
		    expandedRows: PropTypes.array,
		    rowRenderer: PropTypes.func,
		    rowsCount: PropTypes.number.isRequired,
		    rowHeight: PropTypes.number.isRequired,
		    onRows: PropTypes.func,
		    onScroll: PropTypes.func,
		    minHeight: PropTypes.number,
		    cellMetaData: PropTypes.shape(cellMetaDataShape),
		    rowKey: PropTypes.string.isRequired,
		    rowScrollTimeout: PropTypes.number,
		    contextMenu: PropTypes.element
		  },
	
		  onScroll: function onScroll(scroll) {
		    this.updateScroll(scroll.scrollTop, scroll.scrollLeft, this.state.height, this.props.rowHeight, this.props.rowsCount);
	
		    if (this.props.onScroll) {
		      this.props.onScroll({ scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft });
		    }
		  },
		  getScroll: function getScroll() {
		    return this.refs.canvas.getScroll();
		  },
		  setScrollLeft: function setScrollLeft(scrollLeft) {
		    this.refs.canvas.setScrollLeft(scrollLeft);
		  },
		  render: function render() {
		    var style = {
		      padding: 0,
		      bottom: 0,
		      left: 0,
		      right: 0,
		      overflow: 'hidden',
		      position: 'absolute',
		      top: this.props.rowOffsetHeight
		    };
		    return React.createElement(
		      'div',
		      {
		        className: 'react-grid-Viewport',
		        style: style },
		      React.createElement(Canvas, {
		        ref: 'canvas',
		        rowKey: this.props.rowKey,
		        totalWidth: this.props.totalWidth,
		        width: this.props.columnMetrics.width,
		        rowGetter: this.props.rowGetter,
		        rowsCount: this.props.rowsCount,
		        selectedRows: this.props.selectedRows,
		        expandedRows: this.props.expandedRows,
		        columns: this.props.columnMetrics.columns,
		        rowRenderer: this.props.rowRenderer,
		        displayStart: this.state.displayStart,
		        displayEnd: this.state.displayEnd,
		        cellMetaData: this.props.cellMetaData,
		        height: this.state.height,
		        rowHeight: this.props.rowHeight,
		        onScroll: this.onScroll,
		        onRows: this.props.onRows,
		        rowScrollTimeout: this.props.rowScrollTimeout,
		        contextMenu: this.props.contextMenu
		      })
		    );
		  }
		});
	
		module.exports = Viewport;
	
	/***/ },
	/* 22 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _shallowEqual = __webpack_require__(13);
	
		var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
		var _RowsContainer = __webpack_require__(23);
	
		var _RowsContainer2 = _interopRequireDefault(_RowsContainer);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var React = __webpack_require__(2);
		var ReactDOM = __webpack_require__(3);
		var joinClasses = __webpack_require__(6);
		var PropTypes = React.PropTypes;
		var ScrollShim = __webpack_require__(86);
		var Row = __webpack_require__(87);
		var cellMetaDataShape = __webpack_require__(94);
	
	
		var Canvas = React.createClass({
		  displayName: 'Canvas',
	
		  mixins: [ScrollShim],
	
		  propTypes: {
		    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
		    rowHeight: PropTypes.number.isRequired,
		    height: PropTypes.number.isRequired,
		    width: PropTypes.number,
		    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		    style: PropTypes.string,
		    className: PropTypes.string,
		    displayStart: PropTypes.number.isRequired,
		    displayEnd: PropTypes.number.isRequired,
		    rowsCount: PropTypes.number.isRequired,
		    rowGetter: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.array.isRequired]),
		    expandedRows: PropTypes.array,
		    onRows: PropTypes.func,
		    onScroll: PropTypes.func,
		    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
		    cellMetaData: PropTypes.shape(cellMetaDataShape).isRequired,
		    selectedRows: PropTypes.array,
		    rowKey: React.PropTypes.string,
		    rowScrollTimeout: React.PropTypes.number,
		    contextMenu: PropTypes.element
		  },
	
		  getDefaultProps: function getDefaultProps() {
		    return {
		      rowRenderer: Row,
		      onRows: function onRows() {},
		      selectedRows: [],
		      rowScrollTimeout: 0
		    };
		  },
		  getInitialState: function getInitialState() {
		    return {
		      displayStart: this.props.displayStart,
		      displayEnd: this.props.displayEnd,
		      scrollingTimeout: null
		    };
		  },
		  componentWillMount: function componentWillMount() {
		    this._currentRowsLength = 0;
		    this._currentRowsRange = { start: 0, end: 0 };
		    this._scroll = { scrollTop: 0, scrollLeft: 0 };
		  },
		  componentDidMount: function componentDidMount() {
		    this.onRows();
		  },
		  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		    if (nextProps.displayStart !== this.state.displayStart || nextProps.displayEnd !== this.state.displayEnd) {
		      this.setState({
		        displayStart: nextProps.displayStart,
		        displayEnd: nextProps.displayEnd
		      });
		    }
		  },
		  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		    var shouldUpdate = nextState.displayStart !== this.state.displayStart || nextState.displayEnd !== this.state.displayEnd || nextState.scrollingTimeout !== this.state.scrollingTimeout || nextProps.rowsCount !== this.props.rowsCount || nextProps.rowHeight !== this.props.rowHeight || nextProps.columns !== this.props.columns || nextProps.width !== this.props.width || nextProps.cellMetaData !== this.props.cellMetaData || !(0, _shallowEqual2['default'])(nextProps.style, this.props.style);
		    return shouldUpdate;
		  },
		  componentWillUnmount: function componentWillUnmount() {
		    this._currentRowsLength = 0;
		    this._currentRowsRange = { start: 0, end: 0 };
		    this._scroll = { scrollTop: 0, scrollLeft: 0 };
		  },
		  componentDidUpdate: function componentDidUpdate() {
		    if (this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0) {
		      this.setScrollLeft(this._scroll.scrollLeft);
		    }
		    this.onRows();
		  },
		  onRows: function onRows() {
		    if (this._currentRowsRange !== { start: 0, end: 0 }) {
		      this.props.onRows(this._currentRowsRange);
		      this._currentRowsRange = { start: 0, end: 0 };
		    }
		  },
		  onScroll: function onScroll(e) {
		    var _this = this;
	
		    if (ReactDOM.findDOMNode(this) !== e.target) {
		      return;
		    }
		    this.appendScrollShim();
		    var scrollLeft = e.target.scrollLeft;
		    var scrollTop = e.target.scrollTop;
		    var scroll = { scrollTop: scrollTop, scrollLeft: scrollLeft };
		    // check how far we have scrolled, and if this means we are being taken out of range
		    var scrollYRange = Math.abs(this._scroll.scrollTop - scroll.scrollTop) / this.props.rowHeight;
		    var scrolledOutOfRange = scrollYRange > this.props.displayEnd - this.props.displayStart;
	
		    this._scroll = scroll;
		    this.props.onScroll(scroll);
		    // if we go out of range, we queue the actual render, just rendering cheap placeholders
		    // avoiding rendering anything expensive while a user scrolls down
		    if (scrolledOutOfRange && this.props.rowScrollTimeout > 0) {
		      var scrollTO = this.state.scrollingTimeout;
		      if (scrollTO) {
		        clearTimeout(scrollTO);
		      }
		      // queue up, and set state to clear the TO so we render the rows (not placeholders)
		      scrollTO = setTimeout(function () {
		        if (_this.state.scrollingTimeout !== null) {
		          _this.setState({ scrollingTimeout: null });
		        }
		      }, this.props.rowScrollTimeout);
	
		      this.setState({ scrollingTimeout: scrollTO });
		    }
		  },
		  getRows: function getRows(displayStart, displayEnd) {
		    this._currentRowsRange = { start: displayStart, end: displayEnd };
		    if (Array.isArray(this.props.rowGetter)) {
		      return this.props.rowGetter.slice(displayStart, displayEnd);
		    }
	
		    var rows = [];
		    for (var i = displayStart; i < displayEnd; i++) {
		      rows.push(this.props.rowGetter(i));
		    }
		    return rows;
		  },
		  getScrollbarWidth: function getScrollbarWidth() {
		    var scrollbarWidth = 0;
		    // Get the scrollbar width
		    var canvas = ReactDOM.findDOMNode(this);
		    scrollbarWidth = canvas.offsetWidth - canvas.clientWidth;
		    return scrollbarWidth;
		  },
		  getScroll: function getScroll() {
		    var _ReactDOM$findDOMNode = ReactDOM.findDOMNode(this);
	
		    var scrollTop = _ReactDOM$findDOMNode.scrollTop;
		    var scrollLeft = _ReactDOM$findDOMNode.scrollLeft;
	
		    return { scrollTop: scrollTop, scrollLeft: scrollLeft };
		  },
		  isRowSelected: function isRowSelected(row) {
		    var _this2 = this;
	
		    var selectedRows = this.props.selectedRows.filter(function (r) {
		      var rowKeyValue = row.get ? row.get(_this2.props.rowKey) : row[_this2.props.rowKey];
		      return r[_this2.props.rowKey] === rowKeyValue;
		    });
		    return selectedRows.length > 0 && selectedRows[0].isSelected;
		  },
	
	
		  _currentRowsLength: 0,
		  _currentRowsRange: { start: 0, end: 0 },
		  _scroll: { scrollTop: 0, scrollLeft: 0 },
	
		  setScrollLeft: function setScrollLeft(scrollLeft) {
		    if (this._currentRowsLength !== 0) {
		      if (!this.refs) return;
		      for (var i = 0, len = this._currentRowsLength; i < len; i++) {
		        if (this.refs[i] && this.refs[i].setScrollLeft) {
		          this.refs[i].setScrollLeft(scrollLeft);
		        }
		      }
		    }
		  },
		  renderRow: function renderRow(props) {
		    if (this.state.scrollingTimeout !== null) {
		      // in the midst of a rapid scroll, so we render placeholders
		      // the actual render is then queued (through a timeout)
		      // this avoids us redering a bunch of rows that a user is trying to scroll past
		      return this.renderScrollingPlaceholder(props);
		    }
		    var RowsRenderer = this.props.rowRenderer;
		    if (typeof RowsRenderer === 'function') {
		      return React.createElement(RowsRenderer, props);
		    }
	
		    if (React.isValidElement(this.props.rowRenderer)) {
		      return React.cloneElement(this.props.rowRenderer, props);
		    }
		  },
		  renderScrollingPlaceholder: function renderScrollingPlaceholder(props) {
		    // here we are just rendering empty cells
		    // we may want to allow a user to inject this, and/or just render the cells that are in view
		    // for now though we essentially are doing a (very lightweight) row + cell with empty content
		    var styles = {
		      row: { height: props.height, overflow: 'hidden' },
		      cell: { height: props.height, position: 'absolute' },
		      placeholder: { backgroundColor: 'rgba(211, 211, 211, 0.45)', width: '60%', height: Math.floor(props.height * 0.3) }
		    };
		    return React.createElement(
		      'div',
		      { key: props.key, style: styles.row, className: 'react-grid-Row' },
		      this.props.columns.map(function (col, idx) {
		        return React.createElement(
		          'div',
		          { style: Object.assign(styles.cell, { width: col.width, left: col.left }), key: idx, className: 'react-grid-Cell' },
		          React.createElement('div', { style: Object.assign(styles.placeholder, { width: Math.floor(col.width * 0.6) }) })
		        );
		      })
		    );
		  },
		  renderPlaceholder: function renderPlaceholder(key, height) {
		    // just renders empty cells
		    // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
		    return React.createElement(
		      'div',
		      { key: key, style: { height: height } },
		      this.props.columns.map(function (column, idx) {
		        return React.createElement('div', { style: { width: column.width }, key: idx });
		      })
		    );
		  },
		  render: function render() {
		    var _this3 = this;
	
		    var displayStart = this.state.displayStart;
		    var displayEnd = this.state.displayEnd;
		    var rowHeight = this.props.rowHeight;
		    var length = this.props.rowsCount;
	
		    var rows = this.getRows(displayStart, displayEnd).map(function (row, idx) {
		      return _this3.renderRow({
		        key: displayStart + idx,
		        ref: idx,
		        idx: displayStart + idx,
		        row: row,
		        height: rowHeight,
		        columns: _this3.props.columns,
		        isSelected: _this3.isRowSelected(row),
		        expandedRows: _this3.props.expandedRows,
		        cellMetaData: _this3.props.cellMetaData
		      });
		    });
	
		    this._currentRowsLength = rows.length;
	
		    if (displayStart > 0) {
		      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
		    }
	
		    if (length - displayEnd > 0) {
		      rows.push(this.renderPlaceholder('bottom', (length - displayEnd) * rowHeight));
		    }
	
		    var style = {
		      position: 'absolute',
		      top: 0,
		      left: 0,
		      overflowX: 'auto',
		      overflowY: 'scroll',
		      width: this.props.totalWidth,
		      height: this.props.height,
		      transform: 'translate3d(0, 0, 0)'
		    };
	
		    return React.createElement(
		      'div',
		      {
		        style: style,
		        onScroll: this.onScroll,
		        className: joinClasses('react-grid-Canvas', this.props.className, { opaque: this.props.cellMetaData.selected && this.props.cellMetaData.selected.active }) },
		      React.createElement(_RowsContainer2['default'], {
		        width: this.props.width,
		        rows: rows,
		        contextMenu: this.props.contextMenu,
		        rowIdx: this.props.cellMetaData.selected.rowIdx,
		        idx: this.props.cellMetaData.selected.idx })
		    );
		  }
		});
	
		module.exports = Canvas;
	
	/***/ },
	/* 23 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.ContextMenuRowsContainer = exports.SimpleRowsContainer = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _reactContextmenu = __webpack_require__(24);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var RowsContainer = function (_React$Component) {
		  _inherits(RowsContainer, _React$Component);
	
		  function RowsContainer() {
		    _classCallCheck(this, RowsContainer);
	
		    return _possibleConstructorReturn(this, Object.getPrototypeOf(RowsContainer).apply(this, arguments));
		  }
	
		  _createClass(RowsContainer, [{
		    key: 'hasContextMenu',
		    value: function hasContextMenu() {
		      return this.props.contextMenu && _react2['default'].isValidElement(this.props.contextMenu);
		    }
		  }, {
		    key: 'renderRowsWithContextMenu',
		    value: function renderRowsWithContextMenu() {
		      var newProps = { rowIdx: this.props.rowIdx, idx: this.props.idx };
		      var contextMenu = _react2['default'].cloneElement(this.props.contextMenu, newProps);
		      return _react2['default'].createElement(
		        'div',
		        null,
		        _react2['default'].createElement(ContextMenuRowsContainer, this.props),
		        contextMenu
		      );
		    }
		  }, {
		    key: 'render',
		    value: function render() {
		      return this.hasContextMenu() ? this.renderRowsWithContextMenu() : _react2['default'].createElement(SimpleRowsContainer, this.props);
		    }
		  }]);
	
		  return RowsContainer;
		}(_react2['default'].Component);
	
		RowsContainer.propTypes = {
		  contextMenu: _react.PropTypes.element,
		  rowIdx: _react.PropTypes.number,
		  idx: _react.PropTypes.number
		};
	
		var SimpleRowsContainer = function (_React$Component2) {
		  _inherits(SimpleRowsContainer, _React$Component2);
	
		  function SimpleRowsContainer() {
		    _classCallCheck(this, SimpleRowsContainer);
	
		    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleRowsContainer).apply(this, arguments));
		  }
	
		  _createClass(SimpleRowsContainer, [{
		    key: 'render',
		    value: function render() {
		      return _react2['default'].createElement(
		        'div',
		        { style: { width: this.props.width, overflow: 'hidden' } },
		        this.props.rows
		      );
		    }
		  }]);
	
		  return SimpleRowsContainer;
		}(_react2['default'].Component);
	
		SimpleRowsContainer.propTypes = {
		  width: _react.PropTypes.number,
		  rows: _react.PropTypes.array
		};
	
		var ContextMenuRowsContainer = (0, _reactContextmenu.ContextMenuLayer)('reactDataGridContextMenu')(SimpleRowsContainer);
	
		exports['default'] = RowsContainer;
		exports.SimpleRowsContainer = SimpleRowsContainer;
		exports.ContextMenuRowsContainer = ContextMenuRowsContainer;
	
	/***/ },
	/* 24 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _contextMenu = __webpack_require__(25);
	
		Object.defineProperty(exports, "ContextMenu", {
		  enumerable: true,
		  get: function get() {
		    return _interopRequireDefault(_contextMenu).default;
		  }
		});
	
		var _contextmenuLayer = __webpack_require__(78);
	
		Object.defineProperty(exports, "ContextMenuLayer", {
		  enumerable: true,
		  get: function get() {
		    return _interopRequireDefault(_contextmenuLayer).default;
		  }
		});
	
		var _menuItem = __webpack_require__(81);
	
		Object.defineProperty(exports, "MenuItem", {
		  enumerable: true,
		  get: function get() {
		    return _interopRequireDefault(_menuItem).default;
		  }
		});
	
		var _monitor = __webpack_require__(44);
	
		Object.defineProperty(exports, "monitor", {
		  enumerable: true,
		  get: function get() {
		    return _interopRequireDefault(_monitor).default;
		  }
		});
	
		var _submenu = __webpack_require__(83);
	
		Object.defineProperty(exports, "SubMenu", {
		  enumerable: true,
		  get: function get() {
		    return _interopRequireDefault(_submenu).default;
		  }
		});
	
		var _connect = __webpack_require__(85);
	
		Object.defineProperty(exports, "connect", {
		  enumerable: true,
		  get: function get() {
		    return _interopRequireDefault(_connect).default;
		  }
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/***/ },
	/* 25 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _store = __webpack_require__(26);
	
		var _store2 = _interopRequireDefault(_store);
	
		var _wrapper = __webpack_require__(43);
	
		var _wrapper2 = _interopRequireDefault(_wrapper);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		var PropTypes = _react2.default.PropTypes;
	
	
		var ContextMenu = _react2.default.createClass({
		    displayName: "ContextMenu",
		    propTypes: {
		        identifier: PropTypes.string.isRequired
		    },
		    getInitialState: function getInitialState() {
		        return _store2.default.getState();
		    },
		    componentDidMount: function componentDidMount() {
		        this.unsubscribe = _store2.default.subscribe(this.handleUpdate);
		    },
		    componentWillUnmount: function componentWillUnmount() {
		        if (this.unsubscribe) this.unsubscribe();
		    },
		    handleUpdate: function handleUpdate() {
		        this.setState(this.getInitialState());
		    },
		    render: function render() {
		        return _react2.default.createElement(_wrapper2.default, _extends({}, this.props, this.state));
		    }
		});
	
		exports.default = ContextMenu;
	
	/***/ },
	/* 26 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _redux = __webpack_require__(27);
	
		var _reducers = __webpack_require__(41);
	
		var _reducers2 = _interopRequireDefault(_reducers);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		exports.default = (0, _redux.createStore)(_reducers2.default);
	
	/***/ },
	/* 27 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
		exports.__esModule = true;
		exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;
	
		var _createStore = __webpack_require__(29);
	
		var _createStore2 = _interopRequireDefault(_createStore);
	
		var _combineReducers = __webpack_require__(36);
	
		var _combineReducers2 = _interopRequireDefault(_combineReducers);
	
		var _bindActionCreators = __webpack_require__(38);
	
		var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);
	
		var _applyMiddleware = __webpack_require__(39);
	
		var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
	
		var _compose = __webpack_require__(40);
	
		var _compose2 = _interopRequireDefault(_compose);
	
		var _warning = __webpack_require__(37);
	
		var _warning2 = _interopRequireDefault(_warning);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
		/*
		* This is a dummy function to check if the function name has been altered by minification.
		* If the function has been minified and NODE_ENV !== 'production', warn the user.
		*/
		function isCrushed() {}
	
		if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
		  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
		}
	
		exports.createStore = _createStore2["default"];
		exports.combineReducers = _combineReducers2["default"];
		exports.bindActionCreators = _bindActionCreators2["default"];
		exports.applyMiddleware = _applyMiddleware2["default"];
		exports.compose = _compose2["default"];
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))
	
	/***/ },
	/* 28 */
	/***/ function(module, exports) {
	
		// shim for using process in browser
	
		var process = module.exports = {};
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;
	
		function cleanUpNextTick() {
		    if (!draining || !currentQueue) {
		        return;
		    }
		    draining = false;
		    if (currentQueue.length) {
		        queue = currentQueue.concat(queue);
		    } else {
		        queueIndex = -1;
		    }
		    if (queue.length) {
		        drainQueue();
		    }
		}
	
		function drainQueue() {
		    if (draining) {
		        return;
		    }
		    var timeout = setTimeout(cleanUpNextTick);
		    draining = true;
	
		    var len = queue.length;
		    while(len) {
		        currentQueue = queue;
		        queue = [];
		        while (++queueIndex < len) {
		            if (currentQueue) {
		                currentQueue[queueIndex].run();
		            }
		        }
		        queueIndex = -1;
		        len = queue.length;
		    }
		    currentQueue = null;
		    draining = false;
		    clearTimeout(timeout);
		}
	
		process.nextTick = function (fun) {
		    var args = new Array(arguments.length - 1);
		    if (arguments.length > 1) {
		        for (var i = 1; i < arguments.length; i++) {
		            args[i - 1] = arguments[i];
		        }
		    }
		    queue.push(new Item(fun, args));
		    if (queue.length === 1 && !draining) {
		        setTimeout(drainQueue, 0);
		    }
		};
	
		// v8 likes predictible objects
		function Item(fun, array) {
		    this.fun = fun;
		    this.array = array;
		}
		Item.prototype.run = function () {
		    this.fun.apply(null, this.array);
		};
		process.title = 'browser';
		process.browser = true;
		process.env = {};
		process.argv = [];
		process.version = ''; // empty string to avoid regexp issues
		process.versions = {};
	
		function noop() {}
	
		process.on = noop;
		process.addListener = noop;
		process.once = noop;
		process.off = noop;
		process.removeListener = noop;
		process.removeAllListeners = noop;
		process.emit = noop;
	
		process.binding = function (name) {
		    throw new Error('process.binding is not supported');
		};
	
		process.cwd = function () { return '/' };
		process.chdir = function (dir) {
		    throw new Error('process.chdir is not supported');
		};
		process.umask = function() { return 0; };
	
	
	/***/ },
	/* 29 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
		exports.ActionTypes = undefined;
		exports["default"] = createStore;
	
		var _isPlainObject = __webpack_require__(30);
	
		var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
		var _symbolObservable = __webpack_require__(34);
	
		var _symbolObservable2 = _interopRequireDefault(_symbolObservable);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
		/**
		 * These are private action types reserved by Redux.
		 * For any unknown actions, you must return the current state.
		 * If the current state is undefined, you must return the initial state.
		 * Do not reference these action types directly in your code.
		 */
		var ActionTypes = exports.ActionTypes = {
		  INIT: '@@redux/INIT'
		};
	
		/**
		 * Creates a Redux store that holds the state tree.
		 * The only way to change the data in the store is to call `dispatch()` on it.
		 *
		 * There should only be a single store in your app. To specify how different
		 * parts of the state tree respond to actions, you may combine several reducers
		 * into a single reducer function by using `combineReducers`.
		 *
		 * @param {Function} reducer A function that returns the next state tree, given
		 * the current state tree and the action to handle.
		 *
		 * @param {any} [initialState] The initial state. You may optionally specify it
		 * to hydrate the state from the server in universal apps, or to restore a
		 * previously serialized user session.
		 * If you use `combineReducers` to produce the root reducer function, this must be
		 * an object with the same shape as `combineReducers` keys.
		 *
		 * @param {Function} enhancer The store enhancer. You may optionally specify it
		 * to enhance the store with third-party capabilities such as middleware,
		 * time travel, persistence, etc. The only store enhancer that ships with Redux
		 * is `applyMiddleware()`.
		 *
		 * @returns {Store} A Redux store that lets you read the state, dispatch actions
		 * and subscribe to changes.
		 */
		function createStore(reducer, initialState, enhancer) {
		  var _ref2;
	
		  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
		    enhancer = initialState;
		    initialState = undefined;
		  }
	
		  if (typeof enhancer !== 'undefined') {
		    if (typeof enhancer !== 'function') {
		      throw new Error('Expected the enhancer to be a function.');
		    }
	
		    return enhancer(createStore)(reducer, initialState);
		  }
	
		  if (typeof reducer !== 'function') {
		    throw new Error('Expected the reducer to be a function.');
		  }
	
		  var currentReducer = reducer;
		  var currentState = initialState;
		  var currentListeners = [];
		  var nextListeners = currentListeners;
		  var isDispatching = false;
	
		  function ensureCanMutateNextListeners() {
		    if (nextListeners === currentListeners) {
		      nextListeners = currentListeners.slice();
		    }
		  }
	
		  /**
		   * Reads the state tree managed by the store.
		   *
		   * @returns {any} The current state tree of your application.
		   */
		  function getState() {
		    return currentState;
		  }
	
		  /**
		   * Adds a change listener. It will be called any time an action is dispatched,
		   * and some part of the state tree may potentially have changed. You may then
		   * call `getState()` to read the current state tree inside the callback.
		   *
		   * You may call `dispatch()` from a change listener, with the following
		   * caveats:
		   *
		   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
		   * If you subscribe or unsubscribe while the listeners are being invoked, this
		   * will not have any effect on the `dispatch()` that is currently in progress.
		   * However, the next `dispatch()` call, whether nested or not, will use a more
		   * recent snapshot of the subscription list.
		   *
		   * 2. The listener should not expect to see all state changes, as the state
		   * might have been updated multiple times during a nested `dispatch()` before
		   * the listener is called. It is, however, guaranteed that all subscribers
		   * registered before the `dispatch()` started will be called with the latest
		   * state by the time it exits.
		   *
		   * @param {Function} listener A callback to be invoked on every dispatch.
		   * @returns {Function} A function to remove this change listener.
		   */
		  function subscribe(listener) {
		    if (typeof listener !== 'function') {
		      throw new Error('Expected listener to be a function.');
		    }
	
		    var isSubscribed = true;
	
		    ensureCanMutateNextListeners();
		    nextListeners.push(listener);
	
		    return function unsubscribe() {
		      if (!isSubscribed) {
		        return;
		      }
	
		      isSubscribed = false;
	
		      ensureCanMutateNextListeners();
		      var index = nextListeners.indexOf(listener);
		      nextListeners.splice(index, 1);
		    };
		  }
	
		  /**
		   * Dispatches an action. It is the only way to trigger a state change.
		   *
		   * The `reducer` function, used to create the store, will be called with the
		   * current state tree and the given `action`. Its return value will
		   * be considered the **next** state of the tree, and the change listeners
		   * will be notified.
		   *
		   * The base implementation only supports plain object actions. If you want to
		   * dispatch a Promise, an Observable, a thunk, or something else, you need to
		   * wrap your store creating function into the corresponding middleware. For
		   * example, see the documentation for the `redux-thunk` package. Even the
		   * middleware will eventually dispatch plain object actions using this method.
		   *
		   * @param {Object} action A plain object representing “what changed”. It is
		   * a good idea to keep actions serializable so you can record and replay user
		   * sessions, or use the time travelling `redux-devtools`. An action must have
		   * a `type` property which may not be `undefined`. It is a good idea to use
		   * string constants for action types.
		   *
		   * @returns {Object} For convenience, the same action object you dispatched.
		   *
		   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
		   * return something else (for example, a Promise you can await).
		   */
		  function dispatch(action) {
		    if (!(0, _isPlainObject2["default"])(action)) {
		      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
		    }
	
		    if (typeof action.type === 'undefined') {
		      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
		    }
	
		    if (isDispatching) {
		      throw new Error('Reducers may not dispatch actions.');
		    }
	
		    try {
		      isDispatching = true;
		      currentState = currentReducer(currentState, action);
		    } finally {
		      isDispatching = false;
		    }
	
		    var listeners = currentListeners = nextListeners;
		    for (var i = 0; i < listeners.length; i++) {
		      listeners[i]();
		    }
	
		    return action;
		  }
	
		  /**
		   * Replaces the reducer currently used by the store to calculate the state.
		   *
		   * You might need this if your app implements code splitting and you want to
		   * load some of the reducers dynamically. You might also need this if you
		   * implement a hot reloading mechanism for Redux.
		   *
		   * @param {Function} nextReducer The reducer for the store to use instead.
		   * @returns {void}
		   */
		  function replaceReducer(nextReducer) {
		    if (typeof nextReducer !== 'function') {
		      throw new Error('Expected the nextReducer to be a function.');
		    }
	
		    currentReducer = nextReducer;
		    dispatch({ type: ActionTypes.INIT });
		  }
	
		  /**
		   * Interoperability point for observable/reactive libraries.
		   * @returns {observable} A minimal observable of state changes.
		   * For more information, see the observable proposal:
		   * https://github.com/zenparsing/es-observable
		   */
		  function observable() {
		    var _ref;
	
		    var outerSubscribe = subscribe;
		    return _ref = {
		      /**
		       * The minimal observable subscription method.
		       * @param {Object} observer Any object that can be used as an observer.
		       * The observer object should have a `next` method.
		       * @returns {subscription} An object with an `unsubscribe` method that can
		       * be used to unsubscribe the observable from the store, and prevent further
		       * emission of values from the observable.
		       */
	
		      subscribe: function subscribe(observer) {
		        if (typeof observer !== 'object') {
		          throw new TypeError('Expected the observer to be an object.');
		        }
	
		        function observeState() {
		          if (observer.next) {
		            observer.next(getState());
		          }
		        }
	
		        observeState();
		        var unsubscribe = outerSubscribe(observeState);
		        return { unsubscribe: unsubscribe };
		      }
		    }, _ref[_symbolObservable2["default"]] = function () {
		      return this;
		    }, _ref;
		  }
	
		  // When a store is created, an "INIT" action is dispatched so that every
		  // reducer returns their initial state. This effectively populates
		  // the initial state tree.
		  dispatch({ type: ActionTypes.INIT });
	
		  return _ref2 = {
		    dispatch: dispatch,
		    subscribe: subscribe,
		    getState: getState,
		    replaceReducer: replaceReducer
		  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
		}
	
	/***/ },
	/* 30 */
	/***/ function(module, exports, __webpack_require__) {
	
		var getPrototype = __webpack_require__(31),
		    isHostObject = __webpack_require__(32),
		    isObjectLike = __webpack_require__(33);
	
		/** `Object#toString` result references. */
		var objectTag = '[object Object]';
	
		/** Used for built-in method references. */
		var objectProto = Object.prototype;
	
		/** Used to resolve the decompiled source of functions. */
		var funcToString = Function.prototype.toString;
	
		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;
	
		/** Used to infer the `Object` constructor. */
		var objectCtorString = funcToString.call(Object);
	
		/**
		 * Used to resolve the
		 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objectToString = objectProto.toString;
	
		/**
		 * Checks if `value` is a plain object, that is, an object created by the
		 * `Object` constructor or one with a `[[Prototype]]` of `null`.
		 *
		 * @static
		 * @memberOf _
		 * @since 0.8.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a plain object,
		 *  else `false`.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 * }
		 *
		 * _.isPlainObject(new Foo);
		 * // => false
		 *
		 * _.isPlainObject([1, 2, 3]);
		 * // => false
		 *
		 * _.isPlainObject({ 'x': 0, 'y': 0 });
		 * // => true
		 *
		 * _.isPlainObject(Object.create(null));
		 * // => true
		 */
		function isPlainObject(value) {
		  if (!isObjectLike(value) ||
		      objectToString.call(value) != objectTag || isHostObject(value)) {
		    return false;
		  }
		  var proto = getPrototype(value);
		  if (proto === null) {
		    return true;
		  }
		  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
		  return (typeof Ctor == 'function' &&
		    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
		}
	
		module.exports = isPlainObject;
	
	
	/***/ },
	/* 31 */
	/***/ function(module, exports) {
	
		/* Built-in method references for those with the same name as other `lodash` methods. */
		var nativeGetPrototype = Object.getPrototypeOf;
	
		/**
		 * Gets the `[[Prototype]]` of `value`.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @returns {null|Object} Returns the `[[Prototype]]`.
		 */
		function getPrototype(value) {
		  return nativeGetPrototype(Object(value));
		}
	
		module.exports = getPrototype;
	
	
	/***/ },
	/* 32 */
	/***/ function(module, exports) {
	
		/**
		 * Checks if `value` is a host object in IE < 9.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
		 */
		function isHostObject(value) {
		  // Many host objects are `Object` objects that can coerce to strings
		  // despite having improperly defined `toString` methods.
		  var result = false;
		  if (value != null && typeof value.toString != 'function') {
		    try {
		      result = !!(value + '');
		    } catch (e) {}
		  }
		  return result;
		}
	
		module.exports = isHostObject;
	
	
	/***/ },
	/* 33 */
	/***/ function(module, exports) {
	
		/**
		 * Checks if `value` is object-like. A value is object-like if it's not `null`
		 * and has a `typeof` result of "object".
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		 * @example
		 *
		 * _.isObjectLike({});
		 * // => true
		 *
		 * _.isObjectLike([1, 2, 3]);
		 * // => true
		 *
		 * _.isObjectLike(_.noop);
		 * // => false
		 *
		 * _.isObjectLike(null);
		 * // => false
		 */
		function isObjectLike(value) {
		  return !!value && typeof value == 'object';
		}
	
		module.exports = isObjectLike;
	
	
	/***/ },
	/* 34 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {/* global window */
		'use strict';
	
		module.exports = __webpack_require__(35)(global || window || this);
	
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 35 */
	/***/ function(module, exports) {
	
		'use strict';
	
		module.exports = function symbolObservablePonyfill(root) {
			var result;
			var Symbol = root.Symbol;
	
			if (typeof Symbol === 'function') {
				if (Symbol.observable) {
					result = Symbol.observable;
				} else {
					result = Symbol('observable');
					Symbol.observable = result;
				}
			} else {
				result = '@@observable';
			}
	
			return result;
		};
	
	
	/***/ },
	/* 36 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
		exports.__esModule = true;
		exports["default"] = combineReducers;
	
		var _createStore = __webpack_require__(29);
	
		var _isPlainObject = __webpack_require__(30);
	
		var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
		var _warning = __webpack_require__(37);
	
		var _warning2 = _interopRequireDefault(_warning);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
		function getUndefinedStateErrorMessage(key, action) {
		  var actionType = action && action.type;
		  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
	
		  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
		}
	
		function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
		  var reducerKeys = Object.keys(reducers);
		  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
	
		  if (reducerKeys.length === 0) {
		    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
		  }
	
		  if (!(0, _isPlainObject2["default"])(inputState)) {
		    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
		  }
	
		  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
		    return !reducers.hasOwnProperty(key);
		  });
	
		  if (unexpectedKeys.length > 0) {
		    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
		  }
		}
	
		function assertReducerSanity(reducers) {
		  Object.keys(reducers).forEach(function (key) {
		    var reducer = reducers[key];
		    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
	
		    if (typeof initialState === 'undefined') {
		      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
		    }
	
		    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
		    if (typeof reducer(undefined, { type: type }) === 'undefined') {
		      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
		    }
		  });
		}
	
		/**
		 * Turns an object whose values are different reducer functions, into a single
		 * reducer function. It will call every child reducer, and gather their results
		 * into a single state object, whose keys correspond to the keys of the passed
		 * reducer functions.
		 *
		 * @param {Object} reducers An object whose values correspond to different
		 * reducer functions that need to be combined into one. One handy way to obtain
		 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
		 * undefined for any action. Instead, they should return their initial state
		 * if the state passed to them was undefined, and the current state for any
		 * unrecognized action.
		 *
		 * @returns {Function} A reducer function that invokes every reducer inside the
		 * passed object, and builds a state object with the same shape.
		 */
		function combineReducers(reducers) {
		  var reducerKeys = Object.keys(reducers);
		  var finalReducers = {};
		  for (var i = 0; i < reducerKeys.length; i++) {
		    var key = reducerKeys[i];
		    if (typeof reducers[key] === 'function') {
		      finalReducers[key] = reducers[key];
		    }
		  }
		  var finalReducerKeys = Object.keys(finalReducers);
	
		  var sanityError;
		  try {
		    assertReducerSanity(finalReducers);
		  } catch (e) {
		    sanityError = e;
		  }
	
		  return function combination() {
		    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		    var action = arguments[1];
	
		    if (sanityError) {
		      throw sanityError;
		    }
	
		    if (process.env.NODE_ENV !== 'production') {
		      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
		      if (warningMessage) {
		        (0, _warning2["default"])(warningMessage);
		      }
		    }
	
		    var hasChanged = false;
		    var nextState = {};
		    for (var i = 0; i < finalReducerKeys.length; i++) {
		      var key = finalReducerKeys[i];
		      var reducer = finalReducers[key];
		      var previousStateForKey = state[key];
		      var nextStateForKey = reducer(previousStateForKey, action);
		      if (typeof nextStateForKey === 'undefined') {
		        var errorMessage = getUndefinedStateErrorMessage(key, action);
		        throw new Error(errorMessage);
		      }
		      nextState[key] = nextStateForKey;
		      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		    }
		    return hasChanged ? nextState : state;
		  };
		}
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))
	
	/***/ },
	/* 37 */
	/***/ function(module, exports) {
	
		'use strict';
	
		exports.__esModule = true;
		exports["default"] = warning;
		/**
		 * Prints a warning in the console if it exists.
		 *
		 * @param {String} message The warning message.
		 * @returns {void}
		 */
		function warning(message) {
		  /* eslint-disable no-console */
		  if (typeof console !== 'undefined' && typeof console.error === 'function') {
		    console.error(message);
		  }
		  /* eslint-enable no-console */
		  try {
		    // This error was thrown as a convenience so that if you enable
		    // "break on all exceptions" in your console,
		    // it would pause the execution at this line.
		    throw new Error(message);
		    /* eslint-disable no-empty */
		  } catch (e) {}
		  /* eslint-enable no-empty */
		}
	
	/***/ },
	/* 38 */
	/***/ function(module, exports) {
	
		'use strict';
	
		exports.__esModule = true;
		exports["default"] = bindActionCreators;
		function bindActionCreator(actionCreator, dispatch) {
		  return function () {
		    return dispatch(actionCreator.apply(undefined, arguments));
		  };
		}
	
		/**
		 * Turns an object whose values are action creators, into an object with the
		 * same keys, but with every function wrapped into a `dispatch` call so they
		 * may be invoked directly. This is just a convenience method, as you can call
		 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
		 *
		 * For convenience, you can also pass a single function as the first argument,
		 * and get a function in return.
		 *
		 * @param {Function|Object} actionCreators An object whose values are action
		 * creator functions. One handy way to obtain it is to use ES6 `import * as`
		 * syntax. You may also pass a single function.
		 *
		 * @param {Function} dispatch The `dispatch` function available on your Redux
		 * store.
		 *
		 * @returns {Function|Object} The object mimicking the original object, but with
		 * every action creator wrapped into the `dispatch` call. If you passed a
		 * function as `actionCreators`, the return value will also be a single
		 * function.
		 */
		function bindActionCreators(actionCreators, dispatch) {
		  if (typeof actionCreators === 'function') {
		    return bindActionCreator(actionCreators, dispatch);
		  }
	
		  if (typeof actionCreators !== 'object' || actionCreators === null) {
		    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
		  }
	
		  var keys = Object.keys(actionCreators);
		  var boundActionCreators = {};
		  for (var i = 0; i < keys.length; i++) {
		    var key = keys[i];
		    var actionCreator = actionCreators[key];
		    if (typeof actionCreator === 'function') {
		      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
		    }
		  }
		  return boundActionCreators;
		}
	
	/***/ },
	/* 39 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		exports["default"] = applyMiddleware;
	
		var _compose = __webpack_require__(40);
	
		var _compose2 = _interopRequireDefault(_compose);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
		/**
		 * Creates a store enhancer that applies middleware to the dispatch method
		 * of the Redux store. This is handy for a variety of tasks, such as expressing
		 * asynchronous actions in a concise manner, or logging every action payload.
		 *
		 * See `redux-thunk` package as an example of the Redux middleware.
		 *
		 * Because middleware is potentially asynchronous, this should be the first
		 * store enhancer in the composition chain.
		 *
		 * Note that each middleware will be given the `dispatch` and `getState` functions
		 * as named arguments.
		 *
		 * @param {...Function} middlewares The middleware chain to be applied.
		 * @returns {Function} A store enhancer applying the middleware.
		 */
		function applyMiddleware() {
		  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
		    middlewares[_key] = arguments[_key];
		  }
	
		  return function (createStore) {
		    return function (reducer, initialState, enhancer) {
		      var store = createStore(reducer, initialState, enhancer);
		      var _dispatch = store.dispatch;
		      var chain = [];
	
		      var middlewareAPI = {
		        getState: store.getState,
		        dispatch: function dispatch(action) {
		          return _dispatch(action);
		        }
		      };
		      chain = middlewares.map(function (middleware) {
		        return middleware(middlewareAPI);
		      });
		      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);
	
		      return _extends({}, store, {
		        dispatch: _dispatch
		      });
		    };
		  };
		}
	
	/***/ },
	/* 40 */
	/***/ function(module, exports) {
	
		"use strict";
	
		exports.__esModule = true;
		exports["default"] = compose;
		/**
		 * Composes single-argument functions from right to left. The rightmost
		 * function can take multiple arguments as it provides the signature for
		 * the resulting composite function.
		 *
		 * @param {...Function} funcs The functions to compose.
		 * @returns {Function} A function obtained by composing the argument functions
		 * from right to left. For example, compose(f, g, h) is identical to doing
		 * (...args) => f(g(h(...args))).
		 */
	
		function compose() {
		  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
		    funcs[_key] = arguments[_key];
		  }
	
		  if (funcs.length === 0) {
		    return function (arg) {
		      return arg;
		    };
		  } else {
		    var _ret = function () {
		      var last = funcs[funcs.length - 1];
		      var rest = funcs.slice(0, -1);
		      return {
		        v: function v() {
		          return rest.reduceRight(function (composed, f) {
		            return f(composed);
		          }, last.apply(undefined, arguments));
		        }
		      };
		    }();
	
		    if (typeof _ret === "object") return _ret.v;
		  }
		}
	
	/***/ },
	/* 41 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
	
		exports.default = function () {
		    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
		    var action = arguments[1];
	
		    return action.type === "SET_PARAMS" ? (0, _objectAssign2.default)({}, state, action.data) : state;
		};
	
		var _objectAssign = __webpack_require__(42);
	
		var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		var defaultState = {
		    x: 0,
		    y: 0,
		    isVisible: false,
		    currentItem: {}
		};
	
	/***/ },
	/* 42 */
	/***/ function(module, exports) {
	
		'use strict';
		/* eslint-disable no-unused-vars */
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
		function toObject(val) {
			if (val === null || val === undefined) {
				throw new TypeError('Object.assign cannot be called with null or undefined');
			}
	
			return Object(val);
		}
	
		function shouldUseNative() {
			try {
				if (!Object.assign) {
					return false;
				}
	
				// Detect buggy property enumeration order in older V8 versions.
	
				// https://bugs.chromium.org/p/v8/issues/detail?id=4118
				var test1 = new String('abc');  // eslint-disable-line
				test1[5] = 'de';
				if (Object.getOwnPropertyNames(test1)[0] === '5') {
					return false;
				}
	
				// https://bugs.chromium.org/p/v8/issues/detail?id=3056
				var test2 = {};
				for (var i = 0; i < 10; i++) {
					test2['_' + String.fromCharCode(i)] = i;
				}
				var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
					return test2[n];
				});
				if (order2.join('') !== '0123456789') {
					return false;
				}
	
				// https://bugs.chromium.org/p/v8/issues/detail?id=3056
				var test3 = {};
				'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
					test3[letter] = letter;
				});
				if (Object.keys(Object.assign({}, test3)).join('') !==
						'abcdefghijklmnopqrst') {
					return false;
				}
	
				return true;
			} catch (e) {
				// We don't expect any of the above to throw, but better to be safe.
				return false;
			}
		}
	
		module.exports = shouldUseNative() ? Object.assign : function (target, source) {
			var from;
			var to = toObject(target);
			var symbols;
	
			for (var s = 1; s < arguments.length; s++) {
				from = Object(arguments[s]);
	
				for (var key in from) {
					if (hasOwnProperty.call(from, key)) {
						to[key] = from[key];
					}
				}
	
				if (Object.getOwnPropertySymbols) {
					symbols = Object.getOwnPropertySymbols(from);
					for (var i = 0; i < symbols.length; i++) {
						if (propIsEnumerable.call(from, symbols[i])) {
							to[symbols[i]] = from[symbols[i]];
						}
					}
				}
			}
	
			return to;
		};
	
	
	/***/ },
	/* 43 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _monitor = __webpack_require__(44);
	
		var _monitor2 = _interopRequireDefault(_monitor);
	
		var _Modal = __webpack_require__(45);
	
		var _Modal2 = _interopRequireDefault(_Modal);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		var modalStyle = {
		    position: "fixed",
		    zIndex: 1040,
		    top: 0, bottom: 0, left: 0, right: 0
		},
		    backdropStyle = _extends({}, modalStyle, {
		    zIndex: "auto",
		    backgroundColor: "transparent"
		}),
		    menuStyles = {
		    position: "fixed",
		    zIndex: "auto"
		};
	
		var ContextMenuWrapper = _react2.default.createClass({
		    displayName: "ContextMenuWrapper",
		    getInitialState: function getInitialState() {
		        return {
		            left: 0,
		            top: 0
		        };
		    },
		    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		        var _this = this;
	
		        if (nextProps.isVisible === nextProps.identifier) {
		            var wrapper = window.requestAnimationFrame || setTimeout;
	
		            wrapper(function () {
		                return _this.setState(_this.getMenuPosition(nextProps.x, nextProps.y));
		            });
		        }
		    },
		    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		        return this.props.isVisible !== nextProps.visible;
		    },
		    getMenuPosition: function getMenuPosition(x, y) {
		        var scrollX = document.documentElement.scrollTop;
		        var scrollY = document.documentElement.scrollLeft;
		        var _window = window;
		        var innerWidth = _window.innerWidth;
		        var innerHeight = _window.innerHeight;
		        var rect = this.menu.getBoundingClientRect();
		        var menuStyles = {
		            top: y + scrollY,
		            left: x + scrollX
		        };
	
		        if (y + rect.height > innerHeight) {
		            menuStyles.top -= rect.height;
		        }
	
		        if (x + rect.width > innerWidth) {
		            menuStyles.left -= rect.width;
		        }
	
		        return menuStyles;
		    },
		    render: function render() {
		        var _this2 = this;
	
		        var _props = this.props;
		        var isVisible = _props.isVisible;
		        var identifier = _props.identifier;
		        var children = _props.children;
	
	
		        var style = _extends({}, menuStyles, this.state);
	
		        return _react2.default.createElement(
		            _Modal2.default,
		            { style: modalStyle, backdropStyle: backdropStyle,
		                show: isVisible === identifier, onHide: function onHide() {
		                    return _monitor2.default.hideMenu();
		                } },
		            _react2.default.createElement(
		                "nav",
		                { ref: function ref(c) {
		                        return _this2.menu = c;
		                    }, style: style,
		                    className: "react-context-menu" },
		                children
		            )
		        );
		    }
		});
	
		exports.default = ContextMenuWrapper;
	
	/***/ },
	/* 44 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
	
		var _store = __webpack_require__(26);
	
		var _store2 = _interopRequireDefault(_store);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		exports.default = {
		    getItem: function getItem() {
		        return _store2.default.getState().currentItem;
		    },
		    getPosition: function getPosition() {
		        var _store$getState = _store2.default.getState();
	
		        var x = _store$getState.x;
		        var y = _store$getState.y;
	
	
		        return { x: x, y: y };
		    },
		    hideMenu: function hideMenu() {
		        _store2.default.dispatch({
		            type: "SET_PARAMS",
		            data: {
		                isVisible: false,
		                currentItem: {}
		            }
		        });
		    }
		};
	
	/***/ },
	/* 45 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*eslint-disable react/prop-types */
		'use strict';
	
		exports.__esModule = true;
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _warning = __webpack_require__(46);
	
		var _warning2 = _interopRequireDefault(_warning);
	
		var _reactPropTypesLibMountable = __webpack_require__(47);
	
		var _reactPropTypesLibMountable2 = _interopRequireDefault(_reactPropTypesLibMountable);
	
		var _reactPropTypesLibElementType = __webpack_require__(49);
	
		var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);
	
		var _Portal = __webpack_require__(50);
	
		var _Portal2 = _interopRequireDefault(_Portal);
	
		var _ModalManager = __webpack_require__(54);
	
		var _ModalManager2 = _interopRequireDefault(_ModalManager);
	
		var _utilsOwnerDocument = __webpack_require__(51);
	
		var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);
	
		var _utilsAddEventListener = __webpack_require__(72);
	
		var _utilsAddEventListener2 = _interopRequireDefault(_utilsAddEventListener);
	
		var _utilsAddFocusListener = __webpack_require__(75);
	
		var _utilsAddFocusListener2 = _interopRequireDefault(_utilsAddFocusListener);
	
		var _domHelpersUtilInDOM = __webpack_require__(68);
	
		var _domHelpersUtilInDOM2 = _interopRequireDefault(_domHelpersUtilInDOM);
	
		var _domHelpersActiveElement = __webpack_require__(76);
	
		var _domHelpersActiveElement2 = _interopRequireDefault(_domHelpersActiveElement);
	
		var _domHelpersQueryContains = __webpack_require__(77);
	
		var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);
	
		var _utilsGetContainer = __webpack_require__(53);
	
		var _utilsGetContainer2 = _interopRequireDefault(_utilsGetContainer);
	
		var modalManager = new _ModalManager2['default']();
	
		/**
		 * Love them or hate them, `<Modal/>` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
		 * The Modal component renders its `children` node in front of a backdrop component.
		 *
		 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
		 *
		 * - Manages dialog stacking when one-at-a-time just isn't enough.
		 * - Creates a backdrop, for disabling interaction below the modal.
		 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
		 * - It disables scrolling of the page content while open.
		 * - Adds the appropriate ARIA roles are automatically.
		 * - Easily pluggable animations via a `<Transition/>` component.
		 *
		 * Note that, in the same way the backdrop element prevents users from clicking or interacting
		 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
		 * interact with page content while the Modal is open. To do this, we use a common technique of applying
		 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
		 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
		 * React hierarchy (such as the default: document.body).
		 */
		var Modal = _react2['default'].createClass({
		  displayName: 'Modal',
	
		  propTypes: _extends({}, _Portal2['default'].propTypes, {
	
		    /**
		     * Set the visibility of the Modal
		     */
		    show: _react2['default'].PropTypes.bool,
	
		    /**
		     * A Node, Component instance, or function that returns either. The Modal is appended to it's container element.
		     *
		     * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
		     * page content can be placed behind a virtual backdrop as well as a visual one.
		     */
		    container: _react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'], _react2['default'].PropTypes.func]),
	
		    /**
		     * A callback fired when the Modal is opening.
		     */
		    onShow: _react2['default'].PropTypes.func,
	
		    /**
		     * A callback fired when either the backdrop is clicked, or the escape key is pressed.
		     *
		     * The `onHide` callback only signals intent from the Modal,
		     * you must actually set the `show` prop to `false` for the Modal to close.
		     */
		    onHide: _react2['default'].PropTypes.func,
	
		    /**
		     * Include a backdrop component.
		     */
		    backdrop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(['static'])]),
	
		    /**
		     * A callback fired when the escape key, if specified in `keyboard`, is pressed.
		     */
		    onEscapeKeyUp: _react2['default'].PropTypes.func,
	
		    /**
		     * A callback fired when the backdrop, if specified, is clicked.
		     */
		    onBackdropClick: _react2['default'].PropTypes.func,
	
		    /**
		     * A style object for the backdrop component.
		     */
		    backdropStyle: _react2['default'].PropTypes.object,
	
		    /**
		     * A css class or classes for the backdrop component.
		     */
		    backdropClassName: _react2['default'].PropTypes.string,
	
		    /**
		     * A css class or set of classes applied to the modal container when the modal is open,
		     * and removed when it is closed.
		     */
		    containerClassName: _react2['default'].PropTypes.string,
	
		    /**
		     * Close the modal when escape key is pressed
		     */
		    keyboard: _react2['default'].PropTypes.bool,
	
		    /**
		     * A `<Transition/>` component to use for the dialog and backdrop components.
		     */
		    transition: _reactPropTypesLibElementType2['default'],
	
		    /**
		     * The `timeout` of the dialog transition if specified. This number is used to ensure that
		     * transition callbacks are always fired, even if browser transition events are canceled.
		     *
		     * See the Transition `timeout` prop for more infomation.
		     */
		    dialogTransitionTimeout: _react2['default'].PropTypes.number,
	
		    /**
		     * The `timeout` of the backdrop transition if specified. This number is used to
		     * ensure that transition callbacks are always fired, even if browser transition events are canceled.
		     *
		     * See the Transition `timeout` prop for more infomation.
		     */
		    backdropTransitionTimeout: _react2['default'].PropTypes.number,
	
		    /**
		     * When `true` The modal will automatically shift focus to itself when it opens, and
		     * replace it to the last focused element when it closes. This also
		     * works correctly with any Modal children that have the `autoFocus` prop.
		     *
		     * Generally this should never be set to `false` as it makes the Modal less
		     * accessible to assistive technologies, like screen readers.
		     */
		    autoFocus: _react2['default'].PropTypes.bool,
	
		    /**
		     * When `true` The modal will prevent focus from leaving the Modal while open.
		     *
		     * Generally this should never be set to `false` as it makes the Modal less
		     * accessible to assistive technologies, like screen readers.
		     */
		    enforceFocus: _react2['default'].PropTypes.bool,
	
		    /**
		     * Callback fired before the Modal transitions in
		     */
		    onEnter: _react2['default'].PropTypes.func,
	
		    /**
		     * Callback fired as the Modal begins to transition in
		     */
		    onEntering: _react2['default'].PropTypes.func,
	
		    /**
		     * Callback fired after the Modal finishes transitioning in
		     */
		    onEntered: _react2['default'].PropTypes.func,
	
		    /**
		     * Callback fired right before the Modal transitions out
		     */
		    onExit: _react2['default'].PropTypes.func,
	
		    /**
		     * Callback fired as the Modal begins to transition out
		     */
		    onExiting: _react2['default'].PropTypes.func,
	
		    /**
		     * Callback fired after the Modal finishes transitioning out
		     */
		    onExited: _react2['default'].PropTypes.func
	
		  }),
	
		  getDefaultProps: function getDefaultProps() {
		    var noop = function noop() {};
	
		    return {
		      show: false,
		      backdrop: true,
		      keyboard: true,
		      autoFocus: true,
		      enforceFocus: true,
		      onHide: noop
		    };
		  },
	
		  getInitialState: function getInitialState() {
		    return { exited: !this.props.show };
		  },
	
		  render: function render() {
		    var _props = this.props;
		    var children = _props.children;
		    var Transition = _props.transition;
		    var backdrop = _props.backdrop;
		    var dialogTransitionTimeout = _props.dialogTransitionTimeout;
	
		    var props = _objectWithoutProperties(_props, ['children', 'transition', 'backdrop', 'dialogTransitionTimeout']);
	
		    var onExit = props.onExit;
		    var onExiting = props.onExiting;
		    var onEnter = props.onEnter;
		    var onEntering = props.onEntering;
		    var onEntered = props.onEntered;
	
		    var show = !!props.show;
		    var dialog = _react2['default'].Children.only(this.props.children);
	
		    var mountModal = show || Transition && !this.state.exited;
	
		    if (!mountModal) {
		      return null;
		    }
	
		    var _dialog$props = dialog.props;
		    var role = _dialog$props.role;
		    var tabIndex = _dialog$props.tabIndex;
	
		    if (role === undefined || tabIndex === undefined) {
		      dialog = _react.cloneElement(dialog, {
		        role: role === undefined ? 'document' : role,
		        tabIndex: tabIndex == null ? '-1' : tabIndex
		      });
		    }
	
		    if (Transition) {
		      dialog = _react2['default'].createElement(
		        Transition,
		        {
		          transitionAppear: true,
		          unmountOnExit: true,
		          'in': show,
		          timeout: dialogTransitionTimeout,
		          onExit: onExit,
		          onExiting: onExiting,
		          onExited: this.handleHidden,
		          onEnter: onEnter,
		          onEntering: onEntering,
		          onEntered: onEntered
		        },
		        dialog
		      );
		    }
	
		    return _react2['default'].createElement(
		      _Portal2['default'],
		      {
		        ref: this.setMountNode,
		        container: props.container
		      },
		      _react2['default'].createElement(
		        'div',
		        {
		          ref: 'modal',
		          role: props.role || 'dialog',
		          style: props.style,
		          className: props.className
		        },
		        backdrop && this.renderBackdrop(),
		        dialog
		      )
		    );
		  },
	
		  renderBackdrop: function renderBackdrop() {
		    var _props2 = this.props;
		    var Transition = _props2.transition;
		    var backdropTransitionTimeout = _props2.backdropTransitionTimeout;
	
		    var backdrop = _react2['default'].createElement('div', { ref: 'backdrop',
		      style: this.props.backdropStyle,
		      className: this.props.backdropClassName,
		      onClick: this.handleBackdropClick
		    });
	
		    if (Transition) {
		      backdrop = _react2['default'].createElement(
		        Transition,
		        { transitionAppear: true,
		          'in': this.props.show,
		          timeout: backdropTransitionTimeout
		        },
		        backdrop
		      );
		    }
	
		    return backdrop;
		  },
	
		  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		    if (nextProps.show) {
		      this.setState({ exited: false });
		    } else if (!nextProps.transition) {
		      // Otherwise let handleHidden take care of marking exited.
		      this.setState({ exited: true });
		    }
		  },
	
		  componentWillUpdate: function componentWillUpdate(nextProps) {
		    if (nextProps.show) {
		      this.checkForFocus();
		    }
		  },
	
		  componentDidMount: function componentDidMount() {
		    if (this.props.show) {
		      this.onShow();
		    }
		  },
	
		  componentDidUpdate: function componentDidUpdate(prevProps) {
		    var transition = this.props.transition;
	
		    if (prevProps.show && !this.props.show && !transition) {
		      // Otherwise handleHidden will call this.
		      this.onHide();
		    } else if (!prevProps.show && this.props.show) {
		      this.onShow();
		    }
		  },
	
		  componentWillUnmount: function componentWillUnmount() {
		    var _props3 = this.props;
		    var show = _props3.show;
		    var transition = _props3.transition;
	
		    if (show || transition && !this.state.exited) {
		      this.onHide();
		    }
		  },
	
		  onShow: function onShow() {
		    var doc = _utilsOwnerDocument2['default'](this);
		    var container = _utilsGetContainer2['default'](this.props.container, doc.body);
	
		    modalManager.add(this, container, this.props.containerClassName);
	
		    this._onDocumentKeyupListener = _utilsAddEventListener2['default'](doc, 'keyup', this.handleDocumentKeyUp);
	
		    this._onFocusinListener = _utilsAddFocusListener2['default'](this.enforceFocus);
	
		    this.focus();
	
		    if (this.props.onShow) {
		      this.props.onShow();
		    }
		  },
	
		  onHide: function onHide() {
		    modalManager.remove(this);
	
		    this._onDocumentKeyupListener.remove();
	
		    this._onFocusinListener.remove();
	
		    this.restoreLastFocus();
		  },
	
		  setMountNode: function setMountNode(ref) {
		    this.mountNode = ref ? ref.getMountNode() : ref;
		  },
	
		  handleHidden: function handleHidden() {
		    this.setState({ exited: true });
		    this.onHide();
	
		    if (this.props.onExited) {
		      var _props4;
	
		      (_props4 = this.props).onExited.apply(_props4, arguments);
		    }
		  },
	
		  handleBackdropClick: function handleBackdropClick(e) {
		    if (e.target !== e.currentTarget) {
		      return;
		    }
	
		    if (this.props.onBackdropClick) {
		      this.props.onBackdropClick(e);
		    }
	
		    if (this.props.backdrop === true) {
		      this.props.onHide();
		    }
		  },
	
		  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
		    if (this.props.keyboard && e.keyCode === 27 && this.isTopModal()) {
		      if (this.props.onEscapeKeyUp) {
		        this.props.onEscapeKeyUp(e);
		      }
		      this.props.onHide();
		    }
		  },
	
		  checkForFocus: function checkForFocus() {
		    if (_domHelpersUtilInDOM2['default']) {
		      this.lastFocus = _domHelpersActiveElement2['default']();
		    }
		  },
	
		  focus: function focus() {
		    var autoFocus = this.props.autoFocus;
		    var modalContent = this.getDialogElement();
		    var current = _domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));
		    var focusInModal = current && _domHelpersQueryContains2['default'](modalContent, current);
	
		    if (modalContent && autoFocus && !focusInModal) {
		      this.lastFocus = current;
	
		      if (!modalContent.hasAttribute('tabIndex')) {
		        modalContent.setAttribute('tabIndex', -1);
		        _warning2['default'](false, 'The modal content node does not accept focus. ' + 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');
		      }
	
		      modalContent.focus();
		    }
		  },
	
		  restoreLastFocus: function restoreLastFocus() {
		    // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
		    if (this.lastFocus && this.lastFocus.focus) {
		      this.lastFocus.focus();
		      this.lastFocus = null;
		    }
		  },
	
		  enforceFocus: function enforceFocus() {
		    var enforceFocus = this.props.enforceFocus;
	
		    if (!enforceFocus || !this.isMounted() || !this.isTopModal()) {
		      return;
		    }
	
		    var active = _domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));
		    var modal = this.getDialogElement();
	
		    if (modal && modal !== active && !_domHelpersQueryContains2['default'](modal, active)) {
		      modal.focus();
		    }
		  },
	
		  //instead of a ref, which might conflict with one the parent applied.
		  getDialogElement: function getDialogElement() {
		    var node = this.refs.modal;
		    return node && node.lastChild;
		  },
	
		  isTopModal: function isTopModal() {
		    return modalManager.isTopModal(this);
		  }
	
		});
	
		Modal.manager = modalManager;
	
		exports['default'] = Modal;
		module.exports = exports['default'];
	
	/***/ },
	/* 46 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(process) {/**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
	
		'use strict';
	
		/**
		 * Similar to invariant but only logs a warning if the condition is not met.
		 * This can be used to log issues in development environments in critical
		 * paths. Removing the logging code for production environments will keep the
		 * same logic and follow the same code paths.
		 */
	
		var warning = function() {};
	
		if (process.env.NODE_ENV !== 'production') {
		  warning = function(condition, format, args) {
		    var len = arguments.length;
		    args = new Array(len > 2 ? len - 2 : 0);
		    for (var key = 2; key < len; key++) {
		      args[key - 2] = arguments[key];
		    }
		    if (format === undefined) {
		      throw new Error(
		        '`warning(condition, format, ...args)` requires a warning ' +
		        'message argument'
		      );
		    }
	
		    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
		      throw new Error(
		        'The warning format should be able to uniquely identify this ' +
		        'warning. Please, use a more descriptive format than: ' + format
		      );
		    }
	
		    if (!condition) {
		      var argIndex = 0;
		      var message = 'Warning: ' +
		        format.replace(/%s/g, function() {
		          return args[argIndex++];
		        });
		      if (typeof console !== 'undefined') {
		        console.error(message);
		      }
		      try {
		        // This error was thrown as a convenience so that you can use this stack
		        // to find the callsite that caused this warning to fire.
		        throw new Error(message);
		      } catch(x) {}
		    }
		  };
		}
	
		module.exports = warning;
	
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))
	
	/***/ },
	/* 47 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
	
		var _common = __webpack_require__(48);
	
		/**
		 * Checks whether a prop provides a DOM element
		 *
		 * The element can be provided in two forms:
		 * - Directly passed
		 * - Or passed an object that has a `render` method
		 *
		 * @param props
		 * @param propName
		 * @param componentName
		 * @returns {Error|undefined}
		 */
	
		function validate(props, propName, componentName) {
		  if (typeof props[propName] !== 'object' || typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {
		    return new Error(_common.errMsg(props, propName, componentName, ', expected a DOM element or an object that has a `render` method'));
		  }
		}
	
		exports['default'] = _common.createChainableTypeChecker(validate);
		module.exports = exports['default'];
	
	/***/ },
	/* 48 */
	/***/ function(module, exports) {
	
		'use strict';
	
		exports.__esModule = true;
		exports.errMsg = errMsg;
		exports.createChainableTypeChecker = createChainableTypeChecker;
	
		function errMsg(props, propName, componentName, msgContinuation) {
		  return 'Invalid prop \'' + propName + '\' of value \'' + props[propName] + '\'' + (' supplied to \'' + componentName + '\'' + msgContinuation);
		}
	
		/**
		 * Create chain-able isRequired validator
		 *
		 * Largely copied directly from:
		 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
		 */
	
		function createChainableTypeChecker(validate) {
		  function checkType(isRequired, props, propName, componentName) {
		    componentName = componentName || '<<anonymous>>';
		    if (props[propName] == null) {
		      if (isRequired) {
		        return new Error('Required prop \'' + propName + '\' was not specified in \'' + componentName + '\'.');
		      }
		    } else {
		      return validate(props, propName, componentName);
		    }
		  }
	
		  var chainedCheckType = checkType.bind(null, false);
		  chainedCheckType.isRequired = checkType.bind(null, true);
	
		  return chainedCheckType;
		}
	
	/***/ },
	/* 49 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _common = __webpack_require__(48);
	
		/**
		 * Checks whether a prop provides a type of element.
		 *
		 * The type of element can be provided in two forms:
		 * - tag name (string)
		 * - a return value of React.createClass(...)
		 *
		 * @param props
		 * @param propName
		 * @param componentName
		 * @returns {Error|undefined}
		 */
	
		function validate(props, propName, componentName) {
		  var errBeginning = _common.errMsg(props, propName, componentName, '. Expected an Element `type`');
	
		  if (typeof props[propName] !== 'function') {
		    if (_react2['default'].isValidElement(props[propName])) {
		      return new Error(errBeginning + ', not an actual Element');
		    }
	
		    if (typeof props[propName] !== 'string') {
		      return new Error(errBeginning + ' such as a tag name or return value of React.createClass(...)');
		    }
		  }
		}
	
		exports['default'] = _common.createChainableTypeChecker(validate);
		module.exports = exports['default'];
	
	/***/ },
	/* 50 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _reactDom = __webpack_require__(3);
	
		var _reactDom2 = _interopRequireDefault(_reactDom);
	
		var _reactPropTypesLibMountable = __webpack_require__(47);
	
		var _reactPropTypesLibMountable2 = _interopRequireDefault(_reactPropTypesLibMountable);
	
		var _utilsOwnerDocument = __webpack_require__(51);
	
		var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);
	
		var _utilsGetContainer = __webpack_require__(53);
	
		var _utilsGetContainer2 = _interopRequireDefault(_utilsGetContainer);
	
		/**
		 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
		 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
		 * The children of `<Portal/>` component will be appended to the `container` specified.
		 */
		var Portal = _react2['default'].createClass({
	
		  displayName: 'Portal',
	
		  propTypes: {
		    /**
		     * A Node, Component instance, or function that returns either. The `container` will have the Portal children
		     * appended to it.
		     */
		    container: _react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'], _react2['default'].PropTypes.func])
		  },
	
		  componentDidMount: function componentDidMount() {
		    this._renderOverlay();
		  },
	
		  componentDidUpdate: function componentDidUpdate() {
		    this._renderOverlay();
		  },
	
		  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		    if (this._overlayTarget && nextProps.container !== this.props.container) {
		      this._portalContainerNode.removeChild(this._overlayTarget);
		      this._portalContainerNode = _utilsGetContainer2['default'](nextProps.container, _utilsOwnerDocument2['default'](this).body);
		      this._portalContainerNode.appendChild(this._overlayTarget);
		    }
		  },
	
		  componentWillUnmount: function componentWillUnmount() {
		    this._unrenderOverlay();
		    this._unmountOverlayTarget();
		  },
	
		  _mountOverlayTarget: function _mountOverlayTarget() {
		    if (!this._overlayTarget) {
		      this._overlayTarget = document.createElement('div');
		      this._portalContainerNode = _utilsGetContainer2['default'](this.props.container, _utilsOwnerDocument2['default'](this).body);
		      this._portalContainerNode.appendChild(this._overlayTarget);
		    }
		  },
	
		  _unmountOverlayTarget: function _unmountOverlayTarget() {
		    if (this._overlayTarget) {
		      this._portalContainerNode.removeChild(this._overlayTarget);
		      this._overlayTarget = null;
		    }
		    this._portalContainerNode = null;
		  },
	
		  _renderOverlay: function _renderOverlay() {
	
		    var overlay = !this.props.children ? null : _react2['default'].Children.only(this.props.children);
	
		    // Save reference for future access.
		    if (overlay !== null) {
		      this._mountOverlayTarget();
		      this._overlayInstance = _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, overlay, this._overlayTarget);
		    } else {
		      // Unrender if the component is null for transitions to null
		      this._unrenderOverlay();
		      this._unmountOverlayTarget();
		    }
		  },
	
		  _unrenderOverlay: function _unrenderOverlay() {
		    if (this._overlayTarget) {
		      _reactDom2['default'].unmountComponentAtNode(this._overlayTarget);
		      this._overlayInstance = null;
		    }
		  },
	
		  render: function render() {
		    return null;
		  },
	
		  getMountNode: function getMountNode() {
		    return this._overlayTarget;
		  },
	
		  getOverlayDOMNode: function getOverlayDOMNode() {
		    if (!this.isMounted()) {
		      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
		    }
	
		    if (this._overlayInstance) {
		      if (this._overlayInstance.getWrappedDOMNode) {
		        return this._overlayInstance.getWrappedDOMNode();
		      } else {
		        return _reactDom2['default'].findDOMNode(this._overlayInstance);
		      }
		    }
	
		    return null;
		  }
	
		});
	
		exports['default'] = Portal;
		module.exports = exports['default'];
	
	/***/ },
	/* 51 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _reactDom = __webpack_require__(3);
	
		var _reactDom2 = _interopRequireDefault(_reactDom);
	
		var _domHelpersOwnerDocument = __webpack_require__(52);
	
		var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);
	
		exports['default'] = function (componentOrElement) {
		  return _domHelpersOwnerDocument2['default'](_reactDom2['default'].findDOMNode(componentOrElement));
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 52 */
	/***/ function(module, exports) {
	
		"use strict";
	
		exports.__esModule = true;
		exports["default"] = ownerDocument;
	
		function ownerDocument(node) {
		  return node && node.ownerDocument || document;
		}
	
		module.exports = exports["default"];
	
	/***/ },
	/* 53 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
		exports['default'] = getContainer;
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _reactDom = __webpack_require__(3);
	
		var _reactDom2 = _interopRequireDefault(_reactDom);
	
		function getContainer(container, defaultContainer) {
		  container = typeof container === 'function' ? container() : container;
		  return _reactDom2['default'].findDOMNode(container) || defaultContainer;
		}
	
		module.exports = exports['default'];
	
	/***/ },
	/* 54 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
		var _domHelpersStyle = __webpack_require__(55);
	
		var _domHelpersStyle2 = _interopRequireDefault(_domHelpersStyle);
	
		var _domHelpersClass = __webpack_require__(63);
	
		var _domHelpersClass2 = _interopRequireDefault(_domHelpersClass);
	
		var _domHelpersUtilScrollbarSize = __webpack_require__(67);
	
		var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);
	
		var _utilsIsOverflowing = __webpack_require__(69);
	
		var _utilsIsOverflowing2 = _interopRequireDefault(_utilsIsOverflowing);
	
		var _utilsManageAriaHidden = __webpack_require__(71);
	
		function findIndexOf(arr, cb) {
		  var idx = -1;
		  arr.some(function (d, i) {
		    if (cb(d, i)) {
		      idx = i;
		      return true;
		    }
		  });
		  return idx;
		}
	
		function findContainer(data, modal) {
		  return findIndexOf(data, function (d) {
		    return d.modals.indexOf(modal) !== -1;
		  });
		}
	
		/**
		 * Proper state managment for containers and the modals in those containers.
		 *
		 * @internal Used by the Modal to ensure proper styling of containers.
		 */
	
		var ModalManager = (function () {
		  function ModalManager() {
		    var hideSiblingNodes = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
		    _classCallCheck(this, ModalManager);
	
		    this.hideSiblingNodes = hideSiblingNodes;
		    this.modals = [];
		    this.containers = [];
		    this.data = [];
		  }
	
		  ModalManager.prototype.add = function add(modal, container, className) {
		    var modalIdx = this.modals.indexOf(modal);
		    var containerIdx = this.containers.indexOf(container);
	
		    if (modalIdx !== -1) {
		      return modalIdx;
		    }
	
		    modalIdx = this.modals.length;
		    this.modals.push(modal);
	
		    if (this.hideSiblingNodes) {
		      _utilsManageAriaHidden.hideSiblings(container, modal.mountNode);
		    }
	
		    if (containerIdx !== -1) {
		      this.data[containerIdx].modals.push(modal);
		      return modalIdx;
		    }
	
		    var data = {
		      modals: [modal],
		      //right now only the first modal of a container will have its classes applied
		      classes: className ? className.split(/\s+/) : [],
		      //we are only interested in the actual `style` here becasue we will override it
		      style: {
		        overflow: container.style.overflow,
		        paddingRight: container.style.paddingRight
		      }
		    };
	
		    var style = { overflow: 'hidden' };
	
		    data.overflowing = _utilsIsOverflowing2['default'](container);
	
		    if (data.overflowing) {
		      // use computed style, here to get the real padding
		      // to add our scrollbar width
		      style.paddingRight = parseInt(_domHelpersStyle2['default'](container, 'paddingRight') || 0, 10) + _domHelpersUtilScrollbarSize2['default']() + 'px';
		    }
	
		    _domHelpersStyle2['default'](container, style);
	
		    data.classes.forEach(_domHelpersClass2['default'].addClass.bind(null, container));
	
		    this.containers.push(container);
		    this.data.push(data);
	
		    return modalIdx;
		  };
	
		  ModalManager.prototype.remove = function remove(modal) {
		    var modalIdx = this.modals.indexOf(modal);
	
		    if (modalIdx === -1) {
		      return;
		    }
	
		    var containerIdx = findContainer(this.data, modal);
		    var data = this.data[containerIdx];
		    var container = this.containers[containerIdx];
	
		    data.modals.splice(data.modals.indexOf(modal), 1);
	
		    this.modals.splice(modalIdx, 1);
	
		    // if that was the last modal in a container,
		    // clean up the container stylinhg.
		    if (data.modals.length === 0) {
		      Object.keys(data.style).forEach(function (key) {
		        return container.style[key] = data.style[key];
		      });
	
		      data.classes.forEach(_domHelpersClass2['default'].removeClass.bind(null, container));
	
		      if (this.hideSiblingNodes) {
		        _utilsManageAriaHidden.showSiblings(container, modal.mountNode);
		      }
		      this.containers.splice(containerIdx, 1);
		      this.data.splice(containerIdx, 1);
		    } else if (this.hideSiblingNodes) {
		      //otherwise make sure the next top modal is visible to a SR
		      _utilsManageAriaHidden.ariaHidden(false, data.modals[data.modals.length - 1].mountNode);
		    }
		  };
	
		  ModalManager.prototype.isTopModal = function isTopModal(modal) {
		    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
		  };
	
		  return ModalManager;
		})();
	
		exports['default'] = ModalManager;
		module.exports = exports['default'];
	
	/***/ },
	/* 55 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var camelize = __webpack_require__(56),
		    hyphenate = __webpack_require__(58),
		    _getComputedStyle = __webpack_require__(60),
		    removeStyle = __webpack_require__(62);
	
		var has = Object.prototype.hasOwnProperty;
	
		module.exports = function style(node, property, value) {
		  var css = '',
		      props = property;
	
		  if (typeof property === 'string') {
	
		    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(hyphenate(property));else (props = {})[property] = value;
		  }
	
		  for (var key in props) if (has.call(props, key)) {
		    !props[key] && props[key] !== 0 ? removeStyle(node, hyphenate(key)) : css += hyphenate(key) + ':' + props[key] + ';';
		  }
	
		  node.style.cssText += ';' + css;
		};
	
	/***/ },
	/* 56 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
		 */
	
		'use strict';
		var camelize = __webpack_require__(57);
		var msPattern = /^-ms-/;
	
		module.exports = function camelizeStyleName(string) {
		  return camelize(string.replace(msPattern, 'ms-'));
		};
	
	/***/ },
	/* 57 */
	/***/ function(module, exports) {
	
		"use strict";
	
		var rHyphen = /-(.)/g;
	
		module.exports = function camelize(string) {
		  return string.replace(rHyphen, function (_, chr) {
		    return chr.toUpperCase();
		  });
		};
	
	/***/ },
	/* 58 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Copyright 2013-2014, Facebook, Inc.
		 * All rights reserved.
		 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
		 */
	
		"use strict";
	
		var hyphenate = __webpack_require__(59);
		var msPattern = /^ms-/;
	
		module.exports = function hyphenateStyleName(string) {
		  return hyphenate(string).replace(msPattern, "-ms-");
		};
	
	/***/ },
	/* 59 */
	/***/ function(module, exports) {
	
		'use strict';
	
		var rUpper = /([A-Z])/g;
	
		module.exports = function hyphenate(string) {
		  return string.replace(rUpper, '-$1').toLowerCase();
		};
	
	/***/ },
	/* 60 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var babelHelpers = __webpack_require__(61);
	
		var _utilCamelizeStyle = __webpack_require__(56);
	
		var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);
	
		var rposition = /^(top|right|bottom|left)$/;
		var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;
	
		module.exports = function _getComputedStyle(node) {
		  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
		  var doc = node.ownerDocument;
	
		  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
		    getPropertyValue: function getPropertyValue(prop) {
		      var style = node.style;
	
		      prop = (0, _utilCamelizeStyle2['default'])(prop);
	
		      if (prop == 'float') prop = 'styleFloat';
	
		      var current = node.currentStyle[prop] || null;
	
		      if (current == null && style && style[prop]) current = style[prop];
	
		      if (rnumnonpx.test(current) && !rposition.test(prop)) {
		        // Remember the original values
		        var left = style.left;
		        var runStyle = node.runtimeStyle;
		        var rsLeft = runStyle && runStyle.left;
	
		        // Put in the new values to get a computed value out
		        if (rsLeft) runStyle.left = node.currentStyle.left;
	
		        style.left = prop === 'fontSize' ? '1em' : current;
		        current = style.pixelLeft + 'px';
	
		        // Revert the changed values
		        style.left = left;
		        if (rsLeft) runStyle.left = rsLeft;
		      }
	
		      return current;
		    }
		  };
		};
	
	/***/ },
	/* 61 */
	/***/ function(module, exports, __webpack_require__) {
	
		var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
		  if (true) {
		    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		  } else if (typeof exports === "object") {
		    factory(exports);
		  } else {
		    factory(root.babelHelpers = {});
		  }
		})(this, function (global) {
		  var babelHelpers = global;
	
		  babelHelpers.interopRequireDefault = function (obj) {
		    return obj && obj.__esModule ? obj : {
		      "default": obj
		    };
		  };
	
		  babelHelpers._extends = Object.assign || function (target) {
		    for (var i = 1; i < arguments.length; i++) {
		      var source = arguments[i];
	
		      for (var key in source) {
		        if (Object.prototype.hasOwnProperty.call(source, key)) {
		          target[key] = source[key];
		        }
		      }
		    }
	
		    return target;
		  };
		})
	
	/***/ },
	/* 62 */
	/***/ function(module, exports) {
	
		'use strict';
	
		module.exports = function removeStyle(node, key) {
		  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
		};
	
	/***/ },
	/* 63 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		module.exports = {
		  addClass: __webpack_require__(64),
		  removeClass: __webpack_require__(66),
		  hasClass: __webpack_require__(65)
		};
	
	/***/ },
	/* 64 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		var hasClass = __webpack_require__(65);
	
		module.exports = function addClass(element, className) {
		  if (element.classList) element.classList.add(className);else if (!hasClass(element)) element.className = element.className + ' ' + className;
		};
	
	/***/ },
	/* 65 */
	/***/ function(module, exports) {
	
		'use strict';
		module.exports = function hasClass(element, className) {
		  if (element.classList) return !!className && element.classList.contains(className);else return (' ' + element.className + ' ').indexOf(' ' + className + ' ') !== -1;
		};
	
	/***/ },
	/* 66 */
	/***/ function(module, exports) {
	
		'use strict';
	
		module.exports = function removeClass(element, className) {
		  if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
		};
	
	/***/ },
	/* 67 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var canUseDOM = __webpack_require__(68);
	
		var size;
	
		module.exports = function (recalc) {
		  if (!size || recalc) {
		    if (canUseDOM) {
		      var scrollDiv = document.createElement('div');
	
		      scrollDiv.style.position = 'absolute';
		      scrollDiv.style.top = '-9999px';
		      scrollDiv.style.width = '50px';
		      scrollDiv.style.height = '50px';
		      scrollDiv.style.overflow = 'scroll';
	
		      document.body.appendChild(scrollDiv);
		      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		      document.body.removeChild(scrollDiv);
		    }
		  }
	
		  return size;
		};
	
	/***/ },
	/* 68 */
	/***/ function(module, exports) {
	
		'use strict';
		module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
	/***/ },
	/* 69 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
		exports['default'] = isOverflowing;
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _domHelpersQueryIsWindow = __webpack_require__(70);
	
		var _domHelpersQueryIsWindow2 = _interopRequireDefault(_domHelpersQueryIsWindow);
	
		var _domHelpersOwnerDocument = __webpack_require__(52);
	
		var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);
	
		function isBody(node) {
		  return node && node.tagName.toLowerCase() === 'body';
		}
	
		function bodyIsOverflowing(node) {
		  var doc = _domHelpersOwnerDocument2['default'](node);
		  var win = _domHelpersQueryIsWindow2['default'](doc);
		  var fullWidth = win.innerWidth;
	
		  // Support: ie8, no innerWidth
		  if (!fullWidth) {
		    var documentElementRect = doc.documentElement.getBoundingClientRect();
		    fullWidth = documentElementRect.right - Math.abs(documentElementRect.left);
		  }
	
		  return doc.body.clientWidth < fullWidth;
		}
	
		function isOverflowing(container) {
		  var win = _domHelpersQueryIsWindow2['default'](container);
	
		  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
		}
	
		module.exports = exports['default'];
	
	/***/ },
	/* 70 */
	/***/ function(module, exports) {
	
		'use strict';
	
		module.exports = function getWindow(node) {
		  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
		};
	
	/***/ },
	/* 71 */
	/***/ function(module, exports) {
	
		'use strict';
	
		exports.__esModule = true;
		exports.ariaHidden = ariaHidden;
		exports.hideSiblings = hideSiblings;
		exports.showSiblings = showSiblings;
	
		var BLACKLIST = ['template', 'script', 'style'];
	
		var isHidable = function isHidable(_ref) {
		  var nodeType = _ref.nodeType;
		  var tagName = _ref.tagName;
		  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
		};
	
		var siblings = function siblings(container, mount, cb) {
		  mount = [].concat(mount);
	
		  [].forEach.call(container.children, function (node) {
		    if (mount.indexOf(node) === -1 && isHidable(node)) {
		      cb(node);
		    }
		  });
		};
	
		function ariaHidden(show, node) {
		  if (!node) {
		    return;
		  }
		  if (show) {
		    node.setAttribute('aria-hidden', 'true');
		  } else {
		    node.removeAttribute('aria-hidden');
		  }
		}
	
		function hideSiblings(container, mountNode) {
		  siblings(container, mountNode, function (node) {
		    return ariaHidden(true, node);
		  });
		}
	
		function showSiblings(container, mountNode) {
		  siblings(container, mountNode, function (node) {
		    return ariaHidden(false, node);
		  });
		}
	
	/***/ },
	/* 72 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _domHelpersEventsOn = __webpack_require__(73);
	
		var _domHelpersEventsOn2 = _interopRequireDefault(_domHelpersEventsOn);
	
		var _domHelpersEventsOff = __webpack_require__(74);
	
		var _domHelpersEventsOff2 = _interopRequireDefault(_domHelpersEventsOff);
	
		exports['default'] = function (node, event, handler) {
		  _domHelpersEventsOn2['default'](node, event, handler);
		  return {
		    remove: function remove() {
		      _domHelpersEventsOff2['default'](node, event, handler);
		    }
		  };
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 73 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		var canUseDOM = __webpack_require__(68);
		var on = function on() {};
	
		if (canUseDOM) {
		  on = (function () {
	
		    if (document.addEventListener) return function (node, eventName, handler, capture) {
		      return node.addEventListener(eventName, handler, capture || false);
		    };else if (document.attachEvent) return function (node, eventName, handler) {
		      return node.attachEvent('on' + eventName, handler);
		    };
		  })();
		}
	
		module.exports = on;
	
	/***/ },
	/* 74 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		var canUseDOM = __webpack_require__(68);
		var off = function off() {};
	
		if (canUseDOM) {
	
		  off = (function () {
	
		    if (document.addEventListener) return function (node, eventName, handler, capture) {
		      return node.removeEventListener(eventName, handler, capture || false);
		    };else if (document.attachEvent) return function (node, eventName, handler) {
		      return node.detachEvent('on' + eventName, handler);
		    };
		  })();
		}
	
		module.exports = off;
	
	/***/ },
	/* 75 */
	/***/ function(module, exports) {
	
		/**
		 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
		 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
		 *
		 * We only allow one Listener at a time to avoid stack overflows
		 */
		'use strict';
	
		exports.__esModule = true;
		exports['default'] = addFocusListener;
	
		function addFocusListener(handler) {
		  var useFocusin = !document.addEventListener;
		  var remove = undefined;
	
		  if (useFocusin) {
		    document.attachEvent('onfocusin', handler);
		    remove = function () {
		      return document.detachEvent('onfocusin', handler);
		    };
		  } else {
		    document.addEventListener('focus', handler, true);
		    remove = function () {
		      return document.removeEventListener('focus', handler, true);
		    };
		  }
	
		  return { remove: remove };
		}
	
		module.exports = exports['default'];
	
	/***/ },
	/* 76 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var babelHelpers = __webpack_require__(61);
	
		exports.__esModule = true;
	
		/**
		 * document.activeElement
		 */
		exports['default'] = activeElement;
	
		var _ownerDocument = __webpack_require__(52);
	
		var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);
	
		function activeElement() {
		  var doc = arguments[0] === undefined ? document : arguments[0];
	
		  try {
		    return doc.activeElement;
		  } catch (e) {}
		}
	
		module.exports = exports['default'];
	
	/***/ },
	/* 77 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		var canUseDOM = __webpack_require__(68);
	
		var contains = (function () {
		  var root = canUseDOM && document.documentElement;
	
		  return root && root.contains ? function (context, node) {
		    return context.contains(node);
		  } : root && root.compareDocumentPosition ? function (context, node) {
		    return context === node || !!(context.compareDocumentPosition(node) & 16);
		  } : function (context, node) {
		    if (node) do {
		      if (node === context) return true;
		    } while (node = node.parentNode);
	
		    return false;
		  };
		})();
	
		module.exports = contains;
	
	/***/ },
	/* 78 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
	
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
		exports.default = function (identifier, configure) {
		    return function (Component) {
		        var displayName = Component.displayName || Component.name || "Component";
	
		        (0, _invariant2.default)(identifier && (typeof identifier === "string" || (typeof identifier === "undefined" ? "undefined" : _typeof(identifier)) === "symbol" || typeof identifier === "function"), "Expected identifier to be string, symbol or function. See %s", displayName);
	
		        if (configure) {
		            (0, _invariant2.default)(typeof configure === "function", "Expected configure to be a function. See %s", displayName);
		        }
	
		        return _react2.default.createClass({
		            displayName: displayName + "ContextMenuLayer",
		            getDefaultProps: function getDefaultProps() {
		                return {
		                    renderTag: "div",
		                    attributes: {}
		                };
		            },
		            handleContextClick: function handleContextClick(event) {
		                var currentItem = typeof configure === "function" ? configure(this.props) : {};
	
		                (0, _invariant2.default)((0, _lodash2.default)(currentItem), "Expected configure to return an object. See %s", displayName);
	
		                event.preventDefault();
	
		                _store2.default.dispatch({
		                    type: "SET_PARAMS",
		                    data: {
		                        x: event.clientX,
		                        y: event.clientY,
		                        currentItem: currentItem,
		                        isVisible: typeof identifier === "function" ? identifier(this.props) : identifier
		                    }
		                });
		            },
		            render: function render() {
		                var _props = this.props;
		                var _props$attributes = _props.attributes;
		                var _props$attributes$cla = _props$attributes.className;
		                var className = _props$attributes$cla === undefined ? "" : _props$attributes$cla;
	
		                var attributes = _objectWithoutProperties(_props$attributes, ["className"]);
	
		                var renderTag = _props.renderTag;
	
		                var props = _objectWithoutProperties(_props, ["attributes", "renderTag"]);
	
		                attributes.className = "react-context-menu-wrapper " + className;
		                attributes.onContextMenu = this.handleContextClick;
	
		                return _react2.default.createElement(renderTag, attributes, _react2.default.createElement(Component, props));
		            }
		        });
		    };
		};
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _invariant = __webpack_require__(79);
	
		var _invariant2 = _interopRequireDefault(_invariant);
	
		var _lodash = __webpack_require__(80);
	
		var _lodash2 = _interopRequireDefault(_lodash);
	
		var _store = __webpack_require__(26);
	
		var _store2 = _interopRequireDefault(_store);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/***/ },
	/* 79 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(process) {/**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
	
		'use strict';
	
		/**
		 * Use invariant() to assert state which your program assumes to be true.
		 *
		 * Provide sprintf-style format (only %s is supported) and arguments
		 * to provide information about what broke and what you were
		 * expecting.
		 *
		 * The invariant message will be stripped in production, but the invariant
		 * will remain to ensure logic does not differ in production.
		 */
	
		var invariant = function(condition, format, a, b, c, d, e, f) {
		  if (process.env.NODE_ENV !== 'production') {
		    if (format === undefined) {
		      throw new Error('invariant requires an error message argument');
		    }
		  }
	
		  if (!condition) {
		    var error;
		    if (format === undefined) {
		      error = new Error(
		        'Minified exception occurred; use the non-minified dev environment ' +
		        'for the full error message and additional helpful warnings.'
		      );
		    } else {
		      var args = [a, b, c, d, e, f];
		      var argIndex = 0;
		      error = new Error(
		        format.replace(/%s/g, function() { return args[argIndex++]; })
		      );
		      error.name = 'Invariant Violation';
		    }
	
		    error.framesToPop = 1; // we don't care about invariant's own frame
		    throw error;
		  }
		};
	
		module.exports = invariant;
	
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))
	
	/***/ },
	/* 80 */
	/***/ function(module, exports) {
	
		/**
		 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
		 * Build: `lodash modern modularize exports="npm" -o ./`
		 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
		 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
		 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
		 * Available under MIT license <https://lodash.com/license>
		 */
	
		/**
		 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
		 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
		 * @example
		 *
		 * _.isObject({});
		 * // => true
		 *
		 * _.isObject([1, 2, 3]);
		 * // => true
		 *
		 * _.isObject(1);
		 * // => false
		 */
		function isObject(value) {
		  // Avoid a V8 JIT bug in Chrome 19-20.
		  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
		  var type = typeof value;
		  return !!value && (type == 'object' || type == 'function');
		}
	
		module.exports = isObject;
	
	
	/***/ },
	/* 81 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _classnames = __webpack_require__(82);
	
		var _classnames2 = _interopRequireDefault(_classnames);
	
		var _objectAssign = __webpack_require__(42);
	
		var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
		var _monitor = __webpack_require__(44);
	
		var _monitor2 = _interopRequireDefault(_monitor);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
		var PropTypes = _react2.default.PropTypes;
	
	
		var MenuItem = _react2.default.createClass({
		    displayName: "MenuItem",
		    propTypes: {
		        onClick: PropTypes.func.isRequired,
		        data: PropTypes.object,
		        disabled: PropTypes.bool,
		        preventClose: PropTypes.bool
		    },
		    getDefaultProps: function getDefaultProps() {
		        return {
		            disabled: false,
		            data: {},
		            attributes: {}
		        };
		    },
		    handleClick: function handleClick(event) {
		        var _props = this.props;
		        var disabled = _props.disabled;
		        var onClick = _props.onClick;
		        var data = _props.data;
		        var preventClose = _props.preventClose;
	
	
		        event.preventDefault();
	
		        if (disabled) return;
	
		        (0, _objectAssign2.default)(data, _monitor2.default.getItem());
	
		        if (typeof onClick === "function") {
		            onClick(event, data);
		        }
	
		        if (preventClose) return;
	
		        _monitor2.default.hideMenu();
		    },
		    render: function render() {
		        var _props2 = this.props;
		        var disabled = _props2.disabled;
		        var children = _props2.children;
		        var _props2$attributes = _props2.attributes;
		        var _props2$attributes$cl = _props2$attributes.className;
		        var className = _props2$attributes$cl === undefined ? "" : _props2$attributes$cl;
		        var props = _objectWithoutProperties(_props2$attributes, ["className"]);
		        var menuItemClassNames = "react-context-menu-item " + className;
	
		        var classes = (0, _classnames2.default)({
		            "react-context-menu-link": true,
		            disabled: disabled
		        });
	
		        return _react2.default.createElement(
		            "div",
		            _extends({ className: menuItemClassNames }, props),
		            _react2.default.createElement(
		                "a",
		                { href: "#", className: classes, onClick: this.handleClick },
		                children
		            )
		        );
		    }
		});
	
		exports.default = MenuItem;
	
	/***/ },
	/* 82 */
	/***/ function(module, exports, __webpack_require__) {
	
		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
		  Copyright (c) 2016 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/
		/* global define */
	
		(function () {
			'use strict';
	
			var hasOwn = {}.hasOwnProperty;
	
			function classNames () {
				var classes = [];
	
				for (var i = 0; i < arguments.length; i++) {
					var arg = arguments[i];
					if (!arg) continue;
	
					var argType = typeof arg;
	
					if (argType === 'string' || argType === 'number') {
						classes.push(arg);
					} else if (Array.isArray(arg)) {
						classes.push(classNames.apply(null, arg));
					} else if (argType === 'object') {
						for (var key in arg) {
							if (hasOwn.call(arg, key) && arg[key]) {
								classes.push(key);
							}
						}
					}
				}
	
				return classes.join(' ');
			}
	
			if (typeof module !== 'undefined' && module.exports) {
				module.exports = classNames;
			} else if (true) {
				// register as 'classnames', consistent with npm package name
				!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
					return classNames;
				}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			} else {
				window.classNames = classNames;
			}
		}());
	
	
	/***/ },
	/* 83 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _classnames = __webpack_require__(82);
	
		var _classnames2 = _interopRequireDefault(_classnames);
	
		var _wrapper = __webpack_require__(84);
	
		var _wrapper2 = _interopRequireDefault(_wrapper);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		var menuStyles = {
		    position: "relative",
		    zIndex: "auto"
		};
	
		var SubMenu = _react2.default.createClass({
		    displayName: "SubMenu",
		    propTypes: {
		        title: _react2.default.PropTypes.string.isRequired,
		        disabled: _react2.default.PropTypes.bool,
		        hoverDelay: _react2.default.PropTypes.number
		    },
		    getDefaultProps: function getDefaultProps() {
		        return {
		            hoverDelay: 500
		        };
		    },
		    getInitialState: function getInitialState() {
		        return {
		            visible: false
		        };
		    },
		    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		        return this.state.isVisible !== nextState.visible;
		    },
		    handleClick: function handleClick(e) {
		        e.preventDefault();
		    },
		    handleMouseEnter: function handleMouseEnter() {
		        var _this = this;
	
		        if (this.closetimer) clearTimeout(this.closetimer);
	
		        if (this.props.disabled || this.state.visible) return;
	
		        this.opentimer = setTimeout(function () {
		            return _this.setState({ visible: true });
		        }, this.props.hoverDelay);
		    },
		    handleMouseLeave: function handleMouseLeave() {
		        var _this2 = this;
	
		        if (this.opentimer) clearTimeout(this.opentimer);
	
		        if (!this.state.visible) return;
	
		        this.closetimer = setTimeout(function () {
		            return _this2.setState({ visible: false });
		        }, this.props.hoverDelay);
		    },
		    render: function render() {
		        var _this3 = this;
	
		        var _props = this.props;
		        var disabled = _props.disabled;
		        var children = _props.children;
		        var title = _props.title;
		        var visible = this.state.visible;
	
	
		        var classes = (0, _classnames2.default)({
		            "react-context-menu-link": true,
		            disabled: disabled,
		            active: visible
		        }),
		            menuClasses = "react-context-menu-item submenu";
	
		        return _react2.default.createElement(
		            "div",
		            { ref: function ref(c) {
		                    return _this3.item = c;
		                }, className: menuClasses, style: menuStyles,
		                onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
		            _react2.default.createElement(
		                "a",
		                { href: "#", className: classes, onClick: this.handleClick },
		                title
		            ),
		            _react2.default.createElement(
		                _wrapper2.default,
		                { visible: visible },
		                children
		            )
		        );
		    }
		});
	
		exports.default = SubMenu;
	
	/***/ },
	/* 84 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		var SubMenuWrapper = _react2.default.createClass({
		    displayName: "SubMenuWrapper",
		    propTypes: {
		        visible: _react2.default.PropTypes.bool
		    },
		    getInitialState: function getInitialState() {
		        return {
		            position: {
		                top: true,
		                right: true
		            }
		        };
		    },
		    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		        var _this = this;
	
		        if (nextProps.visible) {
		            var wrapper = window.requestAnimationFrame || setTimeout;
	
		            wrapper(function () {
		                _this.setState(_this.getMenuPosition());
		                _this.forceUpdate();
		            });
		        } else {
		            this.setState(this.getInitialState());
		        }
		    },
		    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		        return this.props.visible !== nextProps.visible;
		    },
		    getMenuPosition: function getMenuPosition() {
		        var _window = window;
		        var innerWidth = _window.innerWidth;
		        var innerHeight = _window.innerHeight;
		        var rect = this.menu.getBoundingClientRect();
		        var position = {};
	
		        if (rect.bottom > innerHeight) {
		            position.bottom = true;
		        } else {
		            position.top = true;
		        }
	
		        if (rect.right > innerWidth) {
		            position.left = true;
		        } else {
		            position.right = true;
		        }
	
		        return { position: position };
		    },
		    getPositionStyles: function getPositionStyles() {
		        var style = {};
		        var position = this.state.position;
	
	
		        if (position.top) style.top = 0;
		        if (position.bottom) style.bottom = 0;
		        if (position.right) style.left = "100%";
		        if (position.left) style.right = "100%";
	
		        return style;
		    },
		    render: function render() {
		        var _this2 = this;
	
		        var _props = this.props;
		        var children = _props.children;
		        var visible = _props.visible;
	
	
		        var style = _extends({
		            display: visible ? "block" : "none",
		            position: "absolute"
		        }, this.getPositionStyles());
	
		        return _react2.default.createElement(
		            "nav",
		            { ref: function ref(c) {
		                    return _this2.menu = c;
		                }, style: style, className: "react-context-menu" },
		            children
		        );
		    }
		});
	
		exports.default = SubMenuWrapper;
	
	/***/ },
	/* 85 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		exports.default = function (Component) {
		    var displayName = Component.displayName || Component.name || "Component";
	
		    return _react2.default.createClass({
		        displayName: "ContextMenuConnector(" + displayName + ")",
		        getInitialState: function getInitialState() {
		            return {
		                item: _store2.default.getState().currentItem
		            };
		        },
		        componentDidMount: function componentDidMount() {
		            this.unsubscribe = _store2.default.subscribe(this.handleUpdate);
		        },
		        componentWillUnmount: function componentWillUnmount() {
		            this.unsubscribe();
		        },
		        handleUpdate: function handleUpdate() {
		            this.setState(this.getInitialState());
		        },
		        render: function render() {
		            return _react2.default.createElement(Component, _extends({}, this.props, { item: this.state.item }));
		        }
		    });
		};
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _store = __webpack_require__(26);
	
		var _store2 = _interopRequireDefault(_store);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/***/ },
	/* 86 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _reactDom = __webpack_require__(3);
	
		var _reactDom2 = _interopRequireDefault(_reactDom);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var ScrollShim = {
		  appendScrollShim: function appendScrollShim() {
		    if (!this._scrollShim) {
		      var size = this._scrollShimSize();
		      var shim = document.createElement('div');
		      if (shim.classList) {
		        shim.classList.add('react-grid-ScrollShim'); // flow - not compatible with HTMLElement
		      } else {
		          shim.className += ' react-grid-ScrollShim';
		        }
		      shim.style.position = 'absolute';
		      shim.style.top = 0;
		      shim.style.left = 0;
		      shim.style.width = size.width + 'px';
		      shim.style.height = size.height + 'px';
		      _reactDom2['default'].findDOMNode(this).appendChild(shim);
		      this._scrollShim = shim;
		    }
		    this._scheduleRemoveScrollShim();
		  },
		  _scrollShimSize: function _scrollShimSize() {
		    return {
		      width: this.props.width,
		      height: this.props.length * this.props.rowHeight
		    };
		  },
		  _scheduleRemoveScrollShim: function _scheduleRemoveScrollShim() {
		    if (this._scheduleRemoveScrollShimTimer) {
		      clearTimeout(this._scheduleRemoveScrollShimTimer);
		    }
		    this._scheduleRemoveScrollShimTimer = setTimeout(this._removeScrollShim, 200);
		  },
		  _removeScrollShim: function _removeScrollShim() {
		    if (this._scrollShim) {
		      this._scrollShim.parentNode.removeChild(this._scrollShim);
		      this._scrollShim = undefined;
		    }
		  }
		};
	
		module.exports = ScrollShim;
	
	/***/ },
	/* 87 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var React = __webpack_require__(2);
		var joinClasses = __webpack_require__(6);
		var Cell = __webpack_require__(88);
		var ColumnMetrics = __webpack_require__(8);
		var ColumnUtilsMixin = __webpack_require__(10);
		var cellMetaDataShape = __webpack_require__(94);
		var PropTypes = React.PropTypes;
	
		var Row = React.createClass({
		  displayName: 'Row',
	
	
		  propTypes: {
		    height: PropTypes.number.isRequired,
		    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
		    row: PropTypes.any.isRequired,
		    cellRenderer: PropTypes.func,
		    cellMetaData: PropTypes.shape(cellMetaDataShape),
		    isSelected: PropTypes.bool,
		    idx: PropTypes.number.isRequired,
		    key: PropTypes.string,
		    expandedRows: PropTypes.arrayOf(PropTypes.object),
		    extraClasses: PropTypes.string,
		    forceUpdate: PropTypes.bool
		  },
	
		  mixins: [ColumnUtilsMixin],
	
		  getDefaultProps: function getDefaultProps() {
		    return {
		      cellRenderer: Cell,
		      isSelected: false,
		      height: 35
		    };
		  },
		  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		    return !ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn) || this.doesRowContainSelectedCell(this.props) || this.doesRowContainSelectedCell(nextProps) || this.willRowBeDraggedOver(nextProps) || nextProps.row !== this.props.row || this.hasRowBeenCopied() || this.props.isSelected !== nextProps.isSelected || nextProps.height !== this.props.height || this.props.forceUpdate === true;
		  },
		  handleDragEnter: function handleDragEnter() {
		    var handleDragEnterRow = this.props.cellMetaData.handleDragEnterRow;
		    if (handleDragEnterRow) {
		      handleDragEnterRow(this.props.idx);
		    }
		  },
		  getSelectedColumn: function getSelectedColumn() {
		    if (this.props.cellMetaData) {
		      var selected = this.props.cellMetaData.selected;
		      if (selected && selected.idx) {
		        return this.getColumn(this.props.columns, selected.idx);
		      }
		    }
		  },
		  getCells: function getCells() {
		    var _this = this;
	
		    var cells = [];
		    var lockedCells = [];
		    var selectedColumn = this.getSelectedColumn();
	
		    if (this.props.columns) {
		      this.props.columns.forEach(function (column, i) {
		        var CellRenderer = _this.props.cellRenderer;
		        var cell = React.createElement(CellRenderer, {
		          ref: i,
		          key: column.key + '-' + i,
		          idx: i,
		          rowIdx: _this.props.idx,
		          value: _this.getCellValue(column.key || i),
		          column: column,
		          height: _this.getRowHeight(),
		          formatter: column.formatter,
		          cellMetaData: _this.props.cellMetaData,
		          rowData: _this.props.row,
		          selectedColumn: selectedColumn,
		          isRowSelected: _this.props.isSelected });
		        if (column.locked) {
		          lockedCells.push(cell);
		        } else {
		          cells.push(cell);
		        }
		      });
		    }
	
		    return cells.concat(lockedCells);
		  },
		  getRowHeight: function getRowHeight() {
		    var rows = this.props.expandedRows || null;
		    if (rows && this.props.key) {
		      var row = rows[this.props.key] || null;
		      if (row) {
		        return row.height;
		      }
		    }
		    return this.props.height;
		  },
		  getCellValue: function getCellValue(key) {
		    var val = void 0;
		    if (key === 'select-row') {
		      return this.props.isSelected;
		    } else if (typeof this.props.row.get === 'function') {
		      val = this.props.row.get(key);
		    } else {
		      val = this.props.row[key];
		    }
		    return val;
		  },
		  setScrollLeft: function setScrollLeft(scrollLeft) {
		    var _this2 = this;
	
		    this.props.columns.forEach(function (column, i) {
		      if (column.locked) {
		        if (!_this2.refs[i]) return;
		        _this2.refs[i].setScrollLeft(scrollLeft);
		      }
		    });
		  },
		  doesRowContainSelectedCell: function doesRowContainSelectedCell(props) {
		    var selected = props.cellMetaData.selected;
		    if (selected && selected.rowIdx === props.idx) {
		      return true;
		    }
	
		    return false;
		  },
		  isContextMenuDisplayed: function isContextMenuDisplayed() {
		    if (this.props.cellMetaData) {
		      var selected = this.props.cellMetaData.selected;
		      if (selected && selected.contextMenuDisplayed && selected.rowIdx === this.props.idx) {
		        return true;
		      }
		    }
		    return false;
		  },
		  willRowBeDraggedOver: function willRowBeDraggedOver(props) {
		    var dragged = props.cellMetaData.dragged;
		    return dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);
		  },
		  hasRowBeenCopied: function hasRowBeenCopied() {
		    var copied = this.props.cellMetaData.copied;
		    return copied != null && copied.rowIdx === this.props.idx;
		  },
		  renderCell: function renderCell(props) {
		    if (typeof this.props.cellRenderer === 'function') {
		      this.props.cellRenderer.call(this, props);
		    }
		    if (React.isValidElement(this.props.cellRenderer)) {
		      return React.cloneElement(this.props.cellRenderer, props);
		    }
	
		    return this.props.cellRenderer(props);
		  },
		  render: function render() {
		    var className = joinClasses('react-grid-Row', 'react-grid-Row--' + (this.props.idx % 2 === 0 ? 'even' : 'odd'), {
		      'row-selected': this.props.isSelected,
		      'row-context-menu': this.isContextMenuDisplayed()
		    }, this.props.extraClasses);
	
		    var style = {
		      height: this.getRowHeight(this.props),
		      overflow: 'hidden'
		    };
	
		    var cells = this.getCells();
		    return React.createElement(
		      'div',
		      _extends({}, this.props, { className: className, style: style, onDragEnter: this.handleDragEnter }),
		      React.isValidElement(this.props.row) ? this.props.row : cells
		    );
		  }
		});
	
		module.exports = Row;
	
	/***/ },
	/* 88 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		var React = __webpack_require__(2);
		var ReactDOM = __webpack_require__(3);
		var joinClasses = __webpack_require__(6);
		var EditorContainer = __webpack_require__(89);
		var ExcelColumn = __webpack_require__(15);
		var isFunction = __webpack_require__(93);
		var CellMetaDataShape = __webpack_require__(94);
		var SimpleCellFormatter = __webpack_require__(95);
		var ColumnUtils = __webpack_require__(10);
	
		var Cell = React.createClass({
		  displayName: 'Cell',
	
	
		  propTypes: {
		    rowIdx: React.PropTypes.number.isRequired,
		    idx: React.PropTypes.number.isRequired,
		    selected: React.PropTypes.shape({
		      idx: React.PropTypes.number.isRequired
		    }),
		    selectedColumn: React.PropTypes.object,
		    height: React.PropTypes.number,
		    tabIndex: React.PropTypes.number,
		    ref: React.PropTypes.string,
		    column: React.PropTypes.shape(ExcelColumn).isRequired,
		    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
		    isExpanded: React.PropTypes.bool,
		    isRowSelected: React.PropTypes.bool,
		    cellMetaData: React.PropTypes.shape(CellMetaDataShape).isRequired,
		    handleDragStart: React.PropTypes.func,
		    className: React.PropTypes.string,
		    cellControls: React.PropTypes.any,
		    rowData: React.PropTypes.object.isRequired,
		    forceUpdate: React.PropTypes.bool
		  },
	
		  getDefaultProps: function getDefaultProps() {
		    return {
		      tabIndex: -1,
		      ref: 'cell',
		      isExpanded: false
		    };
		  },
	
		  getInitialState: function getInitialState() {
		    return {
		      isCellValueChanging: false,
		      oldRowData: {},
		      newRowData: {}
		    };
		  },
	
	
		  componentDidMount: function componentDidMount() {
		    this.checkFocus();
		  },
	
		  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		    this.setState({
		      isCellValueChanging: this.props.value !== nextProps.value,
		      oldRowData: this.props.rowData,
		      newRowData: nextProps.rowData
		    });
		  },
	
	
		  componentDidUpdate: function componentDidUpdate() {
		    this.checkFocus();
		    var dragged = this.props.cellMetaData.dragged;
		    if (dragged && dragged.complete === true) {
		      this.props.cellMetaData.handleTerminateDrag();
		    }
		    if (this.state.isCellValueChanging && this.props.selectedColumn != null) {
		      this.applyUpdateClass();
		    }
		  },
	
		  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		    return this.props.column.width !== nextProps.column.width || this.props.column.left !== nextProps.column.left || this.props.height !== nextProps.height || this.props.rowIdx !== nextProps.rowIdx || this.isCellSelectionChanging(nextProps) || this.isDraggedCellChanging(nextProps) || this.isCopyCellChanging(nextProps) || this.props.isRowSelected !== nextProps.isRowSelected || this.isSelected() || this.props.value !== nextProps.value || this.props.forceUpdate === true;
		  },
		  onCellClick: function onCellClick(e) {
		    var meta = this.props.cellMetaData;
		    if (meta != null && meta.onCellClick && typeof meta.onCellClick === 'function') {
		      meta.onCellClick({ rowIdx: this.props.rowIdx, idx: this.props.idx }, e);
		    }
		  },
		  onCellContextMenu: function onCellContextMenu() {
		    var meta = this.props.cellMetaData;
		    if (meta != null && meta.onCellContextMenu && typeof meta.onCellContextMenu === 'function') {
		      meta.onCellContextMenu({ rowIdx: this.props.rowIdx, idx: this.props.idx });
		    }
		  },
		  onCellDoubleClick: function onCellDoubleClick(e) {
		    var meta = this.props.cellMetaData;
		    if (meta != null && meta.onCellDoubleClick && typeof meta.onCellDoubleClick === 'function') {
		      meta.onCellDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx }, e);
		    }
		  },
		  onDragHandleDoubleClick: function onDragHandleDoubleClick(e) {
		    e.stopPropagation();
		    var meta = this.props.cellMetaData;
		    if (meta != null && meta.onDragHandleDoubleClick && typeof meta.onDragHandleDoubleClick === 'function') {
		      meta.onDragHandleDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.getRowData(), e: e });
		    }
		  },
	
	
		  onDragOver: function onDragOver(e) {
		    e.preventDefault();
		  },
	
		  getStyle: function getStyle() {
		    var style = {
		      position: 'absolute',
		      width: this.props.column.width,
		      height: this.props.height,
		      left: this.props.column.left
		    };
		    return style;
		  },
		  getFormatter: function getFormatter() {
		    var col = this.props.column;
		    if (this.isActive()) {
		      return React.createElement(EditorContainer, { rowData: this.getRowData(), rowIdx: this.props.rowIdx, idx: this.props.idx, cellMetaData: this.props.cellMetaData, column: col, height: this.props.height });
		    }
	
		    return this.props.column.formatter;
		  },
		  getRowData: function getRowData() {
		    return this.props.rowData.toJSON ? this.props.rowData.toJSON() : this.props.rowData;
		  },
		  getFormatterDependencies: function getFormatterDependencies() {
		    // convention based method to get corresponding Id or Name of any Name or Id property
		    if (typeof this.props.column.getRowMetaData === 'function') {
		      return this.props.column.getRowMetaData(this.getRowData(), this.props.column);
		    }
		  },
	
	
		  getCellClass: function getCellClass() {
		    var className = joinClasses(this.props.column.cellClass, 'react-grid-Cell', this.props.className, this.props.column.locked ? 'react-grid-Cell--locked' : null);
		    var extraClasses = joinClasses({
		      'row-selected': this.props.isRowSelected,
		      selected: this.isSelected() && !this.isActive() && this.isCellSelectEnabled(),
		      editing: this.isActive(),
		      copied: this.isCopied() || this.wasDraggedOver() || this.isDraggedOverUpwards() || this.isDraggedOverDownwards(),
		      'active-drag-cell': this.isSelected() || this.isDraggedOver(),
		      'is-dragged-over-up': this.isDraggedOverUpwards(),
		      'is-dragged-over-down': this.isDraggedOverDownwards(),
		      'was-dragged-over': this.wasDraggedOver()
		    });
		    return joinClasses(className, extraClasses);
		  },
	
		  getUpdateCellClass: function getUpdateCellClass() {
		    return this.props.column.getUpdateCellClass ? this.props.column.getUpdateCellClass(this.props.selectedColumn, this.props.column, this.state.isCellValueChanging, this.state.oldRowData, this.state.newRowData) : '';
		  },
		  isColumnSelected: function isColumnSelected() {
		    var meta = this.props.cellMetaData;
		    if (meta == null) {
		      return false;
		    }
	
		    return meta.selected && meta.selected.idx === this.props.idx;
		  },
	
	
		  isSelected: function isSelected() {
		    var meta = this.props.cellMetaData;
		    if (meta == null) {
		      return false;
		    }
	
		    return meta.selected && meta.selected.rowIdx === this.props.rowIdx && meta.selected.idx === this.props.idx;
		  },
	
		  isActive: function isActive() {
		    var meta = this.props.cellMetaData;
		    if (meta == null) {
		      return false;
		    }
		    return this.isSelected() && meta.selected.active === true;
		  },
		  isCellSelectionChanging: function isCellSelectionChanging(nextProps) {
		    var meta = this.props.cellMetaData;
		    if (meta == null) {
		      return false;
		    }
		    var nextSelected = nextProps.cellMetaData.selected;
		    if (meta.selected && nextSelected) {
		      return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;
		    }
	
		    return true;
		  },
		  isCellSelectEnabled: function isCellSelectEnabled() {
		    var meta = this.props.cellMetaData;
		    if (meta == null) {
		      return false;
		    }
		    return meta.enableCellSelect;
		  },
		  applyUpdateClass: function applyUpdateClass() {
		    var updateCellClass = this.getUpdateCellClass();
		    // -> removing the class
		    if (updateCellClass != null && updateCellClass !== '') {
		      var cellDOMNode = ReactDOM.findDOMNode(this);
		      if (cellDOMNode.classList) {
		        cellDOMNode.classList.remove(updateCellClass);
		        // -> and re-adding the class
		        cellDOMNode.classList.add(updateCellClass);
		      } else if (cellDOMNode.className.indexOf(updateCellClass) === -1) {
		        // IE9 doesn't support classList, nor (I think) altering element.className
		        // without replacing it wholesale.
		        cellDOMNode.className = cellDOMNode.className + ' ' + updateCellClass;
		      }
		    }
		  },
		  setScrollLeft: function setScrollLeft(scrollLeft) {
		    var ctrl = this; // flow on windows has an outdated react declaration, once that gets updated, we can remove this
		    if (ctrl.isMounted()) {
		      var node = ReactDOM.findDOMNode(this);
		      var transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
		      node.style.webkitTransform = transform;
		      node.style.transform = transform;
		    }
		  },
		  isCopied: function isCopied() {
		    var copied = this.props.cellMetaData.copied;
		    return copied && copied.rowIdx === this.props.rowIdx && copied.idx === this.props.idx;
		  },
		  isDraggedOver: function isDraggedOver() {
		    var dragged = this.props.cellMetaData.dragged;
		    return dragged && dragged.overRowIdx === this.props.rowIdx && dragged.idx === this.props.idx;
		  },
		  wasDraggedOver: function wasDraggedOver() {
		    var dragged = this.props.cellMetaData.dragged;
		    return dragged && (dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < dragged.rowIdx || dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > dragged.rowIdx) && dragged.idx === this.props.idx;
		  },
		  isDraggedCellChanging: function isDraggedCellChanging(nextProps) {
		    var isChanging = void 0;
		    var dragged = this.props.cellMetaData.dragged;
		    var nextDragged = nextProps.cellMetaData.dragged;
		    if (dragged) {
		      isChanging = nextDragged && this.props.idx === nextDragged.idx || dragged && this.props.idx === dragged.idx;
		      return isChanging;
		    }
	
		    return false;
		  },
		  isCopyCellChanging: function isCopyCellChanging(nextProps) {
		    var isChanging = void 0;
		    var copied = this.props.cellMetaData.copied;
		    var nextCopied = nextProps.cellMetaData.copied;
		    if (copied) {
		      isChanging = nextCopied && this.props.idx === nextCopied.idx || copied && this.props.idx === copied.idx;
		      return isChanging;
		    }
		    return false;
		  },
		  isDraggedOverUpwards: function isDraggedOverUpwards() {
		    var dragged = this.props.cellMetaData.dragged;
		    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;
		  },
		  isDraggedOverDownwards: function isDraggedOverDownwards() {
		    var dragged = this.props.cellMetaData.dragged;
		    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;
		  },
	
	
		  checkFocus: function checkFocus() {
		    if (this.isSelected() && !this.isActive()) {
		      // determine the parent viewport element of this cell
		      var parentViewport = ReactDOM.findDOMNode(this);
		      while (parentViewport != null && parentViewport.className.indexOf('react-grid-Viewport') === -1) {
		        parentViewport = parentViewport.parentElement;
		      }
		      var focusInGrid = false;
		      // if the focus is on the body of the document, the user won't mind if we focus them on a cell
		      if (document.activeElement == null || document.activeElement.nodeName && typeof document.activeElement.nodeName === 'string' && document.activeElement.nodeName.toLowerCase() === 'body') {
		        focusInGrid = true;
		        // otherwise
		      } else {
		          // only pull focus if the currently focused element is contained within the viewport
		          if (parentViewport) {
		            var focusedParent = document.activeElement;
		            while (focusedParent != null) {
		              if (focusedParent === parentViewport) {
		                focusInGrid = true;
		                break;
		              }
		              focusedParent = focusedParent.parentElement;
		            }
		          }
		        }
		      if (focusInGrid) {
		        ReactDOM.findDOMNode(this).focus();
		      }
		    }
		  },
	
		  createColumEventCallBack: function createColumEventCallBack(onColumnEvent, info) {
		    return function (e) {
		      onColumnEvent(e, info);
		    };
		  },
		  createCellEventCallBack: function createCellEventCallBack(gridEvent, columnEvent) {
		    return function (e) {
		      gridEvent(e);
		      columnEvent(e);
		    };
		  },
		  createEventDTO: function createEventDTO(gridEvents, columnEvents, onColumnEvent) {
		    var allEvents = Object.assign({}, gridEvents);
	
		    for (var eventKey in columnEvents) {
		      if (columnEvents.hasOwnProperty(eventKey)) {
		        var event = columnEvents[event];
		        var eventInfo = { rowIdx: this.props.rowIdx, idx: this.props.idx, name: eventKey };
		        var eventCallback = this.createColumEventCallBack(onColumnEvent, eventInfo);
	
		        if (allEvents.hasOwnProperty(eventKey)) {
		          var currentEvent = allEvents[eventKey];
		          allEvents[eventKey] = this.createCellEventCallBack(currentEvent, eventCallback);
		        } else {
		          allEvents[eventKey] = eventCallback;
		        }
		      }
		    }
	
		    return allEvents;
		  },
		  getEvents: function getEvents() {
		    var columnEvents = this.props.column ? Object.assign({}, this.props.column.events) : undefined;
		    var onColumnEvent = this.props.cellMetaData ? this.props.cellMetaData.onColumnEvent : undefined;
		    var gridEvents = {
		      onClick: this.onCellClick,
		      onDoubleClick: this.onCellDoubleClick,
		      onDragOver: this.onDragOver
		    };
	
		    if (!columnEvents || !onColumnEvent) {
		      return gridEvents;
		    }
	
		    return this.createEventDTO(gridEvents, columnEvents, onColumnEvent);
		  },
		  renderCellContent: function renderCellContent(props) {
		    var CellContent = void 0;
		    var Formatter = this.getFormatter();
		    if (React.isValidElement(Formatter)) {
		      props.dependentValues = this.getFormatterDependencies();
		      CellContent = React.cloneElement(Formatter, props);
		    } else if (isFunction(Formatter)) {
		      CellContent = React.createElement(Formatter, { value: this.props.value, dependentValues: this.getFormatterDependencies() });
		    } else {
		      CellContent = React.createElement(SimpleCellFormatter, { value: this.props.value });
		    }
		    return React.createElement(
		      'div',
		      { ref: 'cell',
		        className: 'react-grid-Cell__value' },
		      CellContent,
		      ' ',
		      this.props.cellControls
		    );
		  },
		  render: function render() {
		    var style = this.getStyle();
	
		    var className = this.getCellClass();
	
		    var cellContent = this.renderCellContent({
		      value: this.props.value,
		      column: this.props.column,
		      rowIdx: this.props.rowIdx,
		      isExpanded: this.props.isExpanded
		    });
	
		    var dragHandle = !this.isActive() && ColumnUtils.canEdit(this.props.column, this.props.rowData, this.props.cellMetaData.enableCellSelect) ? React.createElement(
		      'div',
		      { className: 'drag-handle', draggable: 'true', onDoubleClick: this.onDragHandleDoubleClick },
		      React.createElement('span', { style: { display: 'none' } })
		    ) : null;
		    var events = this.getEvents();
		    return React.createElement(
		      'div',
		      _extends({}, this.props, { className: className, style: style, onContextMenu: this.onCellContextMenu }, events),
		      cellContent,
		      dragHandle
		    );
		  }
		});
	
		module.exports = Cell;
	
	/***/ },
	/* 89 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
		var joinClasses = __webpack_require__(6);
		var keyboardHandlerMixin = __webpack_require__(90);
		var SimpleTextEditor = __webpack_require__(91);
		var isFunction = __webpack_require__(93);
	
		var EditorContainer = React.createClass({
		  displayName: 'EditorContainer',
	
		  mixins: [keyboardHandlerMixin],
	
		  propTypes: {
		    rowIdx: React.PropTypes.number,
		    rowData: React.PropTypes.object.isRequired,
		    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
		    cellMetaData: React.PropTypes.shape({
		      selected: React.PropTypes.object.isRequired,
		      copied: React.PropTypes.object,
		      dragged: React.PropTypes.object,
		      onCellClick: React.PropTypes.func,
		      onCellDoubleClick: React.PropTypes.func,
		      onCommitCancel: React.PropTypes.func,
		      onCommit: React.PropTypes.func
		    }).isRequired,
		    column: React.PropTypes.object.isRequired,
		    height: React.PropTypes.number.isRequired
		  },
	
		  changeCommitted: false,
	
		  getInitialState: function getInitialState() {
		    return { isInvalid: false };
		  },
	
	
		  componentDidMount: function componentDidMount() {
		    var inputNode = this.getInputNode();
		    if (inputNode !== undefined) {
		      this.setTextInputFocus();
		      if (!this.getEditor().disableContainerStyles) {
		        inputNode.className += ' editor-main';
		        inputNode.style.height = this.props.height - 1 + 'px';
		      }
		    }
		  },
	
		  componentWillUnmount: function componentWillUnmount() {
		    if (!this.changeCommitted && !this.hasEscapeBeenPressed()) {
		      this.commit({ key: 'Enter' });
		    }
		  },
	
		  createEditor: function createEditor() {
		    var _this = this;
	
		    var editorRef = function editorRef(c) {
		      return _this.editor = c;
		    };
		    var editorProps = {
		      ref: editorRef,
		      column: this.props.column,
		      value: this.getInitialValue(),
		      onCommit: this.commit,
		      rowMetaData: this.getRowMetaData(),
		      height: this.props.height,
		      onBlur: this.commit,
		      onOverrideKeyDown: this.onKeyDown
		    };
	
		    var customEditor = this.props.column.editor;
		    if (customEditor && React.isValidElement(customEditor)) {
		      // return custom column editor or SimpleEditor if none specified
		      return React.cloneElement(customEditor, editorProps);
		    }
	
		    return React.createElement(SimpleTextEditor, { ref: editorRef, column: this.props.column, value: this.getInitialValue(), onBlur: this.commit, rowMetaData: this.getRowMetaData(), onKeyDown: function onKeyDown() {}, commit: function commit() {} });
		  },
		  onPressEnter: function onPressEnter() {
		    this.commit({ key: 'Enter' });
		  },
		  onPressTab: function onPressTab() {
		    this.commit({ key: 'Tab' });
		  },
		  onPressEscape: function onPressEscape(e) {
		    if (!this.editorIsSelectOpen()) {
		      this.props.cellMetaData.onCommitCancel();
		    } else {
		      // prevent event from bubbling if editor has results to select
		      e.stopPropagation();
		    }
		  },
		  onPressArrowDown: function onPressArrowDown(e) {
		    if (this.editorHasResults()) {
		      // dont want to propogate as that then moves us round the grid
		      e.stopPropagation();
		    } else {
		      this.commit(e);
		    }
		  },
		  onPressArrowUp: function onPressArrowUp(e) {
		    if (this.editorHasResults()) {
		      // dont want to propogate as that then moves us round the grid
		      e.stopPropagation();
		    } else {
		      this.commit(e);
		    }
		  },
		  onPressArrowLeft: function onPressArrowLeft(e) {
		    // prevent event propogation. this disables left cell navigation
		    if (!this.isCaretAtBeginningOfInput()) {
		      e.stopPropagation();
		    } else {
		      this.commit(e);
		    }
		  },
		  onPressArrowRight: function onPressArrowRight(e) {
		    // prevent event propogation. this disables right cell navigation
		    if (!this.isCaretAtEndOfInput()) {
		      e.stopPropagation();
		    } else {
		      this.commit(e);
		    }
		  },
		  editorHasResults: function editorHasResults() {
		    if (isFunction(this.getEditor().hasResults)) {
		      return this.getEditor().hasResults();
		    }
	
		    return false;
		  },
		  editorIsSelectOpen: function editorIsSelectOpen() {
		    if (isFunction(this.getEditor().isSelectOpen)) {
		      return this.getEditor().isSelectOpen();
		    }
	
		    return false;
		  },
		  getRowMetaData: function getRowMetaData() {
		    // clone row data so editor cannot actually change this
		    // convention based method to get corresponding Id or Name of any Name or Id property
		    if (typeof this.props.column.getRowMetaData === 'function') {
		      return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
		    }
		  },
		  getEditor: function getEditor() {
		    return this.editor;
		  },
		  getInputNode: function getInputNode() {
		    return this.getEditor().getInputNode();
		  },
		  getInitialValue: function getInitialValue() {
		    var selected = this.props.cellMetaData.selected;
		    var keyCode = selected.initialKeyCode;
		    if (keyCode === 'Delete' || keyCode === 'Backspace') {
		      return '';
		    } else if (keyCode === 'Enter') {
		      return this.props.value;
		    }
	
		    var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
		    return text;
		  },
		  getContainerClass: function getContainerClass() {
		    return joinClasses({
		      'has-error': this.state.isInvalid === true
		    });
		  },
		  commit: function commit(args) {
		    var opts = args || {};
		    var updated = this.getEditor().getValue();
		    if (this.isNewValueValid(updated)) {
		      this.changeCommitted = true;
		      var cellKey = this.props.column.key;
		      this.props.cellMetaData.onCommit({ cellKey: cellKey, rowIdx: this.props.rowIdx, updated: updated, key: opts.key });
		    }
		  },
		  isNewValueValid: function isNewValueValid(value) {
		    if (isFunction(this.getEditor().validate)) {
		      var isValid = this.getEditor().validate(value);
		      this.setState({ isInvalid: !isValid });
	
		      return isValid;
		    }
	
		    return true;
		  },
		  setCaretAtEndOfInput: function setCaretAtEndOfInput() {
		    var input = this.getInputNode();
		    // taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
		    var txtLength = input.value.length;
		    if (input.setSelectionRange) {
		      input.setSelectionRange(txtLength, txtLength);
		    } else if (input.createTextRange) {
		      var fieldRange = input.createTextRange();
		      fieldRange.moveStart('character', txtLength);
		      fieldRange.collapse();
		      fieldRange.select();
		    }
		  },
		  isCaretAtBeginningOfInput: function isCaretAtBeginningOfInput() {
		    var inputNode = this.getInputNode();
		    return inputNode.selectionStart === inputNode.selectionEnd && inputNode.selectionStart === 0;
		  },
		  isCaretAtEndOfInput: function isCaretAtEndOfInput() {
		    var inputNode = this.getInputNode();
		    return inputNode.selectionStart === inputNode.value.length;
		  },
		  setTextInputFocus: function setTextInputFocus() {
		    var selected = this.props.cellMetaData.selected;
		    var keyCode = selected.initialKeyCode;
		    var inputNode = this.getInputNode();
		    inputNode.focus();
		    if (inputNode.tagName === 'INPUT') {
		      if (!this.isKeyPrintable(keyCode)) {
		        inputNode.focus();
		        inputNode.select();
		      } else {
		        inputNode.select();
		      }
		    }
		  },
		  hasEscapeBeenPressed: function hasEscapeBeenPressed() {
		    var pressed = false;
		    var escapeKey = 27;
		    if (window.event) {
		      if (window.event.keyCode === escapeKey) {
		        pressed = true;
		      } else if (window.event.which === escapeKey) {
		        pressed = true;
		      }
		    }
		    return pressed;
		  },
		  renderStatusIcon: function renderStatusIcon() {
		    if (this.state.isInvalid === true) {
		      return React.createElement('span', { className: 'glyphicon glyphicon-remove form-control-feedback' });
		    }
		  },
		  render: function render() {
		    return React.createElement(
		      'div',
		      { className: this.getContainerClass(), onKeyDown: this.onKeyDown, commit: this.commit },
		      this.createEditor(),
		      this.renderStatusIcon()
		    );
		  }
		});
	
		module.exports = EditorContainer;
	
	/***/ },
	/* 90 */
	/***/ function(module, exports) {
	
		'use strict';
	
		var KeyboardHandlerMixin = {
		  onKeyDown: function onKeyDown(e) {
		    if (this.isCtrlKeyHeldDown(e)) {
		      this.checkAndCall('onPressKeyWithCtrl', e);
		    } else if (this.isKeyExplicitlyHandled(e.key)) {
		      // break up individual keyPress events to have their own specific callbacks
		      // this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
		      var callBack = 'onPress' + e.key;
		      this.checkAndCall(callBack, e);
		    } else if (this.isKeyPrintable(e.keyCode)) {
		      this.checkAndCall('onPressChar', e);
		    }
		  },
	
	
		  // taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
		  isKeyPrintable: function isKeyPrintable(keycode) {
		    var valid = keycode > 47 && keycode < 58 || // number keys
		    keycode === 32 || keycode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
		    keycode > 64 && keycode < 91 || // letter keys
		    keycode > 95 && keycode < 112 || // numpad keys
		    keycode > 185 && keycode < 193 || // ;=,-./` (in order)
		    keycode > 218 && keycode < 223; // [\]' (in order)
	
		    return valid;
		  },
		  isKeyExplicitlyHandled: function isKeyExplicitlyHandled(key) {
		    return typeof this['onPress' + key] === 'function';
		  },
		  isCtrlKeyHeldDown: function isCtrlKeyHeldDown(e) {
		    return e.ctrlKey === true && e.key !== 'Control';
		  },
		  checkAndCall: function checkAndCall(methodName, args) {
		    if (typeof this[methodName] === 'function') {
		      this[methodName](args);
		    }
		  }
		};
	
		module.exports = KeyboardHandlerMixin;
	
	/***/ },
	/* 91 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var React = __webpack_require__(2);
		var EditorBase = __webpack_require__(92);
	
		var SimpleTextEditor = function (_EditorBase) {
		  _inherits(SimpleTextEditor, _EditorBase);
	
		  function SimpleTextEditor() {
		    _classCallCheck(this, SimpleTextEditor);
	
		    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleTextEditor).apply(this, arguments));
		  }
	
		  _createClass(SimpleTextEditor, [{
		    key: 'render',
		    value: function render() {
		      return React.createElement('input', { ref: 'input', type: 'text', onBlur: this.props.onBlur, className: 'form-control', defaultValue: this.props.value });
		    }
		  }]);
	
		  return SimpleTextEditor;
		}(EditorBase);
	
		module.exports = SimpleTextEditor;
	
	/***/ },
	/* 92 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var React = __webpack_require__(2);
		var ReactDOM = __webpack_require__(3);
		var ExcelColumn = __webpack_require__(15);
	
		var EditorBase = function (_React$Component) {
		  _inherits(EditorBase, _React$Component);
	
		  function EditorBase() {
		    _classCallCheck(this, EditorBase);
	
		    return _possibleConstructorReturn(this, Object.getPrototypeOf(EditorBase).apply(this, arguments));
		  }
	
		  _createClass(EditorBase, [{
		    key: 'getStyle',
		    value: function getStyle() {
		      return {
		        width: '100%'
		      };
		    }
		  }, {
		    key: 'getValue',
		    value: function getValue() {
		      var updated = {};
		      updated[this.props.column.key] = this.getInputNode().value;
		      return updated;
		    }
		  }, {
		    key: 'getInputNode',
		    value: function getInputNode() {
		      var domNode = ReactDOM.findDOMNode(this);
		      if (domNode.tagName === 'INPUT') {
		        return domNode;
		      }
	
		      return domNode.querySelector('input:not([type=hidden])');
		    }
		  }, {
		    key: 'inheritContainerStyles',
		    value: function inheritContainerStyles() {
		      return true;
		    }
		  }]);
	
		  return EditorBase;
		}(React.Component);
	
		EditorBase.propTypes = {
		  onKeyDown: React.PropTypes.func.isRequired,
		  value: React.PropTypes.any.isRequired,
		  onBlur: React.PropTypes.func.isRequired,
		  column: React.PropTypes.shape(ExcelColumn).isRequired,
		  commit: React.PropTypes.func.isRequired
		};
	
		module.exports = EditorBase;
	
	/***/ },
	/* 93 */
	/***/ function(module, exports) {
	
		'use strict';
	
		var isFunction = function isFunction(functionToCheck) {
		  var getType = {};
		  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
		};
	
		module.exports = isFunction;
	
	/***/ },
	/* 94 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var PropTypes = __webpack_require__(2).PropTypes;
	
		module.exports = {
		  selected: PropTypes.object.isRequired,
		  copied: PropTypes.object,
		  dragged: PropTypes.object,
		  onCellClick: PropTypes.func.isRequired,
		  onCellDoubleClick: PropTypes.func.isRequired,
		  onCommit: PropTypes.func.isRequired,
		  onCommitCancel: PropTypes.func.isRequired,
		  handleDragEnterRow: PropTypes.func.isRequired,
		  handleTerminateDrag: PropTypes.func.isRequired
		};
	
	/***/ },
	/* 95 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
	
		var SimpleCellFormatter = React.createClass({
		  displayName: 'SimpleCellFormatter',
	
		  propTypes: {
		    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired
		  },
	
		  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		    return nextProps.value !== this.props.value;
		  },
		  render: function render() {
		    return React.createElement(
		      'div',
		      { title: this.props.value },
		      this.props.value
		    );
		  }
		});
	
		module.exports = SimpleCellFormatter;
	
	/***/ },
	/* 96 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
		var ReactDOM = __webpack_require__(3);
		var DOMMetrics = __webpack_require__(97);
		var min = Math.min;
		var max = Math.max;
		var floor = Math.floor;
		var ceil = Math.ceil;
	
		module.exports = {
		  mixins: [DOMMetrics.MetricsMixin],
	
		  DOMMetrics: {
		    viewportHeight: function viewportHeight() {
		      return ReactDOM.findDOMNode(this).offsetHeight;
		    }
		  },
	
		  propTypes: {
		    rowHeight: React.PropTypes.number,
		    rowsCount: React.PropTypes.number.isRequired
		  },
	
		  getDefaultProps: function getDefaultProps() {
		    return {
		      rowHeight: 30
		    };
		  },
		  getInitialState: function getInitialState() {
		    return this.getGridState(this.props);
		  },
		  getGridState: function getGridState(props) {
		    var renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
		    var totalRowCount = min(renderedRowsCount * 2, props.rowsCount);
		    return {
		      displayStart: 0,
		      displayEnd: totalRowCount,
		      height: props.minHeight,
		      scrollTop: 0,
		      scrollLeft: 0
		    };
		  },
		  updateScroll: function updateScroll(scrollTop, scrollLeft, height, rowHeight, length) {
		    var renderedRowsCount = ceil(height / rowHeight);
	
		    var visibleStart = floor(scrollTop / rowHeight);
	
		    var visibleEnd = min(visibleStart + renderedRowsCount, length);
	
		    var displayStart = max(0, visibleStart - renderedRowsCount * 2);
	
		    var displayEnd = min(visibleStart + renderedRowsCount * 2, length);
	
		    var nextScrollState = {
		      visibleStart: visibleStart,
		      visibleEnd: visibleEnd,
		      displayStart: displayStart,
		      displayEnd: displayEnd,
		      height: height,
		      scrollTop: scrollTop,
		      scrollLeft: scrollLeft
		    };
	
		    this.setState(nextScrollState);
		  },
		  metricsUpdated: function metricsUpdated() {
		    var height = this.DOMMetrics.viewportHeight();
		    if (height) {
		      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, height, this.props.rowHeight, this.props.rowsCount);
		    }
		  },
		  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		    if (this.props.rowHeight !== nextProps.rowHeight || this.props.minHeight !== nextProps.minHeight) {
		      this.setState(this.getGridState(nextProps));
		    } else if (this.props.rowsCount !== nextProps.rowsCount) {
		      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, this.state.height, nextProps.rowHeight, nextProps.rowsCount);
		      // Added to fix the hiding of the bottom scrollbar when showing the filters.
		    } else if (this.props.rowOffsetHeight !== nextProps.rowOffsetHeight) {
		        // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
		        var _height = this.props.rowOffsetHeight - nextProps.rowOffsetHeight;
	
		        this.updateScroll(this.state.scrollTop, this.state.scrollLeft, this.state.height + _height, nextProps.rowHeight, nextProps.rowsCount);
		      }
		  }
		};
	
	/***/ },
	/* 97 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
		var shallowCloneObject = __webpack_require__(7);
	
		var contextTypes = {
		  metricsComputator: React.PropTypes.object
		};
	
		var MetricsComputatorMixin = {
	
		  childContextTypes: contextTypes,
	
		  getChildContext: function getChildContext() {
		    return { metricsComputator: this };
		  },
		  getMetricImpl: function getMetricImpl(name) {
		    return this._DOMMetrics.metrics[name].value;
		  },
		  registerMetricsImpl: function registerMetricsImpl(component, metrics) {
		    var getters = {};
		    var s = this._DOMMetrics;
	
		    for (var name in metrics) {
		      if (s.metrics[name] !== undefined) {
		        throw new Error('DOM metric ' + name + ' is already defined');
		      }
		      s.metrics[name] = { component: component, computator: metrics[name].bind(component) };
		      getters[name] = this.getMetricImpl.bind(null, name);
		    }
	
		    if (s.components.indexOf(component) === -1) {
		      s.components.push(component);
		    }
	
		    return getters;
		  },
		  unregisterMetricsFor: function unregisterMetricsFor(component) {
		    var s = this._DOMMetrics;
		    var idx = s.components.indexOf(component);
	
		    if (idx > -1) {
		      s.components.splice(idx, 1);
	
		      var name = void 0;
		      var metricsToDelete = {};
	
		      for (name in s.metrics) {
		        if (s.metrics[name].component === component) {
		          metricsToDelete[name] = true;
		        }
		      }
	
		      for (name in metricsToDelete) {
		        if (metricsToDelete.hasOwnProperty(name)) {
		          delete s.metrics[name];
		        }
		      }
		    }
		  },
		  updateMetrics: function updateMetrics() {
		    var s = this._DOMMetrics;
	
		    var needUpdate = false;
	
		    for (var name in s.metrics) {
		      if (!s.metrics.hasOwnProperty(name)) continue;
	
		      var newMetric = s.metrics[name].computator();
		      if (newMetric !== s.metrics[name].value) {
		        needUpdate = true;
		      }
		      s.metrics[name].value = newMetric;
		    }
	
		    if (needUpdate) {
		      for (var i = 0, len = s.components.length; i < len; i++) {
		        if (s.components[i].metricsUpdated) {
		          s.components[i].metricsUpdated();
		        }
		      }
		    }
		  },
		  componentWillMount: function componentWillMount() {
		    this._DOMMetrics = {
		      metrics: {},
		      components: []
		    };
		  },
		  componentDidMount: function componentDidMount() {
		    if (window.addEventListener) {
		      window.addEventListener('resize', this.updateMetrics);
		    } else {
		      window.attachEvent('resize', this.updateMetrics);
		    }
		    this.updateMetrics();
		  },
		  componentWillUnmount: function componentWillUnmount() {
		    window.removeEventListener('resize', this.updateMetrics);
		  }
		};
	
		var MetricsMixin = {
	
		  contextTypes: contextTypes,
	
		  componentWillMount: function componentWillMount() {
		    if (this.DOMMetrics) {
		      this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);
	
		      this.DOMMetrics = {};
		      for (var name in this._DOMMetricsDefs) {
		        if (!this._DOMMetricsDefs.hasOwnProperty(name)) continue;
	
		        this.DOMMetrics[name] = function () {};
		      }
		    }
		  },
		  componentDidMount: function componentDidMount() {
		    if (this.DOMMetrics) {
		      this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);
		    }
		  },
		  componentWillUnmount: function componentWillUnmount() {
		    if (!this.registerMetricsImpl) {
		      return this.context.metricsComputator.unregisterMetricsFor(this);
		    }
		    if (this.hasOwnProperty('DOMMetrics')) {
		      delete this.DOMMetrics;
		    }
		  },
		  registerMetrics: function registerMetrics(metrics) {
		    if (this.registerMetricsImpl) {
		      return this.registerMetricsImpl(this, metrics);
		    }
	
		    return this.context.metricsComputator.registerMetricsImpl(this, metrics);
		  },
		  getMetric: function getMetric(name) {
		    if (this.getMetricImpl) {
		      return this.getMetricImpl(name);
		    }
	
		    return this.context.metricsComputator.getMetricImpl(name);
		  }
		};
	
		module.exports = {
		  MetricsComputatorMixin: MetricsComputatorMixin,
		  MetricsMixin: MetricsMixin
		};
	
	/***/ },
	/* 98 */
	/***/ function(module, exports) {
	
		"use strict";
	
		module.exports = {
		  componentDidMount: function componentDidMount() {
		    this._scrollLeft = this.refs.viewport ? this.refs.viewport.getScroll().scrollLeft : 0;
		    this._onScroll();
		  },
		  componentDidUpdate: function componentDidUpdate() {
		    this._onScroll();
		  },
		  componentWillMount: function componentWillMount() {
		    this._scrollLeft = undefined;
		  },
		  componentWillUnmount: function componentWillUnmount() {
		    this._scrollLeft = undefined;
		  },
		  onScroll: function onScroll(props) {
		    if (this._scrollLeft !== props.scrollLeft) {
		      this._scrollLeft = props.scrollLeft;
		      this._onScroll();
		    }
		  },
		  onHeaderScroll: function onHeaderScroll(e) {
		    var scrollLeft = e.target.scrollLeft;
		    if (this._scrollLeft !== scrollLeft) {
		      this._scrollLeft = scrollLeft;
		      this.refs.header.setScrollLeft(scrollLeft);
		      var canvas = ReactDOM.findDOMNode(this.refs.viewport.refs.canvas);
		      canvas.scrollLeft = scrollLeft;
		      this.refs.viewport.refs.canvas.setScrollLeft(scrollLeft);
		    }
		  },
		  _onScroll: function _onScroll() {
		    if (this._scrollLeft !== undefined) {
		      this.refs.header.setScrollLeft(this._scrollLeft);
		      if (this.refs.viewport) {
		        this.refs.viewport.setScrollLeft(this._scrollLeft);
		      }
		    }
		  }
		};
	
	/***/ },
	/* 99 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
	
		var CheckboxEditor = React.createClass({
		  displayName: 'CheckboxEditor',
	
	
		  propTypes: {
		    value: React.PropTypes.bool,
		    rowIdx: React.PropTypes.number,
		    column: React.PropTypes.shape({
		      key: React.PropTypes.string,
		      onCellChange: React.PropTypes.func
		    }),
		    dependentValues: React.PropTypes.object
		  },
	
		  handleChange: function handleChange(e) {
		    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, this.props.dependentValues, e);
		  },
		  render: function render() {
		    var checked = this.props.value != null ? this.props.value : false;
		    var checkboxName = 'checkbox' + this.props.rowIdx;
		    return React.createElement(
		      'div',
		      { className: 'react-grid-checkbox-container', onClick: this.handleChange },
		      React.createElement('input', { className: 'react-grid-checkbox', type: 'checkbox', name: checkboxName, checked: checked }),
		      React.createElement('label', { htmlFor: checkboxName, className: 'react-grid-checkbox-label' })
		    );
		  }
		});
	
		module.exports = CheckboxEditor;
	
	/***/ },
	/* 100 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _reactDom = __webpack_require__(3);
	
		var _reactDom2 = _interopRequireDefault(_reactDom);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		var ColumnMetrics = __webpack_require__(8);
		var DOMMetrics = __webpack_require__(97);
		Object.assign = __webpack_require__(101);
		var PropTypes = __webpack_require__(2).PropTypes;
		var ColumnUtils = __webpack_require__(10);
	
		var Column = function Column() {
		  _classCallCheck(this, Column);
		};
	
		module.exports = {
		  mixins: [DOMMetrics.MetricsMixin],
	
		  propTypes: {
		    columns: PropTypes.arrayOf(Column),
		    minColumnWidth: PropTypes.number,
		    columnEquality: PropTypes.func,
		    onColumnResize: PropTypes.func
		  },
	
		  DOMMetrics: {
		    gridWidth: function gridWidth() {
		      return _reactDom2['default'].findDOMNode(this).parentElement.offsetWidth;
		    }
		  },
	
		  getDefaultProps: function getDefaultProps() {
		    return {
		      minColumnWidth: 80,
		      columnEquality: ColumnMetrics.sameColumn
		    };
		  },
		  componentWillMount: function componentWillMount() {
		    this._mounted = true;
		  },
		  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		    if (nextProps.columns) {
		      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality) || nextProps.minWidth !== this.props.minWidth) {
		        var columnMetrics = this.createColumnMetrics(nextProps);
		        this.setState({ columnMetrics: columnMetrics });
		      }
		    }
		  },
		  getTotalWidth: function getTotalWidth() {
		    var totalWidth = 0;
		    if (this._mounted) {
		      totalWidth = this.DOMMetrics.gridWidth();
		    } else {
		      totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;
		    }
		    return totalWidth;
		  },
		  getColumnMetricsType: function getColumnMetricsType(metrics) {
		    var totalWidth = metrics.totalWidth || this.getTotalWidth();
		    var currentMetrics = {
		      columns: metrics.columns,
		      totalWidth: totalWidth,
		      minColumnWidth: metrics.minColumnWidth
		    };
		    var updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
		    return updatedMetrics;
		  },
		  getColumn: function getColumn(idx) {
		    var columns = this.state.columnMetrics.columns;
		    if (Array.isArray(columns)) {
		      return columns[idx];
		    } else if (typeof Immutable !== 'undefined') {
		      return columns.get(idx);
		    }
		  },
		  getSize: function getSize() {
		    var columns = this.state.columnMetrics.columns;
		    if (Array.isArray(columns)) {
		      return columns.length;
		    } else if (typeof Immutable !== 'undefined') {
		      return columns.size;
		    }
		  },
		  metricsUpdated: function metricsUpdated() {
		    var columnMetrics = this.createColumnMetrics();
		    this.setState({ columnMetrics: columnMetrics });
		  },
		  createColumnMetrics: function createColumnMetrics() {
		    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
		    var gridColumns = this.setupGridColumns(props);
		    return this.getColumnMetricsType({
		      columns: gridColumns,
		      minColumnWidth: this.props.minColumnWidth,
		      totalWidth: props.minWidth
		    });
		  },
		  onColumnResize: function onColumnResize(index, width) {
		    var columnMetrics = ColumnMetrics.resizeColumn(this.state.columnMetrics, index, width);
		    this.setState({ columnMetrics: columnMetrics });
		    if (this.props.onColumnResize) {
		      this.props.onColumnResize(index, width);
		    }
		  }
		};
	
	/***/ },
	/* 101 */
	/***/ function(module, exports) {
	
		'use strict';
	
		function ToObject(val) {
			if (val == null) {
				throw new TypeError('Object.assign cannot be called with null or undefined');
			}
	
			return Object(val);
		}
	
		module.exports = Object.assign || function (target, source) {
			var from;
			var keys;
			var to = ToObject(target);
	
			for (var s = 1; s < arguments.length; s++) {
				from = arguments[s];
				keys = Object.keys(Object(from));
	
				for (var i = 0; i < keys.length; i++) {
					to[keys[i]] = from[keys[i]];
				}
			}
	
			return to;
		};
	
	
	/***/ },
	/* 102 */
	/***/ function(module, exports) {
	
		'use strict';
	
		var RowUtils = {
		  get: function get(row, property) {
		    if (typeof row.get === 'function') {
		      return row.get(property);
		    }
	
		    return row[property];
		  }
		};
	
		module.exports = RowUtils;
	
	/***/ },
	/* 103 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var Editors = {
		  AutoComplete: __webpack_require__(104),
		  DropDownEditor: __webpack_require__(106),
		  SimpleTextEditor: __webpack_require__(91),
		  CheckboxEditor: __webpack_require__(99)
		};
	
		module.exports = Editors;
	
	/***/ },
	/* 104 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
		var ReactDOM = __webpack_require__(3);
		var ReactAutocomplete = __webpack_require__(105);
		var ExcelColumn = __webpack_require__(15);
	
		var optionPropType = React.PropTypes.shape({
		  id: React.PropTypes.required,
		  title: React.PropTypes.string
		});
	
		var AutoCompleteEditor = React.createClass({
		  displayName: 'AutoCompleteEditor',
	
	
		  propTypes: {
		    onCommit: React.PropTypes.func,
		    options: React.PropTypes.arrayOf(optionPropType),
		    label: React.PropTypes.any,
		    value: React.PropTypes.any,
		    height: React.PropTypes.number,
		    valueParams: React.PropTypes.arrayOf(React.PropTypes.string),
		    column: React.PropTypes.shape(ExcelColumn),
		    resultIdentifier: React.PropTypes.string,
		    search: React.PropTypes.string,
		    onKeyDown: React.PropTypes.func,
		    onFocus: React.PropTypes.func
		  },
	
		  getDefaultProps: function getDefaultProps() {
		    return {
		      resultIdentifier: 'id'
		    };
		  },
		  handleChange: function handleChange() {
		    this.props.onCommit();
		  },
		  getValue: function getValue() {
		    var value = void 0;
		    var updated = {};
		    if (this.hasResults() && this.isFocusedOnSuggestion()) {
		      value = this.getLabel(this.refs.autoComplete.state.focusedValue);
		      if (this.props.valueParams) {
		        value = this.constuctValueFromParams(this.refs.autoComplete.state.focusedValue, this.props.valueParams);
		      }
		    } else {
		      value = this.refs.autoComplete.state.searchTerm;
		    }
	
		    updated[this.props.column.key] = value;
		    return updated;
		  },
		  getInputNode: function getInputNode() {
		    return ReactDOM.findDOMNode(this).getElementsByTagName('input')[0];
		  },
		  getLabel: function getLabel(item) {
		    var label = this.props.label != null ? this.props.label : 'title';
		    if (typeof label === 'function') {
		      return label(item);
		    } else if (typeof label === 'string') {
		      return item[label];
		    }
		  },
		  hasResults: function hasResults() {
		    return this.refs.autoComplete.state.results.length > 0;
		  },
		  isFocusedOnSuggestion: function isFocusedOnSuggestion() {
		    var autoComplete = this.refs.autoComplete;
		    return autoComplete.state.focusedValue != null;
		  },
		  constuctValueFromParams: function constuctValueFromParams(obj, props) {
		    if (!props) {
		      return '';
		    }
	
		    var ret = [];
		    for (var i = 0, ii = props.length; i < ii; i++) {
		      ret.push(obj[props[i]]);
		    }
		    return ret.join('|');
		  },
		  render: function render() {
		    var label = this.props.label != null ? this.props.label : 'title';
		    return React.createElement(
		      'div',
		      { height: this.props.height, onKeyDown: this.props.onKeyDown },
		      React.createElement(ReactAutocomplete, { search: this.props.search, ref: 'autoComplete', label: label, onChange: this.handleChange, onFocus: this.props.onFocus, resultIdentifier: this.props.resultIdentifier, options: this.props.options, value: { title: this.props.value } })
		    );
		  }
		});
	
		module.exports = AutoCompleteEditor;
	
	/***/ },
	/* 105 */
	/***/ function(module, exports, __webpack_require__) {
	
		(function webpackUniversalModuleDefinition(root, factory) {
			if(true)
				module.exports = factory(__webpack_require__(2));
			else if(typeof define === 'function' && define.amd)
				define(["react"], factory);
			else if(typeof exports === 'object')
				exports["ReactAutocomplete"] = factory(require("react"));
			else
				root["ReactAutocomplete"] = factory(root["React"]);
		})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
		return /******/ (function(modules) { // webpackBootstrap
		/******/ 	// The module cache
		/******/ 	var installedModules = {};
	
		/******/ 	// The require function
		/******/ 	function __webpack_require__(moduleId) {
	
		/******/ 		// Check if module is in cache
		/******/ 		if(installedModules[moduleId])
		/******/ 			return installedModules[moduleId].exports;
	
		/******/ 		// Create a new module (and put it into the cache)
		/******/ 		var module = installedModules[moduleId] = {
		/******/ 			exports: {},
		/******/ 			id: moduleId,
		/******/ 			loaded: false
		/******/ 		};
	
		/******/ 		// Execute the module function
		/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
		/******/ 		// Flag the module as loaded
		/******/ 		module.loaded = true;
	
		/******/ 		// Return the exports of the module
		/******/ 		return module.exports;
		/******/ 	}
	
	
		/******/ 	// expose the modules object (__webpack_modules__)
		/******/ 	__webpack_require__.m = modules;
	
		/******/ 	// expose the module cache
		/******/ 	__webpack_require__.c = installedModules;
	
		/******/ 	// __webpack_public_path__
		/******/ 	__webpack_require__.p = "";
	
		/******/ 	// Load entry module and return exports
		/******/ 	return __webpack_require__(0);
		/******/ })
		/************************************************************************/
		/******/ ([
		/* 0 */
		/***/ function(module, exports, __webpack_require__) {
	
			"use strict";
	
			var React = __webpack_require__(1);
			var joinClasses = __webpack_require__(2);
	
			var Autocomplete = React.createClass({ displayName: "Autocomplete",
	
			  propTypes: {
			    options: React.PropTypes.any,
			    search: React.PropTypes.func,
			    resultRenderer: React.PropTypes.oneOfType([React.PropTypes.component, React.PropTypes.func]),
			    value: React.PropTypes.object,
			    onChange: React.PropTypes.func,
			    onError: React.PropTypes.func,
			    onFocus: React.PropTypes.func
			  },
	
			  getDefaultProps: function () {
			    return { search: searchArray };
			  },
	
			  getInitialState: function () {
			    var searchTerm = this.props.searchTerm ? this.props.searchTerm : this.props.value ? this.props.value.title : "";
			    return {
			      results: [],
			      showResults: false,
			      showResultsInProgress: false,
			      searchTerm: searchTerm,
			      focusedValue: null
			    };
			  },
	
			  getResultIdentifier: function (result) {
			    if (this.props.resultIdentifier === undefined) {
			      return result.id;
			    } else {
			      return result[this.props.resultIdentifier];
			    }
			  },
	
	
			  render: function () {
			    var className = joinClasses(this.props.className, "react-autocomplete-Autocomplete", this.state.showResults ? "react-autocomplete-Autocomplete--resultsShown" : undefined);
			    var style = {
			      position: "relative",
			      outline: "none"
			    };
			    return React.createElement("div", {
			      tabIndex: "1",
			      className: className,
			      onFocus: this.onFocus,
			      onBlur: this.onBlur,
			      style: style }, React.createElement("input", {
			      ref: "search",
			      className: "react-autocomplete-Autocomplete__search",
			      style: { width: "100%" },
			      onClick: this.showAllResults,
			      onChange: this.onQueryChange,
			      onFocus: this.onSearchInputFocus,
			      onBlur: this.onQueryBlur,
			      onKeyDown: this.onQueryKeyDown,
			      value: this.state.searchTerm }), React.createElement(Results, {
			      className: "react-autocomplete-Autocomplete__results",
			      onSelect: this.onValueChange,
			      onFocus: this.onValueFocus,
			      results: this.state.results,
			      focusedValue: this.state.focusedValue,
			      show: this.state.showResults,
			      renderer: this.props.resultRenderer,
			      label: this.props.label,
			      resultIdentifier: this.props.resultIdentifier }));
			  },
	
			  componentWillReceiveProps: function (nextProps) {
			    var searchTerm = nextProps.searchTerm ? nextProps.searchTerm : nextProps.value ? nextProps.value.title : "";
			    this.setState({ searchTerm: searchTerm });
			  },
	
			  componentWillMount: function () {
			    this.blurTimer = null;
			  },
	
			  /**
			    * Show results for a search term value.
			    *
			    * This method doesn't update search term value itself.
			    *
			    * @param {Search} searchTerm
			    */
			  showResults: function (searchTerm) {
			    this.setState({ showResultsInProgress: true });
			    this.props.search(this.props.options, searchTerm.trim(), this.onSearchComplete);
			  },
	
			  showAllResults: function () {
			    if (!this.state.showResultsInProgress && !this.state.showResults) {
			      this.showResults("");
			    }
			  },
	
			  onValueChange: function (value) {
			    var state = {
			      value: value,
			      showResults: false
			    };
	
			    if (value) {
			      state.searchTerm = value.title;
			    }
	
			    this.setState(state);
	
			    if (this.props.onChange) {
			      this.props.onChange(value);
			    }
			  },
	
			  onSearchComplete: function (err, results) {
			    if (err) {
			      if (this.props.onError) {
			        this.props.onError(err);
			      } else {
			        throw err;
			      }
			    }
	
			    this.setState({
			      showResultsInProgress: false,
			      showResults: true,
			      results: results
			    });
			  },
	
			  onValueFocus: function (value) {
			    this.setState({ focusedValue: value });
			  },
	
			  onQueryChange: function (e) {
			    var searchTerm = e.target.value;
			    this.setState({
			      searchTerm: searchTerm,
			      focusedValue: null
			    });
			    this.showResults(searchTerm);
			  },
	
			  onFocus: function () {
			    if (this.blurTimer) {
			      clearTimeout(this.blurTimer);
			      this.blurTimer = null;
			    }
			    this.refs.search.getDOMNode().focus();
			  },
	
			  onSearchInputFocus: function () {
			    if (this.props.onFocus) {
			      this.props.onFocus();
			    }
	
			    this.showAllResults();
			  },
	
			  onBlur: function () {
			    // wrap in setTimeout so we can catch a click on results
			    this.blurTimer = setTimeout((function () {
			      if (this.isMounted()) {
			        this.setState({ showResults: false });
			      }
			    }).bind(this), 100);
			  },
	
			  onQueryKeyDown: function (e) {
			    if (e.key === "Enter") {
			      e.preventDefault();
			      if (this.state.focusedValue) {
			        this.onValueChange(this.state.focusedValue);
			      }
			    } else if (e.key === "ArrowUp" && this.state.showResults) {
			      e.preventDefault();
			      var prevIdx = Math.max(this.focusedValueIndex() - 1, 0);
			      this.setState({
			        focusedValue: this.state.results[prevIdx]
			      });
			    } else if (e.key === "ArrowDown") {
			      e.preventDefault();
			      if (this.state.showResults) {
			        var nextIdx = Math.min(this.focusedValueIndex() + (this.state.showResults ? 1 : 0), this.state.results.length - 1);
			        this.setState({
			          showResults: true,
			          focusedValue: this.state.results[nextIdx]
			        });
			      } else {
			        this.showAllResults();
			      }
			    }
			  },
	
			  focusedValueIndex: function () {
			    if (!this.state.focusedValue) {
			      return -1;
			    }
			    for (var i = 0, len = this.state.results.length; i < len; i++) {
			      if (this.getResultIdentifier(this.state.results[i]) === this.getResultIdentifier(this.state.focusedValue)) {
			        return i;
			      }
			    }
			    return -1;
			  }
			});
	
			var Results = React.createClass({ displayName: "Results",
	
			  getResultIdentifier: function (result) {
			    if (this.props.resultIdentifier === undefined) {
			      if (!result.id) {
			        throw "id property not found on result. You must specify a resultIdentifier and pass as props to autocomplete component";
			      }
			      return result.id;
			    } else {
			      return result[this.props.resultIdentifier];
			    }
			  },
	
			  render: function () {
			    var style = {
			      display: this.props.show ? "block" : "none",
			      position: "absolute",
			      listStyleType: "none"
			    };
			    var $__0 = this.props,
			        className = $__0.className,
			        props = (function (source, exclusion) {
			      var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {
			        throw new TypeError();
			      }for (var key in source) {
			        if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {
			          rest[key] = source[key];
			        }
			      }return rest;
			    })($__0, { className: 1 });
	
			    return React.createElement("ul", React.__spread({}, props, { style: style, className: className + " react-autocomplete-Results" }), this.props.results.map(this.renderResult));
			  },
	
			  renderResult: function (result) {
			    var focused = this.props.focusedValue && this.getResultIdentifier(this.props.focusedValue) === this.getResultIdentifier(result);
			    var Renderer = this.props.renderer || Result;
			    return React.createElement(Renderer, {
			      ref: focused ? "focused" : undefined,
			      key: this.getResultIdentifier(result),
			      result: result,
			      focused: focused,
			      onMouseEnter: this.onMouseEnterResult,
			      onClick: this.props.onSelect,
			      label: this.props.label });
			  },
	
			  componentDidUpdate: function () {
			    this.scrollToFocused();
			  },
	
			  componentDidMount: function () {
			    this.scrollToFocused();
			  },
	
			  componentWillMount: function () {
			    this.ignoreFocus = false;
			  },
	
			  scrollToFocused: function () {
			    var focused = this.refs && this.refs.focused;
			    if (focused) {
			      var containerNode = this.getDOMNode();
			      var scroll = containerNode.scrollTop;
			      var height = containerNode.offsetHeight;
	
			      var node = focused.getDOMNode();
			      var top = node.offsetTop;
			      var bottom = top + node.offsetHeight;
	
			      // we update ignoreFocus to true if we change the scroll position so
			      // the mouseover event triggered because of that won't have an
			      // effect
			      if (top < scroll) {
			        this.ignoreFocus = true;
			        containerNode.scrollTop = top;
			      } else if (bottom - scroll > height) {
			        this.ignoreFocus = true;
			        containerNode.scrollTop = bottom - height;
			      }
			    }
			  },
	
			  onMouseEnterResult: function (e, result) {
			    // check if we need to prevent the next onFocus event because it was
			    // probably caused by a mouseover due to scroll position change
			    if (this.ignoreFocus) {
			      this.ignoreFocus = false;
			    } else {
			      // we need to make sure focused node is visible
			      // for some reason mouse events fire on visible nodes due to
			      // box-shadow
			      var containerNode = this.getDOMNode();
			      var scroll = containerNode.scrollTop;
			      var height = containerNode.offsetHeight;
	
			      var node = e.target;
			      var top = node.offsetTop;
			      var bottom = top + node.offsetHeight;
	
			      if (bottom > scroll && top < scroll + height) {
			        this.props.onFocus(result);
			      }
			    }
			  }
			});
	
			var Result = React.createClass({ displayName: "Result",
	
			  getDefaultProps: function () {
			    return {
			      label: function (result) {
			        return result.title;
			      }
			    };
			  },
	
			  getLabel: function (result) {
			    if (typeof this.props.label === "function") {
			      return this.props.label(result);
			    } else if (typeof this.props.label === "string") {
			      return result[this.props.label];
			    }
			  },
	
			  render: function () {
			    var className = joinClasses({
			      "react-autocomplete-Result": true,
			      "react-autocomplete-Result--active": this.props.focused
			    });
	
			    return React.createElement("li", {
			      style: { listStyleType: "none" },
			      className: className,
			      onClick: this.onClick,
			      onMouseEnter: this.onMouseEnter }, React.createElement("a", null, this.getLabel(this.props.result)));
			  },
	
			  onClick: function () {
			    this.props.onClick(this.props.result);
			  },
	
			  onMouseEnter: function (e) {
			    if (this.props.onMouseEnter) {
			      this.props.onMouseEnter(e, this.props.result);
			    }
			  },
	
			  shouldComponentUpdate: function (nextProps) {
			    return nextProps.result.id !== this.props.result.id || nextProps.focused !== this.props.focused;
			  }
			});
	
			/**
			* Search options using specified search term treating options as an array
			* of candidates.
			*
			* @param {Array.<Object>} options
			* @param {String} searchTerm
			* @param {Callback} cb
			*/
			function searchArray(options, searchTerm, cb) {
			  if (!options) {
			    return cb(null, []);
			  }
	
			  searchTerm = new RegExp(searchTerm, "i");
	
			  var results = [];
	
			  for (var i = 0, len = options.length; i < len; i++) {
			    if (searchTerm.exec(options[i].title)) {
			      results.push(options[i]);
			    }
			  }
	
			  cb(null, results);
			}
	
			module.exports = Autocomplete;
	
		/***/ },
		/* 1 */
		/***/ function(module, exports) {
	
			module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
	
		/***/ },
		/* 2 */
		/***/ function(module, exports, __webpack_require__) {
	
			var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
			  Copyright (c) 2015 Jed Watson.
			  Licensed under the MIT License (MIT), see
			  http://jedwatson.github.io/classnames
			*/
	
			function classNames() {
				var classes = '';
				var arg;
	
				for (var i = 0; i < arguments.length; i++) {
					arg = arguments[i];
					if (!arg) {
						continue;
					}
	
					if ('string' === typeof arg || 'number' === typeof arg) {
						classes += ' ' + arg;
					} else if (Object.prototype.toString.call(arg) === '[object Array]') {
						classes += ' ' + classNames.apply(null, arg);
					} else if ('object' === typeof arg) {
						for (var key in arg) {
							if (!arg.hasOwnProperty(key) || !arg[key]) {
								continue;
							}
							classes += ' ' + key;
						}
					}
				}
				return classes.substr(1);
			}
	
			// safely export classNames for node / browserify
			if (typeof module !== 'undefined' && module.exports) {
				module.exports = classNames;
			}
	
			// safely export classNames for RequireJS
			if (true) {
				!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
					return classNames;
				}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			}
	
	
		/***/ }
		/******/ ])
		});
		;
	
	/***/ },
	/* 106 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _reactDom = __webpack_require__(3);
	
		var _reactDom2 = _interopRequireDefault(_reactDom);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var React = __webpack_require__(2);
		var EditorBase = __webpack_require__(92);
	
		var DropDownEditor = function (_EditorBase) {
		  _inherits(DropDownEditor, _EditorBase);
	
		  function DropDownEditor() {
		    _classCallCheck(this, DropDownEditor);
	
		    return _possibleConstructorReturn(this, Object.getPrototypeOf(DropDownEditor).apply(this, arguments));
		  }
	
		  _createClass(DropDownEditor, [{
		    key: 'getInputNode',
		    value: function getInputNode() {
		      return _reactDom2['default'].findDOMNode(this);
		    }
		  }, {
		    key: 'onClick',
		    value: function onClick() {
		      this.getInputNode().focus();
		    }
		  }, {
		    key: 'onDoubleClick',
		    value: function onDoubleClick() {
		      this.getInputNode().focus();
		    }
		  }, {
		    key: 'render',
		    value: function render() {
		      return React.createElement(
		        'select',
		        { style: this.getStyle(), defaultValue: this.props.value, onBlur: this.props.onBlur, onChange: this.onChange },
		        this.renderOptions()
		      );
		    }
		  }, {
		    key: 'renderOptions',
		    value: function renderOptions() {
		      var options = [];
		      this.props.options.forEach(function (name) {
		        if (typeof name === 'string') {
		          options.push(React.createElement(
		            'option',
		            { key: name, value: name },
		            name
		          ));
		        } else {
		          options.push(React.createElement(
		            'option',
		            { key: name.id, value: name.value, title: name.title },
		            name.value
		          ));
		        }
		      }, this);
		      return options;
		    }
		  }]);
	
		  return DropDownEditor;
		}(EditorBase);
	
		DropDownEditor.propTypes = {
		  options: React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.objectOf({ id: React.PropTypes.string, title: React.PropTypes.string, meta: React.PropTypes.string })])).isRequired
		};
	
		module.exports = DropDownEditor;
	
	/***/ },
	/* 107 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		// not including this
		// it currently requires the whole of moment, which we dont want to take as a dependency
		var ImageFormatter = __webpack_require__(108);
	
		var Formatters = {
		  ImageFormatter: ImageFormatter
		};
	
		module.exports = Formatters;
	
	/***/ },
	/* 108 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var React = __webpack_require__(2);
	
		var PendingPool = {};
		var ReadyPool = {};
	
		var ImageFormatter = React.createClass({
		  displayName: 'ImageFormatter',
	
		  propTypes: {
		    value: React.PropTypes.string.isRequired
		  },
	
		  getInitialState: function getInitialState() {
		    return {
		      ready: false
		    };
		  },
		  componentWillMount: function componentWillMount() {
		    this._load(this.props.value);
		  },
		  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		    if (nextProps.value !== this.props.value) {
		      this.setState({ value: null });
		      this._load(nextProps.value);
		    }
		  },
		  _load: function _load(src) {
		    var imageSrc = src;
		    if (ReadyPool[imageSrc]) {
		      this.setState({ value: imageSrc });
		      return;
		    }
	
		    if (PendingPool[imageSrc]) {
		      PendingPool[imageSrc].push(this._onLoad);
		      return;
		    }
	
		    PendingPool[imageSrc] = [this._onLoad];
	
		    var img = new Image();
		    img.onload = function () {
		      PendingPool[imageSrc].forEach(function (callback) {
		        callback(imageSrc);
		      });
		      delete PendingPool[imageSrc];
		      img.onload = null;
		      imageSrc = undefined;
		    };
		    img.src = imageSrc;
		  },
		  _onLoad: function _onLoad(src) {
		    if (this.isMounted() && src === this.props.value) {
		      this.setState({
		        value: src
		      });
		    }
		  },
		  render: function render() {
		    var style = this.state.value ? { backgroundImage: 'url(' + this.state.value + ')' } : undefined;
	
		    return React.createElement('div', { className: 'react-grid-image', style: style });
		  }
		});
	
		module.exports = ImageFormatter;
	
	/***/ },
	/* 109 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var React = __webpack_require__(2);
	
		var Toolbar = React.createClass({
		  displayName: "Toolbar",
	
		  propTypes: {
		    onAddRow: React.PropTypes.func,
		    onToggleFilter: React.PropTypes.func,
		    enableFilter: React.PropTypes.bool,
		    numberOfRows: React.PropTypes.number
		  },
	
		  onAddRow: function onAddRow() {
		    if (this.props.onAddRow !== null && this.props.onAddRow instanceof Function) {
		      this.props.onAddRow({ newRowIndex: this.props.numberOfRows });
		    }
		  },
		  getDefaultProps: function getDefaultProps() {
		    return {
		      enableAddRow: true
		    };
		  },
		  renderAddRowButton: function renderAddRowButton() {
		    if (this.props.onAddRow) {
		      return React.createElement(
		        "button",
		        { type: "button", className: "btn", onClick: this.onAddRow },
		        "Add Row"
		      );
		    }
		  },
		  renderToggleFilterButton: function renderToggleFilterButton() {
		    if (this.props.enableFilter) {
		      return React.createElement(
		        "button",
		        { type: "button", className: "btn", onClick: this.props.onToggleFilter },
		        "Filter Rows"
		      );
		    }
		  },
		  render: function render() {
		    return React.createElement(
		      "div",
		      { className: "react-grid-Toolbar" },
		      React.createElement(
		        "div",
		        { className: "tools" },
		        this.renderAddRowButton(),
		        this.renderToggleFilterButton()
		      )
		    );
		  }
		});
	
		module.exports = Toolbar;
	
	/***/ },
	/* 110 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.connect = exports.SubMenu = exports.monitor = exports.MenuItem = exports.MenuHeader = exports.ContextMenu = undefined;
	
		var _reactContextmenu = __webpack_require__(24);
	
		var _ContextMenu = __webpack_require__(111);
	
		var _ContextMenu2 = _interopRequireDefault(_ContextMenu);
	
		var _MenuHeader = __webpack_require__(112);
	
		var _MenuHeader2 = _interopRequireDefault(_MenuHeader);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		exports.ContextMenu = _ContextMenu2['default'];
		exports.MenuHeader = _MenuHeader2['default'];
		exports.MenuItem = _reactContextmenu.MenuItem;
		exports.monitor = _reactContextmenu.monitor;
		exports.SubMenu = _reactContextmenu.SubMenu;
		exports.connect = _reactContextmenu.connect;
	
	/***/ },
	/* 111 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _reactContextmenu = __webpack_require__(24);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var ReactDataGridContextMenu = function (_React$Component) {
		  _inherits(ReactDataGridContextMenu, _React$Component);
	
		  function ReactDataGridContextMenu() {
		    _classCallCheck(this, ReactDataGridContextMenu);
	
		    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactDataGridContextMenu).apply(this, arguments));
		  }
	
		  _createClass(ReactDataGridContextMenu, [{
		    key: 'render',
		    value: function render() {
		      return _react2['default'].createElement(
		        _reactContextmenu.ContextMenu,
		        { identifier: 'reactDataGridContextMenu' },
		        this.props.children
		      );
		    }
		  }]);
	
		  return ReactDataGridContextMenu;
		}(_react2['default'].Component);
	
		ReactDataGridContextMenu.propTypes = {
		  children: _react.PropTypes.node
		};
	
		exports['default'] = ReactDataGridContextMenu;
	
	/***/ },
	/* 112 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _react = __webpack_require__(2);
	
		var _react2 = _interopRequireDefault(_react);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var MenuHeader = function (_React$Component) {
		  _inherits(MenuHeader, _React$Component);
	
		  function MenuHeader() {
		    _classCallCheck(this, MenuHeader);
	
		    return _possibleConstructorReturn(this, Object.getPrototypeOf(MenuHeader).apply(this, arguments));
		  }
	
		  _createClass(MenuHeader, [{
		    key: "render",
		    value: function render() {
		      return _react2["default"].createElement(
		        "div",
		        { className: "react-context-menu-header" },
		        this.props.children
		      );
		    }
		  }]);
	
		  return MenuHeader;
		}(_react2["default"].Component);
	
		MenuHeader.propTypes = {
		  children: _react.PropTypes.any
		};
	
		exports["default"] = MenuHeader;
	
	/***/ }
	/******/ ])
	});
	;

/***/ },

/***/ 316:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 318:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 320:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 322:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=appbundle.js.map