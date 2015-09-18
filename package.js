Package.describe({
  name: 'dispatch:timeout',
  version: '0.0.3',
  summary: 'Helpers to wait for changes with a timeout.',
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  api.use([
  	'underscore',
  	'tracker'
  ]);

  api.addFiles('timeout.js');

  api.export('Timeout');
});
