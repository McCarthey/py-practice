/* eslint-disable */

const withTypescript = require('@zeit/next-typescript');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const withLessExcludeAntd = require('./next-less.config.js');
// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './views/assets/antd-custom.less'), 'utf8'),
);

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => { };
}

// 从Node环境变量中提取
const env = Object.keys(process.env).reduce(function (o, k) {
  o['process.env.' + k] = JSON.stringify(process.env[k]);
  return o;
}, {});

module.exports = withTypescript(
  withLessExcludeAntd({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    },
    cssModules: true,
    define: {
      OMS_HOST: process.env.NODE_ENV,
    },
    webpack: function (config) {
      // 方便web环境读取环境变量
      config.plugins.push(new webpack.DefinePlugin({
				'process.env.DUBBO_REGISTER': '"192.168.1.67:2181,192.168.1.124:2181,192.168.1.17:2181"',
				'process.env.HTTP_PORT': '"8888"',
				'process.env.API_AUTH_ENABLED': '"false"',
				'process.env.REDIS_HOST': '"192.168.1.17"',
				'process.env.REDIS_PORT': '"32374"',
				'process.env.REDIS_PASSWORD': '""',
				'process.env.EREC_SERVICE_VERSION': '"1.0.1"',
				'process.env.OMS_HOST': '"http://oms.gateway.nk8s.cn"',
				'process.env.ZIPKIN_ENDPOINT': '"http://zipkin.nk8s.cn/api/v2/spans"',

      }));
      return config;
    },
    distDir: '../build',
  }),
);