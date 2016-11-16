var yahooHistoricalNormalizer = function(arrOfObj, ignoreKeys, max, min) {
  max = max || {};
  min = min || {};
  ignoreKeys = ignoreKeys || [];
  var normalized = arrOfObj.slice('');

  //used to set fields to ignore from the data
  var ignoreThisKey = function (key) {
    return ignoreKeys.indexOf(key) === -1 ? false : true;
  }

  //get the min and max values into our objects
  arrOfObj.forEach(function (obj) {
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
  normalized.forEach(function (obj) {
    for (var key in obj) {
      if (!ignoreThisKey(key)) {
        //normalizes the data based where it is in the range (max - min = range from 0)
        obj[key] = (obj[key] - min[key])/(max[key] - min[key]);
      } else {
        delete obj[key];
      }
    }
  });

  return normalized;
}

var obj = {
  name: 'yahooHistoricalNormalizer',
  func: yahooHistoricalNormalizer
}

module.exports = obj;