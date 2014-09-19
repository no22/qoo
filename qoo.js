/*!
 * qoo.js
 *
 * qoo.js is a small, simple, and clean javascript(ES5) oop library.
 *
 * @version 1.0.1
 * @author Hiroyuki OHARA <Hiroyuki.no22@gmail.com>
 * @copyright (c) 2014 Hiroyuki OHARA
 * @see https://github.com/no22/qoo
 * @license MIT
 */
(function (root, globalName, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root[globalName] = factory();
  }
})(this, "qoo", function (undefined) {
  "use strict";
  var slice = Array.prototype.slice,
    extend = function(fn) {
      return function(){
        return fn.apply(qoo, [this].concat(slice.call(arguments)));
      };
    },
    qoo = {
      _extend: function (proto, obj, args) {
        var module, key, value, i = 0, length = args.length;
        for (; i < length; i++) {
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
      extend: function (obj) {
        var isClass = typeof obj === "function",
          proto = isClass ? obj._super_ : obj.constructor.prototype,
          target = isClass ? obj.prototype : obj;
        return this._extend(proto, target, slice.call(arguments, 1));
      },
      classExtend: function (obj) {
        return this._extend(obj._super_ ? obj._super_.constructor : undefined, obj, slice.call(arguments, 1));
      },
      _inherit: function (child, proto) {
        child.prototype = Object.create(proto, {
          constructor: { value: child, enumerable: false, writable: true, configurable: true }
        });
      },
      inherit: function (child, parent) {
        var proto = parent != null ? parent.prototype : null;
        this._inherit(child, proto);
        if (arguments.length > 2) {
          this._extend(proto, child.prototype, slice.call(arguments, 2));
        }
        if (parent && parent._inherit_) parent._inherit_.call(parent, child);
        child._super_ = proto;
        return child;
      },
      "class": function () {
        var base = arguments[0], properties = arguments[1], proto, klass, args, p = 2;
        if (base != null && typeof base === "object") {
          properties = base;
          base = null;
          p = 1;
        }
        proto = base != null ? base.prototype : null;
        if (typeof properties === "function") properties = properties(proto);
        klass = properties.hasOwnProperty("constructor") ? properties.constructor : function () {
          if (!proto || proto === this) return;
          return proto.constructor.apply(this, arguments);
        };
        args = [klass, base, properties].concat(slice.call(arguments, p));
        return this.inherit.apply(this, args);
      },
      classify: function(klass) {
        this.extend(klass, { extend: extend(this.extend) });
        this.classExtend(klass, {
          _inherit_: function(child) {
            for(var k in this) child[k] = this[k];
          },
          mixin: extend(this.extend),
          extend: extend(this.class),
          classExtend: extend(this.classExtend)
        });
        return klass;
      }
    };
  qoo.Base = qoo.class({constructor: function Base() {}});
  qoo.classify(qoo.Base);
  return qoo;
});
