const deepEqual = require('deep-equal');

module.exports =   {
  test(stubRequest) {
    return stubRequest.body !== undefined
  },
  match(req, stubRequest) {
    if(typeof stubRequest === 'string') {
      return req.body === stubRequest.body;
    } 

    return deepEqual(req.body, stubRequest.body);
  }
};