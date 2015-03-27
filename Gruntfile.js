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
      noColor: false,
      args: { }
    },
    e2e: {
      options: {
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
    './test/**/*.js',
    './app/views/*.ejs',
    './app/js/*.js',
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