const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://backend-service:5000', // Use service name without port in DNS lookup
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api prefix before proxying
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to: ${proxyReq.getHeader('host')}${req.url}`);
      },
    })
  );
};
