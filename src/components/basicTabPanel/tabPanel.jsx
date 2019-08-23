import React from 'react';
import styles from './panel.css';
import { Icon, Button, Tabs } from 'antd';

const TabPane = { Tabs };

export default class DockerBasicTabe extends React.Component {
  render() {
    const operations = <Button>返回</Button>;
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1363529_nopo1vjcec.js',
    });
    return (
        <div>
        <div className={styles.header}>
          <Tabs defaultActiveKey="basic" tabBarExtraContent={operations} >
            <TabPane
              tab={
                <span>
                  <IconFont type="icon-Docker" />
                  基本信息
                </span>
              }
              key="basic"
            >
              {this.props.test}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <IconFont type="icon-acrrongqijingxiangfuwu" />
                  镜像
                </span>
              }
              key="image"
            >
             
            </TabPane>

            <TabPane
              tab={
                <span>
                  <IconFont type="icon-rongqifuwuContainerServi" />
                  容器
                </span>
              }
              key="container"
            />
          </Tabs>
        </div>
      </div>
    );
  }
}

