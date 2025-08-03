module.exports = {
  require: ['./test/setup.js'],
  timeout: 10000,
  exit: true,
  recursive: true,
  spec: 'test/**/*.test.js',
  reporter: 'spec',
  slow: 2000,
  extension: ['js', 'jsx'],
  require: ['@babel/register']
}; 