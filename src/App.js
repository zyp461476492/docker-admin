import React from 'react';
import { LocaleProvider } from 'antd';
import DockerAssetList from './pages/docker-asset-list/DockerAssetList';
import zhCN from 'antd/es/locale-provider/zh_CN';
import './App.css';

function App() {
  return (
    <LocaleProvider locale={zhCN}>
      <DockerAssetList />
    </LocaleProvider>
  );
}

export default App;
