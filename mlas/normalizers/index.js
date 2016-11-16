"use strict";

var fs = require("fs");
var path = require("path");
var normalizers = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var current = require("./" + file);
    normalizers[current.name] = current.func;
  });

module.exports = normalizers;
