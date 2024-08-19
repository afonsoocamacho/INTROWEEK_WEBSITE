const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://introweek-runcmd-website-e0032d4f624f.herokuapp.com",
      changeOrigin: true,
    })
  );
};
