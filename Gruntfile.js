// Generated on 2013-12-03 using generator-webapp 0.4.4
'use strict';

var path = require('path'),
    sh = require('shelljs'),
    moment = require('moment'),
    util = require('./lib/util'),
    _ = require('lodash');

var LIVERELOAD_PORT = 35729;

var mountFolder = function (connect, dir) {
  return connect.static(path.resolve(dir));
};

module.exports = function (grunt) {

  var yeomanConfig = {
    src: 'src',
    dist: 'dist',
    tmpl: 'src/templates'
  };

  var pageHbs = function(name) {
    return path.join('pages', name) + '.hbs';
  };

  var pageFiles = function(src) {
    return [{
      expand: true,
      cwd: '<%= yeoman.tmpl %>',
      src: _.isArray(src) ? _.map(src, pageHbs) : pageHbs(src),
      dest: '<%= yeoman.dist %>/',
      flatten: true,
      rename: function(dest, src) {
        return path.join(yeomanConfig.dist, path.basename(src, '.hbs'), 'index');
      }
    }];
  };

  var config = grunt.file.readJSON('src/data/data.json');

  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // configurable paths
    yeoman: yeomanConfig,
    watch: {
      assemble: {
        files: [
          '<%= yeoman.tmpl %>/**/*.hbs', 
          '<%= assemble.options.data %>'
        ],
        tasks: ['assemble']
      },
      less: {
        files: ['<%= yeoman.src %>/styles/*.less'],
        tasks: ['less']
      },
      handlebars: {
        files: ['<%= yeoman.src %>/scripts/templates**/*.hbs'],
        tasks: ['handlebars']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.dist %>/*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.src %>}/scripts/{,*/,*/*/}*.js',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: LIVERELOAD_PORT,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.src),
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
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
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
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
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.src %>/templates/layouts/default.hbs',
    },
    usemin: {
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/,*/*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
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
      options: {
        //collapseWhitespace: true
        //collapseBooleanAttributes: true,
        //removeAttributeQuotes: true,
        //removeRedundantAttributes: true,
        //useShortDoctype: true,
        //removeOptionalTags: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
    },
    concurrent: {
      dev: ['assemble','less', 'handlebars'],
      dist: ['assemble', 'less', 'requirejs']
    },
    requirejs: {
      dist: {
        options: {
          almond: true,
          wrap: false, // not wrap for handlebars
          baseUrl: '<%= yeoman.src %>/scripts',
          optimize: 'uglify',
          preserveLicenseComments: false,
          useStrict: true,
          mainConfigFile: '<%= yeoman.src %>/scripts/main.js',
          out: '<%= yeoman.dist %>/scripts/main.js',
          name: 'main',
          paths: {
            templates: '../../.tmp/scripts/templates'
          },
          replaceRequireScript: [{
            files: ['<%= yeoman.dist %>/**/*.html'],
            module: 'main'
          }]
        }
      }
    },
    less: {
      dev: {
        options: {
          paths: ['<%= yeoman.src %>/styles']
        },
        files: {
          '.tmp/styles/main.css': '<%= yeoman.src %>/styles/main.less'
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          amd: true,
          processName: function (filename) {
            var tmplPath = yeomanConfig.src + '/scripts/templates/';
            return filename.replace(tmplPath, '').replace('.hbs', '');
          },
          processContent: function (content) {
            return content.replace(/^[\s\r\n]+/, '').replace(/[\s\r\n]*$/, '');
          }
        },
        files: {
          '.tmp/scripts/templates.js': [
            '<%= yeoman.src %>/scripts/templates**/*.hbs'
          ]
        }
      }
    },
    assemble: {
      options: {
        partials: '<%= yeoman.tmpl %>/partials/*.hbs',
        data: '<%= yeoman.src %>/data/*.{json,yml}',
        layoutdir: '<%= yeoman.tmpl %>/layouts',
        plugins: ['<%= yeoman.src %>/plugins/**/*.js'],
        helpers: ['<%= yeoman.src %>/helpers/*.js', 'handlebars-helpers'],
        layout: 'default.hbs',
        flatten: true
      },
      home: {
        files: {
          '<%= yeoman.dist %>/': ['<%= yeoman.tmpl %>/pages/index.hbs']
        }
      },
      sections: {
        files: pageFiles(_.pluck(config.sections, 'name'))
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean',
      'setup',
      'concurrent:dev',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'setup',
    'useminPrepare',
    'handlebars',
    'concurrent:dist',
    'concat',
    'cssmin',
    'htmlmin',
    'usemin'
    //'autoprefixer',
    //'rev',
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('setup', function(force) {
    var dist = yeomanConfig.dist,
        pwd = process.cwd();

    var done = this.async();

    function getRemoteUrl() {
      var cmd = 'git config --get remote.origin.url';
      return sh.exec(cmd, { silent: true }).output.trim();
    }

    function setup() {
      var remote = getRemoteUrl();

      sh.mkdir(dist);
      sh.cd(dist);
      sh.exec('git init');
      sh.exec('git remote add origin ' + remote);
      sh.exec('git pull origin master');
      sh.exec('git branch --set-upstream-to=origin/master master');
      sh.cd(pwd);
    }

    if (force) {
      sh.rm('-rf', dist);
      setup();
    }

    util.isDir(dist + '/.git', function(error, val) {
      if (!val) setup();
      done();
    });

  });

  grunt.registerTask('deploy', function() {
    var dist = yeomanConfig.dist,
        pwd = process.cwd();

    var time = moment().local().format(),
        msg = '"Site updated at ' + time + '"';

    sh.cd(dist);
    sh.exec('git pull');
    sh.exec('git add -A');
    grunt.log.write('Committing: ' + msg + '\n');
    sh.exec('git commit -m ' + msg);
    grunt.log.write('Pushing: ' + msg) + '\n';
    sh.exec('git push origin master');
    grunt.log.write('Github Page deploy completed.\n');
    sh.cd(pwd);
  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('fuck', function() {
    console.log(grunt.config(['assemble','sections','files']));
  });
};
