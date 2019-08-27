import React from 'react';
import styles from './panel.css';
import { Icon, Tabs, PageHeader, Row, Col } from 'antd';

const { TabPane } = Tabs;

export default class Basic extends React.Component {
  render() {
    return (
      <Row className={styles.container}>
        <Col span={24}>
          <PageHeader
            onBack={() => null}
            title={this.props.title}
            subTitle={this.props.subTitle}
            footer={
              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={
                    <span>
                      <Icon type="apple" />
                      基本信息
                    </span>
                  }
                  key="1"
                ></TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="apple" />
                      镜像
                    </span>
                  }
                  key="2"
                ></TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="apple" />
                      容器
                    </span>
                  }
                  key="3"
                ></TabPane>
              </Tabs>
            }
          />
        </Col>
        <Col className={styles.block} span={24}>
          {this.props.content}
        </Col>
      </Row>
    );
  }
}
