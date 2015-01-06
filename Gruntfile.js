/* jshint node: true */

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var projectPaths = {
    app: 'app',
    publicDev: 'public',
    publicDist: 'html',
    views: 'app/views'
  };

  grunt.initConfig({
    packageInfo: grunt.file.readJSON('package.json'),
    paths: projectPaths,

    sass: {
      options: {
        loadPath: '<%= paths.publicDev %>/bower_components',
        unixNewlines: true,
        precision: 10
      },
      dev: {
        options: {
          update: true,
          style: 'nested',
          sourcemap: 'auto'
        },
        files: [{
          expand: true,
          cwd: '<%= paths.publicDev %>/scss',
          src: ['*.{scss,sass}'],
          dest: '<%= paths.publicDev %>/css',
          ext: '-build.css'
        }]
      },
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          banner: '/*! <%= packageInfo.name %> v<%=packageInfo.version %> ' +
            '(<%= packageInfo.homepage %>) | ' +
            'Copyright 2015 Planview, Inc. | ' +
            'Licensed under <%= packageInfo.license %> */'
        },
        files: [{
          expand: true,
          cwd: '<%= paths.publicDev %>/scss',
          src: ['*.{scss,sass}'],
          dest: '<%= paths.publicDist %>/css',
          ext: '-build.css'
        }]
      }
    },

    csscomb: {
      options: {
        config: '.csscomb.json'
      },
      sass: {
        expand: true,
        cwd: '<%= paths.publicDev %>/scss/',
        src: ['**/*.{scss,sass}'],
        dest: '<%= paths.publicDev %>/scss'
      }
    },

    jsbeautifier: {
      all: {
        src: [
          'Gruntfile.js',
          '<%= paths.publicDev %>/js/**/*.js'
        ],
        options: {
          config: '.jsbeautifyrc'
        }
      }
    },

    jscs: {
      src: ['<%= paths.publicDev %>/js/**/*.js', 'Gruntfile.js'],
      options: {
        config: true
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      main: {
        options: {
          jshintrc: true
        },
        files: {
          src: [
              '<%= paths.publicDev %>/js/**/*.js',
              '!<%= paths.publicDev %>/js/test/*.js'
            ]
        }
      },
      test: {
        options: {
          jshintrc: '<%= paths.publicDev %>/js/test/.jshintrc'
        },
        files: {
          src: ['<%= paths.publicDev %>/js/test/{,*/}*.js']
        }
      }
    },

    php: {
      options: {
        router: '../server.php',
        base: '<%= paths.publicDev %>'
      },
      watch: {
        options: {
          open: true,
          port: 9000
        }
      },
      serve: {
        options: {
          open: true,
          port: 9000,
          keepalive: true
        }
      },
      test: {
        options: {
          port: 9001
        }
      }
    },

    watch: {
      sass: {
        files: ['<%= paths.publicDev %>/scss/**/*.{scss,sass}'],
        tasks: ['csscomb', 'sass:dev']
      },
      scripts: {
        files: [
          '<%= paths.publicDev %>/js/**/*.js',
          '!<%= paths.publicDev %>/js/test/**/*.js'
        ],
        tasks: ['jsbeautifier', 'newer:jscs', 'jshint:main', 'karma:unit'],
        options: {
          livereload: true
        }
      },
      scriptsTests: {
        files: ['<%= paths.publicDev %>/js/test/{,*/}*.js'],
        tasks: ['jshint:test', 'karma']
      },
      php: {
        files: ['**/*.php', '!vendor/**/*.php'],
        tasks: ['phpunit'],
        options: {
          livereload: true
        }
      },
      livereload: {
        files: [
          '<%= paths.publicDev %>/{css,img}/**/*'
        ],
        options: {
          livereload: true
        }
      }
    },

    // Start Vagrant
    vagrant_commands: {
      homestead: {
        commands: [
          ['halt'],
          ['up', '--provision']
        ]
      }
    },

    // Run PHPUnit tests
    phpunit: {
      options: {
        bin: 'vendor/bin/phpunit',
        configuration: 'phpunit.xml'
      },
      app: {
        dir: '<%= paths.app %>/tests'
      }
    },

    // Run Karma tests
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      e2e: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    concurrent: {
      dev: ['scripts', 'styles'],
      vagrant: ['vagrant_commands', 'scripts', 'styles']
    }
  });

  grunt.registerTask('scripts', [
    'jsbeautifier',
    'jscs',
    'jshint:main'
  ]);

  grunt.registerTask('styles', [
    'csscomb',
    'sass:dev'
  ]);

  grunt.registerTask('serve', function (target) {
    if ('vagrant' === target) {
      return grunt.task.run(['concurrent:vagrant', 'watch']);
    }

    grunt.task.run([
      'concurrent:dev',
      'php:watch',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'phpunit',
    'php:test',
    'karma:unit'
  ]);
};
