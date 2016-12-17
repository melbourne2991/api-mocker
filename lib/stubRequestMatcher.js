const matchers = require('./matchers');

module.exports = function stubMatcher(req, stub) {
  const matches = []

  let isMatch = true;

  matchers.forEach((matcher) => {
    if(matcher.test(stub) !== true) return;

    const matchResult = matcher.match(req, stub)

    if(matchResult !== true) {
      isMatch = false;
    }
  });

  return isMatch;
}