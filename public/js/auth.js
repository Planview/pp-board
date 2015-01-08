require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'
  },
  shim: {
    bootstrap:{
      deps: ['jquery']
    }
  }
});

require(['bootstrap'], function () {});
