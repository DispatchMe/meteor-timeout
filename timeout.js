Timeout = {};

/**
 * A function waiting for changes with a timeout defaulting to 10 seconds.
 * @param  {Function} checkFunction A function returning true or false.
 * @param  {Function} callback      A callback to run if the check function becomes true.
 * @param  {Object}   options
 *         {Number}   options.timeout Milliseconds until the check times out.
 */
Timeout.interval = function(checkFunction, callback, options) {
  // Set timeout as ten sec pr. default
  options = _.extend({ timeout: 10000, interval: 10 }, options);

  var intervalId = null;

  function done(error) {
    // Clear timeout and interval
    if (timeoutId) Meteor.clearTimeout(timeoutId);
    if (intervalId) Meteor.clearInterval(intervalId);
    if (callback) callback(error);
  }

  var timeoutId = Meteor.setTimeout(function () {
    done(new Error('IntervalTimeout: Timed out'));
  }, options.timeout);

  // Set check interval to every 10 ms
  intervalId = Meteor.setInterval(function() {
    var result = false;

    try {
      result = checkFunction();
    } catch (error) {
      done(error);
    }

    if (result) done();
  }, options.interval);
};

/**
 * A function waiting for reactive changes with a timeout defaulting to 10 seconds.
 * @param  {Function} checkFunction A function with reactive variables returning true or false.
 * @param  {Function} callback      A callback to run if the check function becomes true.
 * @param  {Object}   options
 *         {Number}   options.timeout Milliseconds until the check times out.
 */
Timeout.autorun = function(checkFunction, callback, options) {
  // Set timeout as ten sec pr. default
  options = _.extend({ timeout: 10000 }, options);

  var computation = null;

  var timeoutId = Meteor.setTimeout(function() {
    if (computation) computation.stop();
    if (callback) callback(new Error('Timeout.autorun: Timed out'), computation);
  }, options.timeout);

  // Wait for reacitve changes in checkFunction
  computation = Tracker.autorun(function (c) {
    // TODO: Add try/catch
    if (checkFunction(c)) {
      // Clear timeout and stop computation
      Meteor.clearTimeout(timeoutId);
      c.stop();

      if (callback) callback(null, c);
    }
  });
};
