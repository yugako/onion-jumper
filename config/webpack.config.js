module.exports = () => {
  return process.env.NODE_ENV === 'development'
  ? require('./webpack.development.config')
  : require('./webpack.production.config');
}