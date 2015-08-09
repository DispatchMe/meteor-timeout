dispatch:timeout
==============

Helpers to wait for changes with a timeout.

## Usage
`meteor add dispatch:timeout`

## API
* `Timeout.interval(testFunc, callback, options);`
* `Timeout.autorun(testFunc, callback, options);`
* ~~`Timeout.event(eventemitter, event, testFunc, callback, options);`~~

### Timeout.interval

#### Options
* `option.interval` defaults to `10`ms
* `option.timeout` defaults to `1000`ms

#### Example
Here we want to wait for a DOM element to exist, we test existence pr. interval.
When it exists or timeout the we call back.
```js
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
```

### Timeout.autorun

#### Options
* `option.timeout` defaults to `1000`ms

#### Example
Wait for a reactive variable to be `true` or timeout.
```js
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
