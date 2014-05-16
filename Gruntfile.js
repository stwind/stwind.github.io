// Generated on 2013-12-03 using generator-webapp 0.4.4
'use strict';

var path = require('path'),
    fs = require('fs'),
    sh = require('shelljs'),
    moment = require('moment'),
    _ = require('lodash');

var LIVERELOAD_PORT = 35729;

var mountFolder = function (connect, dir) {
  return connect.static(path.resolve(dir));
};

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var yeomanConfig = {
    src: 'src',
    dist: 'dist',
    tmpl: 'src/templates',
    data: 'src/data'
  };

  grunt.initConfig({
    // configurable paths
    yeoman: yeomanConfig,
    watch: {
      //assemble: {
        //files: [
          //'<%= yeoman.tmpl %>/**/*.hbs', 
          //'<%= assemble.options.data %>'
        //],
        //tasks: ['assemble', 'htmlmin']
      //},
      less: {
        files: ['<%= yeoman.src %>/styles/*.less'],
        tasks: ['less']
      },
      //css: {
        //files: ['<%= yeoman.src %>/styles/*.css'],
        //tasks: ['copy:css']
      //},
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.dist %>/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.src %>}/scripts/**/*.js',
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
        collapseWhitespace: true
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
      css: {
        files: [{
          expand: true, 
          src: ['<%= yeoman.src %>/styles/*.css'], 
          dest: '<%= yeoman.dist %>/styles',
          flatten: true
        }]
      },
      fonts: {
        files: [{
          expand: true, 
          src: ['<%= yeoman.src %>/styles/fonts/*.woff'], 
          dest: '<%= yeoman.dist %>/styles/fonts',
          flatten: true
        }]
      }
    },
    concurrent: {
      dev: ['assemble', 'copy', 'less'],
      dist: ['assemble', 'copy:fonts', 'less']
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
    assemble: {
      options: {
        partials: '<%= yeoman.tmpl %>/partials/*.hbs',
        data: '<%= yeoman.data %>/*.{json,yml}',
        layoutdir: '<%= yeoman.tmpl %>/layouts',
        //plugins: ['<%= yeoman.src %>/plugins/**/*.js'],
        helpers: ['<%= yeoman.src %>/helpers/*.js', 'handlebars-helpers'],
        layout: 'default.hbs',
        flatten: true,
        marked: {
          breaks: true
        }
      },
      index: {
        files: {
          '<%= yeoman.dist %>/': ['<%= yeoman.tmpl %>/pages/index.hbs']
        }
      },
      nodes: {
        options: {
          layout: "node.hbs",
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.data %>/nodes',
          src: '*.md',
          dest: '<%= yeoman.dist %>/n',
          flatten: true,
          ext: '/index'
        }]
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
    'usemin',
    'htmlmin'
    //'autoprefixer',
    //'rev',
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('setup', function(force) {
    var dist = yeomanConfig.dist,
        pwd = process.cwd();

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

    if (force) sh.rm('-rf', dist);

    if (!grunt.file.isDir(dist + '/.git')) setup();

  });

  grunt.registerTask('deploy', function() {
    var dist = yeomanConfig.dist,
        pwd = process.cwd();

    var time = moment().local().format(),
        msg = '"Site updated at ' + time + '"';

    sh.cd(dist);
    sh.exec('git pull');
    sh.exec('git add -A');
    grunt.log.writeln('Committing: ' + msg);
    sh.exec('git commit -m ' + msg);
    grunt.log.writeln(' OK'.green);
    grunt.log.writeln('Pushing: ' + msg);
    sh.exec('git push origin master');
    grunt.log.writeln(' OK'.green);
    grunt.log.writeln('Github Page deploy completed.');
    sh.cd(pwd);
  });

  grunt.registerTask('new-post', function() {
    var title = grunt.option('title') || 'untitled post',
        name = title.replace(/ /gi, '-').toLowerCase(),
        target = yeomanConfig.data + '/posts/' + name + '.md';

    var context = {
      title: title,
      name: name,
      time: moment().local().format()
    };

    var template = "---\n" +
    "title: <%= title %>\n" + 
    "name: <%= name %>\n" + 
    "time: <%= time %>\n" +
    "---\n";

    grunt.log.write('Writing file:', target.cyan);
    grunt.file.write(target, grunt.template.process(template, {data: context}));
    grunt.log.writeln(' OK'.green);
  });

  grunt.loadNpmTasks('assemble');
};
