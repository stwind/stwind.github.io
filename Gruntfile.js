// Generated on 2013-12-03 using generator-webapp 0.4.4
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    staging: 'staging'
  };

  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // configurable paths
    yeoman: yeomanConfig,
    watch: {
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
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
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>',
          livereload: false
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
      staging: ['.tmp', '<%= yeoman.staging %>']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
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
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
            '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.staging %>/contents'
      },
      html: '<%= yeoman.app %>/templates/index.html',
    },
    usemin: {
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.staging %>/{,*/}*.html'],
      css: ['<%= yeoman.staging %>/styles/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= yeoman.dist %>/images'
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
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      staging: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/contents',
          dest: '<%= yeoman.staging %>/contents',
          src: [
            '**/*.{ico,png,txt,jpg,json,md}',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*',
            '!bower_components/**'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/templates',
          dest: '<%= yeoman.staging %>/templates',
          src: ['**']
        }]
      }
    },
    concurrent: {
      staging: [
        'copy:staging',
        'requirejs',
        'less'
      ]
    },
    wintersmith: {
      build: {
        options: {
          config: {
            contents: '<%= yeoman.staging %>/contents',
            templates: '<%= yeoman.staging %>/templates',
            plugins: ['wintersmith-handlebars'],
            output: '<%= yeoman.dist %>'
          }
        }
      },
      preview: {
        options: {
          config: {
            contents: '<%= yeoman.app %>/contents',
            templates: '<%= yeoman.app %>/templates',
            plugins: [
              'wintersmith-less', 
              'wintersmith-handlebars',
              'wintersmith-livereload'
            ],
          },
          action: 'preview'
        }
      }
    },
    requirejs: {
      dist: {
        options: {
          almond: true,
          wrap: true,
          baseUrl: '<%= yeoman.app %>/contents/scripts',
          optimize: 'uglify',
          preserveLicenseComments: false,
          useStrict: true,
          mainConfigFile: '<%= yeoman.app %>/contents/scripts/main.js',
          out: '<%= yeoman.staging %>/contents/scripts/main.js',
          name: 'main',
          replaceRequireScript: [{
            files: ['<%= yeoman.staging %>/templates/index.html'],
            module: 'main'
          }]
        }
      }
    },
    less: {
      staging: {
        options: {
          paths: ['<%= yeoman.app %>/contents/styles']
        },
        files: {
          '.tmp/styles/main.css': '<%= yeoman.app %>/contents/styles/main.less'
        }
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'wintersmith:preview'
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'concurrent:staging',
    'concat',
    'cssmin',
    'usemin',
    'wintersmith:build',
    //'autoprefixer',
    //'rev',
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
