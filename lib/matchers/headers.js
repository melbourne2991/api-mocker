module.exports =   {
  test(stubRequest) {
    return stubRequest.headers !== undefined
  },
  match(req, stubRequest) {
    if(!req.headers) return false;

    let isMatch = true;

    for (let key in stubRequest.headers) {
      if (stubRequest.headers.hasOwnProperty(key)) {
        const reqHeader = req.headers[key];
        const stubRequestHeader = stubRequest.headers[key];

        if(!reqHeader || reqHeader !== stubRequestHeader) {
          isMatch = false;
        }
      }
    }

    return isMatch
  }
};