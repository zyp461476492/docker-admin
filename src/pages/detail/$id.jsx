import React from 'react';
import { connect } from 'dva';
import styles from './common.css';
import { Tabs, Icon, Row, Col } from 'antd';

import BasicPanel from '../../components/panel/basicPanel';
import ImagePanel from '../../components/panel/imagePanel';
import ContainerPanel from '../../components/panel/containerPanel';

const { TabPane } = Tabs;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1363529_bu5ex99j5ub.js',
});

class DockerBasicTab extends React.Component {
  render() {
    const assetId = this.props.match.params.id;
    return (
      <Row className={styles.container}>
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <IconFont type="icon-Docker" />
                  基本信息
                </span>
              }
              key="1"
            >
              <BasicPanel assetId={assetId} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <IconFont type="icon-image" />
                  镜像
                </span>
              }
              key="2"
            >
              <ImagePanel assetId={assetId} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <IconFont type="icon-container" />
                  容器
                </span>
              }
              key="3"
            >
              <ContainerPanel assetId={assetId} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(DockerBasicTab);
