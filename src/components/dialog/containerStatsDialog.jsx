import React from 'react';
import { connect } from 'dva';
import { Result, Descriptions, Skeleton, Tabs, Icon, Modal } from 'antd';
import webSocketReq from '@/utils/websocket';
import ReactJson from 'react-json-view';

let websocketClient = null;

const { TabPane } = Tabs;

const sizeConvert = size => {
  if (size < 1024) {
    return `${size}B`;
  } else if (size >= 1024 && size < 1024 * 1024) {
    size = (size / 1024).toFixed(2);
    return `${size}KB`;
  } else {
    size = (size / (1024 * 1024)).toFixed(2);
    return `${size}MB`;
  }
};

const dataParser = info => {
  
  const cpu = (info.cpu_stats.cpu_usage.total_usage / info.cpu_stats.system_cpu_usage * 100).toFixed(2);
  const memory = (info.memory_stats.usage / info.memory_stats.limit * 100 ).toFixed(2) ;
  const memoryUsage = (info.memory_stats.usage / (1024 * 1024)).toFixed(2) + 'MB';
  const memoryLimit = (info.memory_stats.limit / (1024 * 1024)).toFixed(2) + 'MB';
  // const netIO = sizeConvert(info.networks.eth0);
  // const blockIO = '';
  return {
    id: info.id.slice(0, 6),
    name: info.name,
    pid: info.pids_stats.current,
    cpu: `${cpu}%`,
    memory: `${memory}%`,
    memoryUI: `${memoryUsage}/${memoryLimit}`,
  };
};

class StatsPanel extends React.Component {
  componentWillMount() {
    this.containerLogsBegin();
  }

  componentWillUnmount() {
    if (websocketClient) {
      websocketClient.close();
      websocketClient = null;
    }
    this.setState({
      info: null,
    });
  }

  state = {
    infoList: [],
  };

  containerLogsBegin = () => {
    const assetId = this.props.assetId;
    const containerId = this.props.containerId;
    const url = `ws://127.0.0.1:8080/container/stats?assetId=${assetId}&containerId=${containerId}`;
    websocketClient = webSocketReq(url, this.onOpen, this.onClose, this.onMsg, this.onErr);
  };

  onOpen = evt => {};

  onClose = evt => {
    websocketClient = null;
  };

  onMsg = evt => {
    this.setState({
      info: evt.data,
    });
  };

  onErr = evt => {};

  render() {
    if (this.state.info) {
      const data = dataParser(JSON.parse(this.state.info));
      if (data.pid === undefined) {
        return <Result status="error" title="查询失败" subTitle="容器进程未启动" />;
      } else {
        const tabs = (
          <Tabs defaultActiveKey="default">
            <TabPane
              tab={
                <span>
                  <Icon type="apple" />
                  表格
                </span>
              }
              key="default"
            >
              <Descriptions bordered={true} column={2}>
                <Descriptions.Item label="id">{data.id.toString()}</Descriptions.Item>
                <Descriptions.Item label="name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="pid">{data.pid.toString()}</Descriptions.Item>
                <Descriptions.Item label="cpu">{data.cpu.toString()}</Descriptions.Item>
                <Descriptions.Item label="memory">{data.memory.toString()}</Descriptions.Item>
                <Descriptions.Item label="memoryUI">{data.memoryUI.toString()}</Descriptions.Item>
              </Descriptions>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="apple" />
                  JSON
                </span>
              }
              key="json"
            >
              <ReactJson collapsed={true} src={JSON.parse(this.state.info)} />
            </TabPane>
          </Tabs>
        );
        return tabs;
      }
    } else {
      return <Skeleton active> 加载中...</Skeleton>;
    }
  }
}

class ContainerStatsModel extends React.Component {
  render() {
    return (
      <Modal
        title="实时状态"
        footer={null}
        visible={this.props.visible}
        onCancel={this.props.close}
        afterClose={this.modelClose}
        destroyOnClose={true}
      >
        <StatsPanel assetId={this.props.assetId} containerId={this.props.containerId} />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ContainerStatsModel);
