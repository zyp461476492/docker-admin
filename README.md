# Docker web 管理面板

一个轻量级，单机版本的 docker web 管理面板。

本项目前后端分离，此为前端仓库，后端仓库见XXX。

## 技术栈

- 前端框架：react + antDesign + umi + dvajs
- 后端: 基于 go net/http 模块的 http 服务

## 主要功能

- 基础资源管理
- docker 基本信息展示
- 镜像展示
- 镜像拉取
- 镜像搜索
- 镜像历史状态查询
- 镜像删除
- 新增容器
- 容器删除
- 容器实时日志
- 容器实时资源占用状态查看
- 容器启动，停止，暂停，恢复

## 前端项目结构

列出了中重要文件和目录，有些通用文件进行了忽略。

```tree
├── package.json  
├── README.md
├── .umirc.js UmiJs 配置文件
├── src
│   ├── App.js  UmiJs 自动生成文件
│   ├── assets  UmiJs 自动生成资源目录
│   ├── components  复用组件
│   ├── config.json 配置文件，用于配置后台访问地址
│   ├── global.css
│   ├── layouts UmiJs layout 相关目录
│   ├── models  全局 dvajs model
│   ├── pages  页面
│   ├── services  全局 services
│   └── utils
└── webpack.config.js UmiJs 自动生成文件
```

## 前端配置文件说明

- apiUrl 配置后台服务路径
- webSocketUrl 配置后台 websocket 服务路径

```json
{
    "apiUrl": "http://127.0.0.1:8080",
    "webSocketUrl": "ws://127.0.0.1:8080"
}
```

## 启动

安装 nodejs 和 yarn，执行下列命令

```bash
npm install
yarn start
```

## 部署

```bash
yarn build
```
