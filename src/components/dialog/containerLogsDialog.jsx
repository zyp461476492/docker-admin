import React from 'react';
import { connect } from 'dva';
import { Modal, Typography } from 'antd';
import webSocketReq from '@/utils/websocket';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

let websocketClient = null;

const ROOT_CSS = css({
  height: 300,
});

const { Text } = Typography;

class LogPanel extends React.Component {
  componentWillMount() {
    this.containerLogsBegin();
  }

  componentWillUnmount() {
    if (websocketClient) {
      websocketClient.close();
      websocketClient = null;
    }
    this.setState({
      infoList: [],
    });
  }

  state = {
    infoList: [],
  };

  init = () => {
    this.setState({
      infoList: [],
    });
  };

  containerLogsBegin = () => {
    this.init();
    const assetId = this.props.assetId;
    const containerId = this.props.containerId;
    const url = `ws://127.0.0.1:8080/container/logs?assetId=${assetId}&containerId=${containerId}`;
    websocketClient = webSocketReq(url, this.onOpen, this.onClose, this.onMsg, this.onErr);
  };

  onOpen = evt => {
    const infoList = [];
    infoList.push('开始连接...');
    this.setState({
      infoList: infoList,
    });
  };

  onClose = evt => {
    const infoList = this.state.infoList;
    infoList.push('处理完毕!');
    this.setState({
      infoList: infoList,
    });
    websocketClient = null;
  };

  onMsg = evt => {
    let infoList = this.state.infoList;
    infoList.push(evt.data);
    this.setState({
      infoList: infoList,
    });
  };

  onErr = evt => {
    const infoList = this.state.infoList;
    infoList.push('数据连接中断!');
    this.setState({
      infoList: infoList,
      prcessLoading: false,
    });
  };

  modelClose = () => {
    this.init();
    if (websocketClient) {
      websocketClient.close();
    }
  };

  render() {
    const content = this.state.infoList.map((info, index) => (
      <div key={index}>
        <Text>{info}</Text>
        <br />
      </div>
    ));
    return <ScrollToBottom className={ROOT_CSS}>{content}</ScrollToBottom>;
  }
}

class ContainerLogsModel extends React.Component {
  render() {
    return (
      <Modal
        title="容器日志"
        footer={null}
        visible={this.props.visible}
        onCancel={this.props.close}
        afterClose={this.modelClose}
        destroyOnClose={true}
      >
        <LogPanel assetId={this.props.assetId} containerId={this.props.containerId} />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ContainerLogsModel);
