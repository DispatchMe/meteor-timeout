meteor timeout
==============

Helpers to wait for changes with a timeout.

##Usage
`meteor add dispatch:timeout`

```
// A check running on an interval
Timeout.interval(function() {
  var elements = $('body').find('.my-element');
  return elements && elements.length;
}, function(error) {
  if (error) {
    throw new Error('Timed out while waiting for .my-element');
  } else {
    console.log('Element .my-element is ready');
  }
});

// A check running on reactive changes
var reactive = new ReactiveVar(false);

Timeout.autorun(function() {
  return reactive.get();
}, function(error) {
  if (error) {
    throw new Error('Timed out while waiting for reactive to be true');
  } else {
    console.log('Reactive is true.');
  }
});

```
