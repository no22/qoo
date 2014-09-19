qoo.js
======================================================================

Qoo.js is a small, simple, and clean javascript(ES5) oop (classical inheritance) library.

Usage
----------------------------------------------------------------------

### Define a class:

```javascript
var Animal = qoo.Base.extend({
  constructor: function Animal(name, legs) {
    this.name = name;
    this.legs = legs;
  },
  toString: function() {
    return this.name + " has " + this.legs + " legs.";
  }
});

var animal = new Animal("Annie", 2);
animal.toString();  // "Annie has 2 legs."
```

### Define a sub-class:

```javascript
var Cat = Animal.extend(function($super) {
  return {
    constructor: function Cat(name) {
      $super.constructor.call(this, name, 4);
    },
    toString: function() {
      return "Cat: " + $super.toString.call(this);
    }
  };
});

var cat = new Cat("Kitty");
cat.toString();  // "Cat: Kitty has 4 legs."
cat instanceof Cat;  // true
cat instanceof Animal;  // true
```

### Mix-in modules:

```javascript
function Runnable($super) {
  return {
    run: function() {
      return this.name + " runs.";
    }
  };
}

Cat.mixin(Runnable);

var cat = new Cat("Kitty");
cat.run();  // "Kitty runs."

```

### Instance-specific methods:

```javascript
var cat = new Cat("Kitty");

cat.extend(function($super) {
  return {
    barks: function() {
      return "Meow";
    }
  };
});

cat.barks();  // "Meow"
```


License
----------------------------------------------------------------------

Copyright (c) 2014 Hiroyuki OHARA Licensed under the MIT license.
