(function(win, undefined) {
	'use strict';

	function _do(_) {
		var coreRules, Rulebot;

		coreRules = {
			alphaNumeric: function(val) {
				var regex = /^[a-zA-Z0-9_]*$/
				return regex.test(val);
			},
			between: function(val, min, max) {
				return this.minLength(val, min) && this.maxLength(val, max);
			},
			blank: function(val) {
				var regex = /^\s*$/;
				return regex.test(val);
			},
			email: function(val) {
				var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$]/;
				return regex.test(val);
			},
			extension: function(val, exts) {

			},
			ip: function(val, type) {
				var regex;
				if(type === 'IPv4' || type === 'both') {
					regex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;
					if(regex.test(val)) {
						return true;
					}
				}
				if(type === 'IPv6' || type === 'both') {
					regex = /^(((?=(?>.*?(::))(?!.+\3)))\3?|([\dA-F]{1,4}(\3|:(?!$)|$)|\2))(?4){5}((?4){2}|(25[0-5]|(2[0-4]|1\d|[1-9])?\d)(\.(?7)){3})\z/i;
					if(regex.test(val)) {
						return true;
					}
				}

				return false;
			},
			minLength: function(val, min) {
				return !!val.length >= min;
			},
			maxLength: function(val, max) {
				return !!val.length <= min;
			},
			multiple: function(val, opts) {
				_.every(opts, function(args, key) {
					console.log(args, key)
				}, this);
			},
			naturalNumber: function(val, allowZero) {
				if(typeof val !== 'number') return false;

				if(val < 0) {
					return false;
				}

				var formatted = val >> 0;

				if(val === 0) {
					return !!allowZero;
				}

				if(formatted === val) {
					return true;
				}

				return false;
			},
			range: function(val, lower, higher, inclusive) {
				if(inclusive === undefined) {
					inclusive = true;
				}

				if(inclusive) {
					return (val >= lower && val <= higher);
				}
				if(!inclusive) {
					return (val > lower && val < higher);
				}
			},
			url: function(val, strict) {

			},
			uuid: function(val, opts) {
				opts = opts || {};
				opts = _.defaults(opts, {
					brackets: false,
					hyphens: true,
					casesensitive: false
				});

				function getCacheKey(opts) {
					return 'bracket=' + opts.brackets +';hyphens=' + opts.hyphens + ';casesensitive=' + opts.casesensitive; 
				};

				function buildRegex(opts) {
					var regexStr = '',
						block = '[0-9a-f]',
						blockSizes = [8, 4, 4, 4, 12];

					for(var i = 0; i < blockSizes.length; i++) {
						if(i === 0 && opts.brackets) {
							regexStr += '\{';

							if(opts.brackets === 'both') {
								regexStr += '?';
							}
						}

						regexStr += block + '{' + blockSizes[i] + '}';

						if(opts.hyphens && i < blockSizes.length - 1) {
							regexStr += '-';

							if(opts.hyphens === 'both') {
								regexStr += '?';
							}
						}

						if(i === blockSizes.length - 1 && opts.brackets) {
							regexStr += '\}';

							if(opts.brackets === 'both') {
								regexStr += '?';
							}
						}
					}

					if(opts.casesensitive) {
						if(opts.casesensitive === 'upper') {
							regexStr = regexStr.toUpperCase();
						}

						return new RegExp(regexStr);
					}
					
					return new RegExp(regexStr, 'i');
				}

				var regex,
					cacheKey = getCacheKey(opts);

				if(typeof this.__uuidRegExCache === 'undefined') {
					this.__uuidRegExCache = {};
					regex = buildRegex(opts);
					this.__uuidRegExCache[cacheKey] = regex;
				} else if(this.__uuidRegExCache[cacheKey]) {
					regex = this.__uuidRegExCache[cacheKey];
				} else {
					regex = buildRegex(opts);
					this.__uuidRegExCache[cacheKey] = regex;
				}
				
				return regex.test(val);
			}
		};

		Rulebot = function(rules, core) {
			if(core === undefined) {
				core = true;
			}

			if(core === true) {
				this.addRules(coreRules);
			}

			this.addRules(rules);
		};

		_.extend(Rulebot.prototype, {
			rules: {},

			addRule: function(name, fn) {
				this.rules[name] = fn;
			},

			addRules: function(rules) {
				_.forOwn(rules, function(fn, key) {
					this.addRule(key, fn);
				}, this);
			},

			removeRule: function(name) {
				delete this.rules[name];
			},

			removeRules: function(rules) {
				_.forEach(rules, function(name) {
					this.removeRule(name);
				}, this);
			},

			test: function(rule) {
				return this.rules[rule].apply(this.rules, _.rest(arguments));
			}
		});

		return Rulebot;
	}

	if (typeof define === 'function' && define.amd) {
		define(['underscore'], _do);
	} else {
		win.Rulebot = _do(_);
	}
}(window));