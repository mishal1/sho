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
    './lib/**/*.js',
    './test/**/*.js',
    './public/js/*.js'
    ]
  },
  jasmine_node: {
    options: {
      forceExit: true, 
    }, 
    all: ['test/unitTests/']
  },
  express: {
    options:{},
    dev: {
      options: {
        script: './server.js'
      }
    }
  },
  mochaTest: {
    test: {
      options: {
        reporter: 'nyan',
        quiet: false
      },
    src: ['test/acceptanceTests/*.js']
    }
  },
  protractor: {
    options: {
      configFile: "test/protractor-conf.js",
   
      // Do you want the output to use fun colors?
      noColor: false,
   
      // Set to true if you would like to use the Protractor command line debugging tool
      // debug: true,
   
      // Additional arguments that are passed to the webdriver command
      args: { }
    },
    e2e: {
      options: {
        // Stops Grunt process if a test fails
        keepAlive: false
      }
    },
    continuous: {
      options: {
        keepAlive: true
      }
    }
  },
  watch: {
    files: [ 
    './lib/**/*.js',
    './test/**/*.js',
    './views/*.ejs',
    './public/**/*.js'
    ], 
    tasks: ['express', 'protractor', 'jshint']
  }
});

grunt.loadNpmTasks('grunt-express-server');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-protractor-runner');

grunt.registerTask('test',['express','protractor']);

};