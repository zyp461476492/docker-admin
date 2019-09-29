// ref: https://umijs.org/config/
import config from '@/config.json';

export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'docker admin',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  "proxy": {
    "/api": {
      "target": config.apiUrl,
      "changeOrigin": true,
      "pathRewrite": { "^/api" : config.apiUrl }
    }
  }
};
