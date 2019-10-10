import React from 'react';
import { connect } from 'dva';
import styles from './panel.css';
import { Result, Skeleton, Descriptions, Card, Row, Col } from 'antd';
import StatusTip from '../../components/status-tip/statusTip';
import ReactJson from 'react-json-view';

class BasicPanel extends React.Component {
  componentDidMount = () => {
    const id = this.props.assetId;
    this.props.dispatch({
      type: 'dockerBasic/dockerInfo',
      payload: { id },
    });
  };

  render() {
    let context = <Skeleton active />;
    if (this.props.dockerInfo && this.props.dockerInfo.Res) {
      context = (
        <div>
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
                      desc="运行中的容器数量"
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
                      desc="暂停的容器数量"
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
                      desc="停止运行的容器数量"
                      value={this.props.dockerInfo.Obj.ContainersStopped}
                    />
                  </Card>
                </div>
              </Col>
            </Row>
          </div>

          <div>
            <Row type="flex" className={styles.block}>
              <Col span={24}>
                <Card bordered={false}>
                  <Descriptions title="基本信息" bordered={true}>
                    <Descriptions.Item label="Architecture">
                      {this.props.dockerInfo.Obj.Architecture.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="CgroupDriver">
                      {this.props.dockerInfo.Obj.CgroupDriver.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="DefaultRuntime">
                      {this.props.dockerInfo.Obj.DefaultRuntime.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="DockerRootDir">
                      {this.props.dockerInfo.Obj.DockerRootDir.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Driver">
                      {this.props.dockerInfo.Obj.Driver.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="ID">
                      {this.props.dockerInfo.Obj.ID.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="IndexServerAddress">
                      {this.props.dockerInfo.Obj.IndexServerAddress.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="InitBinary">
                      {this.props.dockerInfo.Obj.InitBinary.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="KernelVersion">
                      {this.props.dockerInfo.Obj.KernelVersion.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="LoggingDriver">
                      {this.props.dockerInfo.Obj.LoggingDriver.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="MemTotal">
                      {this.props.dockerInfo.Obj.MemTotal.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="NCPU">
                      {this.props.dockerInfo.Obj.NCPU.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="NEventsListener">
                      {this.props.dockerInfo.Obj.NEventsListener.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="NFd">
                      {this.props.dockerInfo.Obj.NFd.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="NGoroutines">
                      {this.props.dockerInfo.Obj.NGoroutines.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Name">
                      {this.props.dockerInfo.Obj.Name.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="NoProxy">
                      {this.props.dockerInfo.Obj.NoProxy.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="OSType">
                      {this.props.dockerInfo.Obj.OSType.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="OperatingSystem">
                      {this.props.dockerInfo.Obj.OperatingSystem.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="ServerVersion">
                      {this.props.dockerInfo.Obj.ServerVersion.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="SystemTime">
                      {this.props.dockerInfo.Obj.SystemTime.toString()}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            <Row type="flex" className={styles.block}>
              <Col span={24}>
                <Card bordered={false}>
                  <Descriptions title="swarm 信息" bordered={true} column={2}>
                    <Descriptions.Item label="ControlAvailable">
                      {this.props.dockerInfo.Obj.Swarm.ControlAvailable.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Error">
                      {this.props.dockerInfo.Obj.Swarm.Error.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="LocalNodeState">
                      {this.props.dockerInfo.Obj.Swarm.LocalNodeState.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Managers">
                      {this.props.dockerInfo.Obj.Swarm.Managers.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="NodeAddr">
                      {this.props.dockerInfo.Obj.Swarm.NodeAddr.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="NodeID">
                      {this.props.dockerInfo.Obj.Swarm.NodeID.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nodes">
                      {this.props.dockerInfo.Obj.Swarm.Nodes.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="RemoteManagers">
                      {this.props.dockerInfo.Obj.Swarm.RemoteManagers}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            <Row type="flex" className={styles.block}>
              <Col span={24}>
                <Card bordered={false}>
                  <Descriptions title="其他参数" bordered={true} column={2}>
                    <Descriptions.Item label="BridgeNfIp6tables">
                      {this.props.dockerInfo.Obj.BridgeNfIp6tables.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="BridgeNfIptables">
                      {this.props.dockerInfo.Obj.BridgeNfIptables.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="CPUSet">
                      {this.props.dockerInfo.Obj.CPUSet.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="CPUShares">
                      {this.props.dockerInfo.Obj.CPUShares.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="CpuCfsPeriod">
                      {this.props.dockerInfo.Obj.CpuCfsPeriod.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="CpuCfsQuota">
                      {this.props.dockerInfo.Obj.CpuCfsQuota.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Debug">
                      {this.props.dockerInfo.Obj.Debug.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="ExperimentalBuild">
                      {this.props.dockerInfo.Obj.ExperimentalBuild.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="IPv4Forwarding">
                      {this.props.dockerInfo.Obj.IPv4Forwarding.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="KernelMemory">
                      {this.props.dockerInfo.Obj.KernelMemory.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="LiveRestoreEnabled">
                      {this.props.dockerInfo.Obj.LiveRestoreEnabled.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="MemoryLimit">
                      {this.props.dockerInfo.Obj.MemoryLimit.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="OomKillDisable">
                      {this.props.dockerInfo.Obj.OomKillDisable.toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="SwapLimit">
                      {this.props.dockerInfo.Obj.SwapLimit.toString()}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <Row type="flex" className={styles.block}>
              <Col span={24}>
                <Card bordered={false}>
                  <Descriptions title="JSON" bordered={true}>
                    <Descriptions.Item label="RAW">
                      <ReactJson collapsed={true} src={this.props.dockerInfo.Obj} />
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      );
    } else if (this.props.dockerInfo) {
      context = <Result status="error" title="查询失败" subTitle={this.props.dockerInfo.Info} />;
    }
    return context;
  }
}

function mapStateToProps(state) {
  return {
    dockerInfo: state.dockerBasic.dockerInfo,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(BasicPanel);
