const renderAdmin = require('../renderAdmin');
const handleResponse = require('../handleResponse');
const path = require('path');

module.exports = function middleware(req, res, next) {
  // Serve admin
  if (this.isAdminRoute(req)) {
    const data = {
      stubs: this.stubs
    };

    return renderAdmin(res, data, this.adminUrl);
  }

  // Serve static assets for admin
  if (this.isAssetRoute(req)) {
    const assetUrl = path.join(
      this.frontendAssetsPath, 
      this.adminUrlsRegex.exec(req.url)[1]
    );
    
    return res.sendFile(assetUrl);
  }

  // Try to find a matching stub
  const matchingStub = this.findMatchingStub(req);

  // Handle response
  if (matchingStub) {
    return this.logger.log(req, res, () => {
      handleResponse.call(this, req, res, matchingStub.response);
      next();
    });
  }

  this.logger.log(req, res, next);
};