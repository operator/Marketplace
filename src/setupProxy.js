const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://operator-node-app-32192-prod.herokuapp.com',
      changeOrigin: true
    })
  );
};
