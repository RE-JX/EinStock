module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //jshint: {
      //files: [ 'src/*'
     // ],
    //},

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    },
  });
};
