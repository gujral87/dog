module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: { // Task
      dist: { // Target
        options: { // Target options
          style: 'expanded'
        },
        files: { // Dictionary of files
          'app/ui_assets/style/minify/main.css': 'app/ui_assets/style/src/main.scss',
          'app/ext_assets/style/minify/popup.css': 'app/ext_assets/style/src/popup.scss'
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          "prod/dog/ui_assets/scripts/src/application.js": "app/ui_assets/scripts/compiled/application.js",
          "prod/dog/ui_assets/scripts/src/auth.js": "app/ui_assets/scripts/compiled/auth.js",
          "prod/dog/ext_assets/scripts/src/Db.js": "app/ext_assets/scripts/compiled/Db.js",
          "prod/dog/ext_assets/scripts/src/wallpaper.js": "app/ext_assets/scripts/compiled/wallpaper.js",
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['env']
      },
      dist: {
        files: {
          "app/ui_assets/scripts/compiled/application.js": "app/ui_assets/scripts/src/application.js",
          "app/ui_assets/scripts/compiled/auth.js": "app/ui_assets/scripts/src/auth.js",
          "app/ext_assets/scripts/compiled/Db.js": "app/ext_assets/scripts/src/Db.js",
          "app/ext_assets/scripts/compiled/wallpaper.js": "app/ext_assets/scripts/src/wallpaper.js"
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            "prod/dog/manifest.json": 'app/manifest.json'
          },
          {
            expand: true,
            cwd: 'app', // 'Current Working Directory'
            src: 'libs/**', // Read everything inside the cwd
            dest: 'prod/dog/', // Destination folder
          },
          {
            expand: true,
            cwd: 'app', // 'Current Working Directory'
            src: 'ext_assets/images/**', // Read everything inside the cwd
            dest: 'prod/dog/', // Destination folder
          },
          {
            expand: true,
            cwd: 'app', // 'Current Working Directory'
            src: 'ui_assets/images/**', // Read everything inside the cwd
            dest: 'prod/dog/', // Destination folder
          },
          {
            expand: true,
            cwd: 'app', // 'Current Working Directory'
            src: 'ui_assets/webfonts/**', // Read everything inside the cwd
            dest: 'prod/dog/', // Destination folder
          },
          {
            expand: true,
            cwd: 'app', // 'Current Working Directory'
            src: 'ui_assets/style/minify/**', // Read everything inside the cwd
            dest: 'prod/dog/', // Destination folder
          }
        ],
      }
    },
    htmlmin: { // Task
      dist: { // Target
        options: { // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: { // Dictionary of files
          'prod/dog/index.html': 'app/index.html', // 'destination': 'source'
          'prod/dog/work.html': 'app/work.html',
          'prod/dog/popup.html' : 'app/popup.html'
        }
      }
    },
    zip: {
      'app.zip': ['app/**','Gruntfile.js','package.json']
    },
    clean: {
      map: ['prod/dog/**/*.map']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-zip');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('production', ['babel', 'uglify', 'htmlmin', 'copy','clean']);
};
