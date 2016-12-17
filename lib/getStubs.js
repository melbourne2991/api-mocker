module.exports = function(stubsRelativePath) {
  const fullStubsPath = path.join(process.cwd(), stubsRelativePath);
  return require(stubsPath);
};