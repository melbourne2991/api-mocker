const { expect } = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const middleware = require('../../lib/middleware');

describe('middleware', () => {
  let unboundMiddleware, middleware, adminUrlsRegex, isAdminRoute, 
  renderAdmin, adminUrl, req, res, next, handleResponse, stubs, path;

  beforeEach(() => {
    path = {
      join: sinon.stub()
    };

    isAdminRoute = sinon.stub();
    isAssetRoute = sinon.stub();
    renderAdmin = sinon.stub();
    handleResponse = sinon.stub();

    stubs = [];
    adminUrl = 'url';

    unboundMiddleware = proxyquire('../../lib/middleware', {
      'path': path,
      '../renderAdmin': renderAdmin,
      '../handleResponse': handleResponse
    });

    req = {};

    res = {
      sendFile: sinon.stub()
    };

    adminUrlsRegex = {
      exec: sinon.stub()
    };

    next = sinon.spy();
  });

  describe('handle admin route', () => {
    beforeEach(() => {
      isAdminRoute.returns(true);

      middleware = unboundMiddleware.bind({
        isAdminRoute,
        isAssetRoute,
        stubs,
        adminUrl
      });

      middleware(req, res, next);
    });

    it('should call renderAdmin', () => {
      const data = {
        stubs
      };

      expect(renderAdmin.calledWith(
        sinon.match.same(res),
        data,
        adminUrl
      )).to.be.true;
    });

    it('should not call sendFile', () => {
      expect(res.sendFile.called).to.be.false;
    });
  });

  describe('handle asset route', () => {
    let assetPath, frontendAssetsPath, fullAssetPath;

    beforeEach(() => {
      isAdminRoute.returns(false);
      isAssetRoute.returns(true);

      req = {
        url: 'http://url.com/'
      }

      frontendAssetsPath = '/base';
      assetPath = 'path-to-asset';

      adminUrlsRegex.exec.returns(['', assetPath]);
      path.join.returns(fullAssetPath);

      middleware = unboundMiddleware.bind({
        isAdminRoute,
        isAssetRoute,
        stubs,
        adminUrl,
        adminUrlsRegex,
        frontendAssetsPath
      });

      middleware(req, res, next);
    });

    it('should call adminUrlsRegex with the request url', () => {
      expect(adminUrlsRegex.exec.calledWith(req.url)).to.be.true;
    });

    it('should call path', () => {
      expect(path.join.calledWith(frontendAssetsPath, assetPath)).to.be.true;
    });

    it('should call sendFile with the fullAssetPath', () => {
      expect(res.sendFile.calledWith(fullAssetPath)).to.be.true;
    });
  });

  describe('handle stub', () => {
    beforeEach(() => {
      isAdminRoute.returns(false);
      isAssetRoute.returns(false);

      middleware = unboundMiddleware.bind({
        isAdminRoute,
        isAssetRoute,
        stubs,
        adminUrl
      });

      middleware(req, res, next);
    });

    it('should call findMatchingStub', () => {
      
    });
  });
});
