var normalizer = function(data, ignoreKeys, max, min) {
  'use strict';

  max = max || {};
  min = min || {};
  ignoreKeys = ignoreKeys || [];
  var normalized = [];

  //used to set fields to ignore from the data
  var ignoreThisKey = function (key) {
    return ignoreKeys.indexOf(key) === -1 ? false : true;
  };

  //get the min and max values into our objects
  data.forEach(function (obj) {
    for (var key in obj) {
      if (max[key] === undefined && min[key] === undefined && !ignoreThisKey(key)) {
        max[key] = obj[key];
        min[key] = obj[key];
      } else {
        if (max[key] < obj[key]) {
          max[key] = obj[key];
        }
        if (min[key] > obj[key]) {
          min[key] = obj[key];
        }
      }
    }
  });

  //deletes the ignored keys from output and normalizes other keys
  data.forEach(function (obj) {
    var retArr = [];
    for (var key in obj) {
      if (!ignoreThisKey(key)) {
        //normalizes the data based where it is in the range (max - min = range from 0)
        retArr.push((obj[key] - min[key])/(max[key] - min[key]));
      }
    }
    normalized.push(retArr);
  });

  return normalized;
};

var obj = {
  name: 'normalizer',
  func: normalizer
};

module.exports = obj;