const { expect } = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

describe('ApiMocker', () => {
  let ApiMocker, apiMocker, stubRequestMatcher, pathToRegexp, 
    middleware, Logger, getStubs;

  beforeEach(() => {
    stubRequestMatcher = sinon.stub();
    pathToRegexp = sinon.stub();
    middleware = { bind: sinon.stub() };
    Logger = sinon.stub();
    getStubs = sinon.stub();

    ApiMocker = proxyquire('../lib', {
      './stubRequestMatcher': stubRequestMatcher,
      'path-to-regexp': pathToRegexp,
      './middleware': middleware,
      './Logger': Logger,
      './getStubs': getStubs
    });
  });

  /* =================== constructor =================== */
  describe('constructor', () => {
    let stubsLocation = 'location/to/find/stubs',
      adminUrl = 'adminurl', 
      pathToRegexpResult = {},
      getStubsResult = {},
      middlewareResult = {},
      loggerResult = {},
      fakeConfig = {
        stubs: stubsLocation,
        adminUrl
      };

    beforeEach(() => {
      pathToRegexp.returns(pathToRegexpResult);
      getStubs.returns(getStubsResult);
      middleware.bind.returns(middlewareResult);
      Logger.returns(loggerResult);

      apiMocker = ApiMocker(fakeConfig);
    });

    it('should set the config', () => {
      expect(apiMocker.config).to.equal(fakeConfig);
    });

    it('should set the stubs', () => {
      expect(getStubs.calledOnce).to.equal(true);
      expect(getStubs.calledWith(stubsLocation)).to.equal(true);
      expect(apiMocker.stubs).to.equal(getStubsResult);
    });

    it('should set the middleware function', () => {
      expect(middleware.bind.calledOnce).to.equal(true);
      expect(middleware.bind.calledWith(apiMocker)).to.equal(true);
      expect(apiMocker.middleware).to.equal(middlewareResult);
    });

    it('should set the adminUrl regex', () => {
      expect(pathToRegexp.calledOnce).to.equal(true);
      expect(pathToRegexp.calledWith(`${adminUrl}/(.*)`));
      expect(apiMocker.adminUrlsRegex).to.equal(pathToRegexpResult);
    });

    it('should set the logger', () => {
      expect(Logger.calledOnce).to.equal(true);
      expect(apiMocker.logger).to.equal(loggerResult);
    });

    describe('when the admin url is provided', () => {
      it('should set the admin url', () => {
        expect(apiMocker.adminUrl).to.equal(adminUrl);
      });
    });

    describe('when the admin url is not provided', () => {
      beforeEach(() => {
        apiMocker = ApiMocker({
          stubs: stubsLocation
        });
      });

      it('should set the fallback url', () => {
        expect(apiMocker.adminUrl).to.equal('/__admin');
      });
    });
  });

  /* =================== findMatchingStub =================== */
  describe('findMatchingStub', () => {
    let stubs = [{
        request: {}
      }, {
        request: {}
      }],
      fakeReq = {},
      result;

    beforeEach(() => {
      getStubs.returns(stubs);

      apiMocker = ApiMocker({
        stubs: ''
      });

      stubRequestMatcher.onCall(1).returns(true);
      result = apiMocker.findMatchingStub(fakeReq);
    });

    it('should call stubRequestMatcher on each stub', () => {
      expect(stubRequestMatcher.calledTwice).to.equal(true);
    });

    it('should call stubRequestMatcher with correct args', () => {
      expect(stubRequestMatcher.getCall(0).args[0]).to.equal(fakeReq);
      expect(stubRequestMatcher.getCall(0).args[1]).to.equal(stubs[0].request);

      expect(stubRequestMatcher.getCall(1).args[0]).to.equal(fakeReq);
      expect(stubRequestMatcher.getCall(1).args[1]).to.equal(stubs[1].request);
    });

    it('should return the value which stubRequestMatcher returned true for', () => {
      expect(result).to.equal(stubs[1]);
    })
  });

  /* =================== isAdminRoute =================== */
  describe('isAdminRoute', () => {
    let adminUrl = 'admin';

    beforeEach(() => {
      apiMocker = ApiMocker({
        stubs: ''
      });
    });

    it('should return true if the urls do a match', () => {
      apiMocker.adminUrl = adminUrl;

      const req = {
        method: 'GET',
        url: adminUrl
      };

      expect(apiMocker.isAdminRoute(req)).to.equal(true);
    });

    it('should return false if the urls do not match', () => {
      apiMocker.adminUrl = adminUrl;

      const req = {
        method: 'GET',
        url: ''
      };

      expect(apiMocker.isAdminRoute(req)).to.equal(false);
    });

    it('should return false if the method does not match', () => {
      apiMocker.adminUrl = adminUrl;

      const req = {
        method: 'POST',
        url: adminUrl
      };

      expect(apiMocker.isAdminRoute(req)).to.equal(false);
    });
  });

  describe('isAssetRoute', () => {
    let adminUrlsRegex;

    beforeEach(() => {
      apiMocker = ApiMocker({
        stubs: ''
      });

      adminUrlsRegex = {
        test: sinon.stub()
      };

      apiMocker.adminUrlsRegex = adminUrlsRegex;
    });

    it('shoudld return true if method and urls match', () => {
      adminUrlsRegex.test.returns(true);

      const req = {
        method: 'GET',
        url: ''
      };

      expect(apiMocker.isAssetRoute(req)).to.equal(true);
    });

    it('shoudld return false if the methods do not match', () => {
      adminUrlsRegex.test.returns(true);

      const req = {
        method: 'POST',
        url: ''
      };

      expect(apiMocker.isAssetRoute(req)).to.equal(false);
    });

    it('should return false if the url is not under admin', () => {
      adminUrlsRegex.test.returns(false);

      const req = {
        method: 'GET',
        url: ''
      };

      expect(apiMocker.isAssetRoute(req)).to.equal(false);
    });
  });
});

