
module.exports = function renderAdmin(res, data, baseUrl) {
  res.format({
    'text/html'() {
      res.send(renderHtml(data, baseUrl));
    },

    'application/json'() {
      res.send(data);
    }
  })
}

function renderHtml(data, baseUrl) {
  return `<!doctype html>
<html>
  <head>
    <title>API Mocker</title>
  </head>
  <body>

    <script>
      window.__API_MOCKER_DATA__ = ${JSON.stringify(data)}
    </script>

    <script type="text/javascript" src="${baseUrl}/bundle.js"></script>
  </body>
</html>
`
}