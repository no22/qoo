/*!
 * qoo.legacy.js
 *
 * qoo.js is a small, simple, and clean javascript oop library.
 *
 * @version 1.0.1
 * @author Hiroyuki OHARA <Hiroyuki.no22@gmail.com>
 * @copyright (c) 2014 Hiroyuki OHARA
 * @see https://github.com/no22/qoo
 * @license MIT
 */
(function (root, globalName, qooName, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    var qoo = root[qooName], qooLegacy = factory();
    if (qoo) return qoo.extend(qoo, qooLegacy);
    root[globalName] = qooLegacy;
  }
})(this, "qooLegacy", "qoo", function (undefined) {
  return {
    _inherit: function (child, proto) {
      function F() {}
      F.prototype = proto;
      child.prototype = new F();
      child.prototype.constructor = child;
    }
  };
});
