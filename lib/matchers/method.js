module.exports =   {
  test(stubRequest) {
    return stubRequest.method && stubRequest.method.length > 0;
  }, 
  match(req, stubRequest) {
    const parsedStubMethod = stubRequest.method.toLowerCase().trim();
    const parsedReqMethod = req.method.toLowerCase().trim();

    return parsedReqMethod === parsedStubMethod;
  }
};