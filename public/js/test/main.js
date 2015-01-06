// jscs:disable
require.config({
  baseUrl: '/base/js',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery.min'
  },
  deps: (function () {
    'use strict';

    return Object.keys(window.__karma__.files)
      .filter(function (file) {
        return (/spec\.js/)
          .test(file);
      });
  }()),
  callback: window.__karma__.start
});
// jscs:enable
