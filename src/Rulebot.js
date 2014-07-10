(function(undefined) {
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

			},
			naturalNumber: function(val, allowZero) {

			},
			range: function(val, lower, higher) {

			},
			url: function(val, strict) {

			},
			uuid: function(val) {

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

			test: function(rule) {
				return this.rules[rule](_.rest(arguments));
			}
		});

		return Rulebot;
	}

	if (typeof define === 'function' && define.amd) {
		define(['underscore'], _do);
	} else {
		win.Rulebot = _do(_);
	}
}());