var _ = require('underscore');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
//mocha?
var fs = require('fs');
var Server = require('../server');

describe('server', function () {
  'use strict';

  it('file should exist', function () {
    fs.existsSync('server/index.js').should.be.true;
  });
});
