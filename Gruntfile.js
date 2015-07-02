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

grunt.registerTask('test',['express','protractor', 'karma']);
grunt.registerTask('unitTest', ['express', 'karma']);

};
