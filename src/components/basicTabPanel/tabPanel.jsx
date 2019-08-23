import React from 'react';
import styles from './common.css';
import { Icon, Button, Tabs} from 'antd';

export default class DockerBasicTab extends React.Component {
  render() {
    const operations = <Button>返回</Button>;
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1363529_nopo1vjcec.js',
    });
    return (
      <div>
        <div className={styles.header}>
          <Tabs defaultActiveKey={this.props.defaultActiveKey} tabBarExtraContent={operations} onChange={this.tabChange}>
            {this.props.tabContext}
          </Tabs>
        </div>
      </div>
    );
  }
}


