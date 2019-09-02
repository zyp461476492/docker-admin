import React from 'react';
import { connect } from 'dva';
import { Modal, Input, message, Typography } from 'antd';
import styles from './dialog.css';
import webSocketReq from '@/utils/websocket';

const { Text } = Typography;

const { Search } = Input;

class ImagePullModel extends React.Component {
  state = {
    term: '',
    infoList: [],
  };

  imageSearch = term => {
    if (term) {
      const assetId = this.props.assetId;
      this.imagePullProcess(assetId, term);
    } else {
      message.info('请输入内容', 1);
    }
  };

  imagePullProcess = (assetId, term) => {
    const url = `ws://127.0.0.1:8080/image/pull?assetId=${assetId}&imageId=${term}`;
    webSocketReq(url, this.onOpen, this.onClose, this.onMsg, this.onErr);
  };

  onOpen = evt => {
    const infoList = [];
    infoList.push('开始处理...');
    this.setState({
      infoList: infoList,
    });
  };

  onClose = evt => {
    const infoList = this.state.infoList;
    infoList.push('处理完成!');
    this.setState({
      infoList: infoList,
    });
  };

  onMsg = evt => {
    const infoList = this.state.infoList;
    console.log(evt);
    infoList.push(evt.data);
    this.setState({
      infoList: infoList,
    });
  };

  onErr = evt => {
    const infoList = this.state.infoList;
    infoList.push('处理失败!');
    this.setState({
      infoList: infoList,
    });
  };

  render() {
    const content = this.state.infoList.map(info => (
      <div>
        <Text>{info}</Text>
        <br />
      </div>
    ));
    return (
      <Modal
        title="镜像拉取"
        width={500}
        footer={null}
        size="small"
        visible={this.props.visible}
        onCancel={this.props.close}
      >
        <Search placeholder="请输入" enterButton="拉取" onSearch={this.imageSearch} />
        <div className={styles.terminalPanel}>{content}</div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ImagePullModel);
