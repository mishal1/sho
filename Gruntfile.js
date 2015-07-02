module.exports = function(grunt){
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  jshint: {
    options: {
      node: true, 
      jasmine: true
    },
    all: [
    'Gruntfile.js', 
    './app/js/*.js',
    './test/**/*.js',
    './lib/*.js'
    ]
  },
  express: {
    options:{},
    dev: {
      options: {
        script: './server.js'
      }
    }
  },
  protractor: {
    options: {
      configFile: "test/protractor-conf.js",
      noColor: false,
      args: { }
    },
    e2e: {
      options: {
        keepAlive: false
      }
    }
  },
  karma: {
    unit: {
      configFile: 'test/karma.conf.js'
    }
  },
  'start-selenium-server': {
      dev: {
        options: {
          autostop: false,
          downloadUrl: 'https://selenium-release.storage.googleapis.com/2.46/selenium-server-standalone-2.46.0.jar',
          downloadLocation: os.tmpdir(),
          serverOptions: {},
          systemProperties: {}
        }
      }
    },
    'stop-selenium-server': {
      dev: {}
    },
  watch: {
    files: [ 
    './test/**/*.js',
    './app/views/*.ejs',
    './app/js/*.js',
    './public/**/*.js',
    './lib/*.js'
    ], 
    tasks: ['express', 'karma', 'protractor', 'jshint']
  }
});

grunt.loadNpmTasks('grunt-express-server');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-protractor-runner');
grunt.loadNpmTasks('grunt-karma');
grunt.loadNpmTasks('grunt-selenium-server');

grunt.registerTask('test',['express','start-selenium-server:dev','protractor', 'stop-selenium-server:dev', 'karma']);
grunt.registerTask('unitTest', ['express', 'karma']);
grunt.registerTask('featureTest', ['express', 'start-selenium-server:dev', 'protractor', 'stop-selenium-server:dev']);

};
