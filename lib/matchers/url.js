const pathToRegexp = require('path-to-regexp');

module.exports =   {
  test(stubRequest) {
    return stubRequest.url !== undefined;
  },
  match(req, stubRequest) {
    const regex = pathToRegexp(stubRequest.url)
    return regex.test(req.url);
  }
};