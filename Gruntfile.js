// Generated on 2015-09-21 using generator-angularfire 1.0.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    src: 'src',
    build: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= config.src %>/scripts/{,*/}*.js'],
        tasks: ['jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      sass: {
        files: ['<%= config.src %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass']
      },
      includes: {
        files: ['<%= config.src %>/{,*/}*.html'],
        tasks: ['includes']
      },
      imagemin: {
        files: ['<%= config.src %>/images/{,*/}*.{png,jpg,jpeg}'],
        tasks: ['imagemin']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.src %>/{,*/}*.html',
          '<%= config.src %>/styles/{,*/}*.css',
          '<%= config.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static('.src'),
              connect().use(
                '/styles',
                connect.static('./styles')
              ),
              connect.static(appConfig.build)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= config.src %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= config.src %>/scripts/{,*/}*.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.dist',
            '<%= config.build %>/{,*/}*',
            '!<%= config.build %>/.git{,*/}*'
          ]
        }]
      },
      server: '.dist'
    },

    includes: {
      files: {
        src: ['<%= config.src %>/index.html', '<%= config.src %>/lineup.html', '<%= config.src %>/dealer.html'], // Source files
        dest: '<%= config.build %>', // Destination directory
        flatten: true,
        cwd: '.',
        options: {
          silent: true,
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          '<%= config.build %>/styles/main.css': '<%= config.src %>/styles/main.scss'
        }
      },
      deploy: {
        options: {
          sourceMap: true,
          outputStyle: 'compressed'
        },
        files: {
          '<%= config.build %>/styles/main.min.css': '<%= config.src %>/styles/main.scss'
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    uglify: {
      dist: {
        files: {
          '<%= config.build %>/scripts/scripts.js': [
            '<%= config.build %>/scripts/scripts.js'
          ]
        }
      }
    },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= config.build %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.build %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= config.build %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.src %>',
          dest: '<%= config.build %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'firebase.json',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp,swf}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.dist/images',
          dest: '<%= config.build %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= config.src %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'sass',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'sass',
    'copy:dist',
    'uglify',
    'imagemin',
    'includes',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);
};
