// Generated on 2013-09-27 using generator-webapp 0.4.3
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // show elapsed time at the end
	require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/redstone/{,*/}*.{scss,sass}'],
        tasks: [
        	'compass:server', 
        	'cssmin:server',
        	'autoprefixer:server'
        ]
      },
      styles: {
        files: ['.tmp/styles/{,*/}*.css'],
        tasks: [/*'copy:styles',*/ 'autoprefixer:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/*.html',
          //'<%= yeoman.app %>/redstone/**/{,*/}*.css',
          '<%= yeoman.app %>/redstone/styles.css',
          '{.tmp,<%= yeoman.app %>}/redstone/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.app %>/redstone/styles.css'
          ]
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/redstone/{,*/}*.js',
        '!<%= yeoman.app %>/redstone/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/redstone',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/redstone',
        fontsDir: '<%= yeoman.app %>/redstone/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/redstone/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
      	files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      server: {
      	files: [{
          src: '<%= yeoman.app %>/redstone/styles.css',
          dest: '<%= yeoman.app %>/redstone/styles.css'
        }]
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
        dist: {}
    },*/
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // `name` and `out` is set by grunt-usemin
          baseUrl: '<%= yeoman.app %>/redstone',
          optimize: 'none',
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/redstone/{,*/}*.js',
            '<%= yeoman.dist %>/redstone/{,*/}*.css',
            '<%= yeoman.dist %>/redstone/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= yeoman.dist %>/redstone/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.app %>/index.html'
    },
    usemin: {
      options: {
          dirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/redstone/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/redstone',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/redstone'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // This task is pre-configured if you do not wish to use Usemin
      // blocks for your CSS. By default, the Usemin block from your
      // `index.html` will take care of minification, e.g.
      //
      //     <!-- build:css({.tmp,app}) styles/main.css -->
      //
      server: {
        files: {
          '<%= yeoman.app %>/redstone/styles.css': [
            '.tmp/styles/{,*/}*.css'
          ]
        }
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/redstone/styles.css': [
            //'.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/redstone/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'redstone/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'redstone/fonts/{,*/}*.*',
            'bower_components/sass-bootstrap/fonts/*.*',
            'content/**/*' // ADDITION to include course content
          ]
      }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/redstone',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    modernizr: {
      devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
      outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
      files: [
        '<%= yeoman.dist %>/redstone/{,*/}*.js',
        '<%= yeoman.dist %>/redstone/{,*/}*.css',
        '!<%= yeoman.dist %>/redstone/vendor/*'
      ],
      uglify: true
    },
    concurrent: {
      server: [
        'compass'/*,
        'copy:styles'*/
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'compass',
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    bower: {
      options: {
        exclude: ['modernizr']
      },
      all: {
        rjsConfig: '<%= yeoman.app %>/redstone/main.js'
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'cssmin:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer:dist',
    'requirejs',
    'concat',
    'cssmin:dist',
    'uglify',
    'modernizr',
    'copy:dist',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};