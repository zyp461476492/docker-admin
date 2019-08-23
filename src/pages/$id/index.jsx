import React from 'react';
import { connect } from 'dva';
import styles from './common.css';
import { Icon, Button, Tabs, Descriptions, Skeleton, Alert, Card, Row, Col } from 'antd';
import StatusTip from '../../components/status-tip/statusTip';

const { TabPane } = Tabs;

class Test extends React.Component {

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

class BasicPanel extends React.Component {
  render() {
    return (
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
      </div>
    );
  }
}

class DockerBasicTab extends React.Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.dispatch({
      type: 'dockerBasic/dockerInfo',
      payload: { id },
    });
    this.props.dispatch({
      type: 'dockerBasic/imageList',
      payload: { id },
    });
  };

  tabChange = key => {
    switch (key) {
    }
  };
  render() {
    let context = <Alert message="信息查询失败" type="error" />;
    const operations = <Button>返回</Button>;
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1363529_nopo1vjcec.js',
    });
    // if (this.props.dockerInfo && this.props.dockerInfo.Res) {
    //   context = (
    //     <div>
    //       <div className={styles.header}>
    //         <Tabs
    //           defaultActiveKey="basic"
    //           tabBarExtraContent={operations}
    //           onChange={this.tabChange}
    //         >
    //           <TabPane
    //             tab={
    //               <span>
    //                 <IconFont type="icon-Docker" />
    //                 基本信息
    //               </span>
    //             }
    //             key="basic"
    //           >
    //             <BasicPanel dockerInfo={this.props.dockerInfo} />
    //           </TabPane>
    //           <TabPane
    //             tab={
    //               <span>
    //                 <IconFont type="icon-acrrongqijingxiangfuwu" />
    //                 镜像
    //               </span>
    //             }
    //             key="image"
    //           >
    //             <ImagePanel id={this.props.match.params.id} />
    //           </TabPane>

    //           <TabPane
    //             tab={
    //               <span>
    //                 <IconFont type="icon-rongqifuwuContainerServi" />
    //                 容器
    //               </span>
    //             }
    //             key="container"
    //           />
    //         </Tabs>
    //       </div>
    //     </div>
    //   );
    // }
    let tt = <div>加载中</div>;
    if (this.props.dockerInfo && this.props.dockerInfo.Res) {
      tt = <BasicPanel dockerInfo={this.props.dockerInfo} />;
    }
    
    return (
      <Test  test={tt}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    dockerInfo: state.dockerBasic.dockerInfo,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(DockerBasicTab);
