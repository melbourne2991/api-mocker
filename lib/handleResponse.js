module.exports = function handleResponse(req, res, stubResponse) {
  const { status, body, headers } = stubResponse;

  if(status) {
    res.status(status);
  }

  if(headers) {
    for (let header in headers) {
      if(headers.hasOwnProperty(header)) {
        res.set(header, headers[header]);
      }
    }
  }

  if(typeof body === 'object') {
    res.send(JSON.stringify(body));
  } else {
    res.send(body)
  }
};