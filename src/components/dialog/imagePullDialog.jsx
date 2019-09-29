import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Modal, Input, message, Typography } from 'antd';
import webSocketReq from '@/utils/websocket';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
import config from '@/config.json';

let websocketClient = null;

const ButtonGroup = Button.Group;

const ROOT_CSS = css({
  height: 300,
});

const { Text } = Typography;

const infoListBuilder = (target, infoList) => {
  let list = [];
  for (let info of infoList) {
    if (!info.startsWith(target)) {
      list.push(info);
    }
  }
  return list;
};

/**
 * 解析 websocket 的 msg
 * @param {String} info
 * @param {Array} infoList
 */
const evtMsgParser = (info, infoList) => {
  if (info.id) {
    let tempInfo = `${info.id}:${info.status}`;
    if (info.status.startsWith('Downloading') || info.status.startsWith('Extracting')) {
      tempInfo = `${info.id}:${info.status} ${info.progress}`;
      const searchHead = `${info.id}:${info.status}`;
      infoList = infoListBuilder(searchHead, infoList);
    }
    infoList.push(tempInfo);
  } else {
    if (info.errorDetail) {
      infoList.push(info.errorDetail.message);
    } else if (!info.Res) {
      infoList.push(info.status);
    }
  }

  return infoList;
};

class ImagePullModel extends React.Component {
  componentWillUnmount() {
    if (websocketClient) {
      websocketClient.close();
    }
  }
  state = {
    term: '',
    infoList: [],
    prcessLoading: false,
    closeLoading: false,
  };

  imagePullStop = () => {
    if (websocketClient) {
      websocketClient.close();
      websocketClient = null;
      let infoList = this.state.infoList;
      infoList.push('已发送连接中断信号');
      infoList.push('连接中断');
      this.setState({
        prcessLoading: false,
        infoList: infoList,
      });
    } else {
      message.info('没有正在处理的任务', 1);
    }
  };

  imagePullBegin = () => {
    if (this.state.term) {
      if (this.state.closeLoading) {
        message.info('存在处理中的任务，请稍后', 1);
      } else {
        const assetId = this.props.assetId;
        this.imagePullProcess(assetId, this.state.term);
      }
    } else {
      message.info('请输入内容', 1);
    }
  };

  imagePullProcess = (assetId, term) => {
    const url = `${config.webSocketUrl}/image/pull?assetId=${assetId}&term=${term}`;
    websocketClient = webSocketReq(url, this.onOpen, this.onClose, this.onMsg, this.onErr);
  };

  onOpen = evt => {
    const infoList = [];
    infoList.push('开始处理...');
    this.setState({
      infoList: infoList,
      prcessLoading: true,
    });
  };

  onClose = evt => {
    websocketClient = null;
  };

  onMsg = evt => {
    let infoList = this.state.infoList;
    if (websocketClient) {
      infoList = evtMsgParser(JSON.parse(evt.data), infoList);
      this.setState({
        infoList: infoList,
      });
    }
  };

  onErr = evt => {
    const infoList = this.state.infoList;
    if (websocketClient) {
      infoList.push('处理失败!');
      this.setState({
        infoList: infoList,
        prcessLoading: false,
      });
    }
  };

  inputChange = e => {
    this.setState({
      term: e.target.value,
    });
  };

  render() {
    const content = this.state.infoList.map((info, index) => (
      <div key={index}>
        <Text>{info}</Text>
        <br />
      </div>
    ));
    return (
      <Modal
        title="镜像拉取"
        width={800}
        footer={null}
        size="small"
        visible={this.props.visible}
        onCancel={this.props.close}
      >
        <Row style={{ marginBottom: 10 }}>
          <Col span={16}>
            <Input
              placeholder="请输入镜像名称"
              value={this.state.term}
              onInput={this.inputChange.bind(this)}
            />
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <ButtonGroup style={{ marginLeft: 10 }}>
              <Button
                type="primary"
                onClick={this.imagePullBegin}
                loading={this.state.prcessLoading}
              >
                开始
              </Button>
              <Button type="danger" loading={this.state.closeLoading} onClick={this.imagePullStop}>
                停止
              </Button>
            </ButtonGroup>
          </Col>
        </Row>

        <ScrollToBottom className={ROOT_CSS}>{content}</ScrollToBottom>
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
