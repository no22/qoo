/*!
 * qoo.js
 *
 * qoo.js is a small, simple, and clean javascript(ES5) oop library.
 *
 * @version 1.0.0
 * @author Hiroyuki OHARA <Hiroyuki.no22@gmail.com>
 * @copyright (c) 2014 Hiroyuki OHARA
 * @see https://github.com/no22/qoo
 * @license MIT
 */
(function(root, globalName, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root[globalName] = factory();
    }
})(this, "qoo", function(undefined) {
    var slice = Array.prototype.slice;
    return {
        _extend: function(proto, obj, args) {
            var module, key, value, i = 0, length = args.length;
            for (;i < length; i++) {
                if ((module = args[i]) != null) {
                    if (typeof module === "function") module = module(proto);
                    for (key in module) {
                        value = module[key];
                        if (obj === value) continue;
                        if (value !== undefined) obj[key] = value;
                    }
                }
            }
            return obj;
        },
        extend: function(obj) {
            var isClass = typeof obj === "function", proto = isClass ? obj._super_ : obj.constructor.prototype, target = isClass ? obj.prototype : obj;
            return this._extend(proto, target, slice.call(arguments, 1));
        },
        classExtend: function(obj) {
            return this._extend(obj._super_ ? obj._super_.constructor : undefined, obj, slice.call(arguments, 1));
        },
        inherit: function(child, parent) {
            var proto = parent != null ? parent.prototype : null;
            child.prototype = Object.create(proto, {
                constructor: { value: child, enumerable: false, writable: true, configurable: true }
            });
            if (arguments.length > 2) {
                this._extend(proto, child.prototype, slice.call(arguments, 2));
            }
            child._super_ = proto;
            return child;
        },
        "class": function(base, properties) {
            if (properties == null) {
                properties = base;
                base = null;
            }
            var proto = base != null ? base.prototype : null;
            if (typeof properties === "function") properties = properties(proto);
            var klass = properties.hasOwnProperty("constructor") ? properties.constructor : function() {
                if (!proto || proto === this) return;
                return proto.constructor.apply(this, arguments);
            };
            return this.inherit(klass, base, properties);
        }
    };
});
