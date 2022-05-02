module.exports = {
  //publicPath: '/antbundle/'
  publicPath: process.env.NODE_ENV === 'production'
    ? '/antbundle/'
    : '/'
}
