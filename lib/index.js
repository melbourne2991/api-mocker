const stubRequestMatcher = require('./stubRequestMatcher');
const pathToRegexp = require('path-to-regexp');
const middleware = require('./middleware');
const Logger = require('./Logger');
const getStubs = require('./getStubs');

class ApiMocker {
  constructor(config) {
    this.frontendAssetsPath = `${__dirname}/frontend/assets`;
    this.config = config;
    this.stubs = getStubs(config.stubs);
    this.middleware = middleware.bind(this);
    this.adminUrl = config.adminUrl || '/__admin';
    this.adminUrlsRegex = pathToRegexp(`${this.adminUrl}/(.*)`);
    this.logger = Logger();
  }

  findMatchingStub(req) {
    return this.stubs.find((stub) => {
      return stubRequestMatcher(req, stub.request);
    });
  }

  isAdminRoute(req) {
    return req.method === 'GET' && req.url === this.adminUrl;
  }

  isAssetRoute(req) {
    return req.method === 'GET' && this.adminUrlsRegex.test(req.url);
  }
}

module.exports = function(config) {
  return new ApiMocker(config);
}