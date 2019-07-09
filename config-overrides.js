const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
    fixBabelImports('imports', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    })
);