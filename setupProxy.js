const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy requests to your Java Spring Boot API
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', // Replace with the actual URL of your Java Spring Boot API
      changeOrigin: true,
    })
  );
};