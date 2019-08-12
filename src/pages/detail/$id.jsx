import React from 'react';
import { connect } from 'dva';
import styles from './detail.css';
import { Skeleton, Alert, Card, Row, Col } from 'antd';
import StatusTip from '../../components/status-tip/statusTip';

class DockerBasicPanel extends React.Component {
  render() {
    let context = <Alert message="信息查询失败" type="error" />;
    if (this.props.dockerInfo && this.props.dockerInfo.Res) {
      context = (
        <div>
          <div className={styles.header}>
            <div className={styles.statistics}>
              <Row type="flex" gutter={32}>
                <Col span={12}>
                  <div>
                    <Card bordered={false}>
                      <StatusTip
                        type="normal"
                        title="镜像"
                        desc="镜像数量"
                        value={this.props.dockerInfo.Obj.Images}
                      />
                    </Card>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Card bordered={false}>
                      <StatusTip
                        type="normal"
                        title="容器"
                        desc="容器数量"
                        value={this.props.dockerInfo.Obj.Containers}
                      />
                    </Card>
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Row type="flex" gutter={16}>
                <Col span={8}>
                  <div>
                    <Card bordered={false}>
                      <StatusTip
                        type="success"
                        title="运行中"
                        desc="镜像数量"
                        value={this.props.dockerInfo.Obj.ContainersRunning}
                      />
                    </Card>
                  </div>
                </Col>
                <Col span={8}>
                  <div>
                    <Card bordered={false}>
                      <StatusTip
                        type="warn"
                        title="已暂停"
                        desc="镜像数量"
                        value={this.props.dockerInfo.Obj.ContainersPaused}
                      />
                    </Card>
                  </div>
                </Col>
                <Col span={8}>
                  <div>
                    <Card bordered={false}>
                      <StatusTip
                        type="error"
                        title="已停止"
                        desc="镜像数量"
                        value={this.props.dockerInfo.Obj.ContainersStopped}
                      />
                    </Card>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      );
    }
    return <Skeleton loading={this.props.loading}>{context}</Skeleton>;
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    dockerInfo: state.dockerBasic.dockerInfo,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(DockerBasicPanel);
