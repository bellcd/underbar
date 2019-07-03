(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : array.slice(n === 0 ? array.length : -n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // get the length with .length
    // loop through collection, calling iterator
    let length;
    let collectionKeys = collection;
    const yesArray = Array.isArray(collection);
    if (yesArray) {
      length = collection.length;
    } else {
      collectionKeys = Object.keys(collection);
      length = collectionKeys.length;
    }
    let i;
    let key, value;
    for (i = 0; i < length; i++) {
      key = yesArray ? i : collectionKeys[i];
      value = yesArray ? collection[i] : collection[collectionKeys[i]];
      iterator(value, key, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // iterate through collection, invoking test each time
    // add elements that return true to result
    let returnArr = [];
    _.each(collection, function(value, key, collection) {
      test(value, key, collection) ? returnArr.push(value) : undefined;
    });
    return returnArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    let filteredElem = _.filter(collection, test);
    // copy collection
    // iterate through filteredElem
      // remove matched elements from copy collection
    let result = Array.from(collection);
    let index;
    for (let i = 0; i < filteredElem.length; i++) {
      index = _.indexOf(result, filteredElem[i]);
      if (index !== -1) {
        result.splice(index, 1);
      }
    }
    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    // if iterator is passed in, transorm array and work with the transformation
    if (iterator) {
      array = _.map(array, iterator);
    }
    // create result array
    // iterate over collection
    // if result array does not contain current element, add it
    let result = [];
    // let index;
    _.each(array, function(value, index, array) {
      index = _.indexOf(result, value);
      index === -1 ? result.push(value) : undefined;
    });
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    // iterate through the collection
      // push the return value of each iteration invocation to result
    const result = [];
    _.each(collection, function(value, key, collection) {
      result.push(iterator(value, key, collection));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // _.each logic from before, with modifications to skip first element if accumulator is not present

    // get the length with .length
    // loop through collection, calling iterator
    let length, i, key, value;
    let collectionKeys = collection;
    const yesArray = Array.isArray(collection);
    if (yesArray) {
      length = collection.length;
    } else {
      collectionKeys = Object.keys(collection);
      length = collectionKeys.length;
    }

    if (accumulator === undefined) {
      accumulator = yesArray ? collection[0] : collection[collectionKeys[0]];
      i = 1;
    } else {
      i = 0;
    }
    for (i; i < length; i++) {
      value = yesArray ? collection[i] : collection[collectionKeys[i]];
      accumulator = iterator(accumulator, value);
    }
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    // if iterator is undefined, set it to a function that returns its input
    iterator = iterator === undefined ? _.identity : iterator;
    return _.reduce(collection, function(acc, value) {
      return (iterator(value) ? true : false) && acc;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator === undefined ? _.identity : iterator;
    let result = _.every(collection, function(value) {
      return !(iterator(value));
    });
    return !result;
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // array from arguments
    // loop through each obj
      // add property / value to obj copy
    const objects = Array.from(arguments);
    for (let sourceObj of objects) {
      for (let prop in sourceObj) {
        obj[prop] = sourceObj[prop];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // same as above here
    const objects = Array.from(arguments);
    for (let sourceObj of objects) {
      for (let prop in sourceObj) {
        // only adds property if property doesn't already exist on source obj
        if (!obj.hasOwnProperty(prop)) {
          obj[prop] = sourceObj[prop];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // create function that will be returned, and invoke func when run
    // create array that will hold arguments to func
    const argObj = {};
    function resultFunc() {
      let result;
      // check if current arguments are already in argObj, using stringify
      let stringified = JSON.stringify(arguments);
      if (!argObj.hasOwnProperty(stringified)) {
        // func has NOT been called with the current arguments, so invoke it, and create prop on argObj with return value
        argObj[stringified] = func.apply(this, arguments);
      }
      return argObj[stringified];
    }
    return resultFunc;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // create array from arguments, removing func & wait
    let argsToPass = Array.from(arguments).slice(2);
    // use setTimeout to queue invocation of func after wait, passing any arguments
    setTimeout(function() {
      func(...arguments);
    }, wait, ...argsToPass);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    // make a copy of array
    let arrCopy = array.slice(0);
    let result = [];
    let i;
    // loop while copy has elements
    while (arrCopy.length > 0) {
      // pick a random index from the array's current elements
      // remove the element at that index, and push it to result
      i = Math.floor(Math.random() * arrCopy.length);
      result = result.concat(arrCopy.splice(i, 1));
    }
    return result;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    // assume
      // collection is an array
    let result = [];
    // iterate through collection passing args to the invocation of functionOrKey
      for (let elem of collection) {
        if (typeof functionOrKey ==='function') {
          result.push(functionOrKey.apply(elem, args));
        } else {
          result.push(elem[functionOrKey](args));
        }
      }
      return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // assume
      // collection is an array
    // copy of collection
    let result = collection.slice(0);
    result.sort(function(first, second) {
      let result;
      // if iterator is a function, sort by return value of that function
      if (typeof iterator === 'function') {
        result = iterator(first) - iterator(second);
      } else {
        // if iterator is a string, sort by value at that property
        result = first[iterator] - second[iterator];
      }
      return result;
    });
    return result;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    // create an array from arguments
    // sort such that the longest subarry is at index 0
    // iterate the length of that array
      // push each index of each subarray in sequence into the new array of arrays
      const argCopy = Array.from(arguments);
      argCopy.sort(function(first, second) {
        return second.length - first.length;
      })
      const result = [];
      for (let i = 0; i < argCopy.length; i++) {
        result[i] = [];
        for (let j = 0; j < argCopy[0].length; j++) {
          result[i][j] = argCopy[j][i];
        }
      }
      return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result = []) {
      // reduce the current binding of nestedArray to a one level array
      return _.reduce(nestedArray, function(acc, elem) {
        // if the current element is itself an array, invoke flatten with a nested array argument of the current element
        let value = Array.isArray(elem) ? _.flatten(elem, result) : result.concat(elem);
        // the accumulator here is a single level deep array, concatenated with the flattened (if necessary) current element
        return acc.concat(value);
      }, result);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    // assume
      // at least 2 separate arrays will be passed as arguments
    // create sourceArr from arguments
    let result = [];
    let sourceArr = Array.from(arguments);
    let inEvery = true;
    // iterate through the first subarray in sourceArr
    _.each(sourceArr[0], function(value, key, collection) {
      inEvery = true;
      for (let i = 1; i < sourceArr.length; i++) {
        if (_.indexOf(sourceArr[i], value) === -1) {
          // if any array doesn NOT have the current element, set flag
          inEvery = false;
        }
      }
      // flag is true here when every other array has the current element, so push the current element to result
      if (inEvery) {
        result.push(value);
      }
    });
  return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    // create sourceArr from arguments
    let result = [];
    let sourceArr = Array.from(arguments);
    let inOnlyOne = true;
    // iterate through the first subarray in sourceArr
    _.each(sourceArr[0], function(value, key, collection) {
      inOnlyOne = true;
      for (let i = 1; i < sourceArr.length; i++) {
        if (_.indexOf(sourceArr[i], value) !== -1) {
          // if any array has the current element, set flag
          inOnlyOne = false;
        }
      }
      // flag is true here when the current element is only in one array, so push the current element to result
      if (inOnlyOne) {
        result.push(value);
      }
    });
  return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    // these two variables are available in the returned function's closure
    let timestamp = Date.now(); // initial timestamp
    let timeoutID = null; // timeoutID tracks whether or not the setTimout call below has already queued a function invocation in the task queue

    return function() {
      // determine if this particular invocation of the returned function is within the timeout window specified
      let insideTimoutWindow = Date.now() > timestamp + wait ? false : true;
      // only queue new func invocation if inside timeout window AND no func invocation currently scheduled
      if (insideTimoutWindow) {
        if (!timeoutID) {
          timeoutID = setTimeout(function() { // timeoutID points to positive integer when setTimeout queues this function invocation
            timestamp = Date.now();
            timeoutID = null;
            func();
          }, (timestamp + wait) - Date.now()); // the inline function above only invokes after waiting (at minimum) to the end of this timeout window
        }
      } else {
        // if outside timeout window AND no function invocation queued, invoke func & update timestamp
        timestamp = Date.now();
        func();
      }
    }










      // // set current timestamp
      // let lastRunTimestamp = Date.now();
      // // flag
      // let hasRun = false;
      // // returned function invokes func when run
      // return function() {
      //   let currentTimestamp
      //   // determine if inside time window
      //   if (Date.now() - timestamp <= wait) {
      //     // determine if has run already for this time window
      //     if () {
      //       // ok to run
      //       func();
      //       hasRun = true;
      //     }
      //
      //   }
      //
      // }
  };
}());
