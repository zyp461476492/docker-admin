import React from 'react';
import { connect } from 'dva';
import styles from './panel.css';
import { message, Table, Button, Card } from 'antd';

const ButtonGroup = Button.Group;

const containerColumn = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'IMAGE',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'COMMAND',
    dataIndex: 'command',
    key: 'command',
  },
  {
    title: 'PORT',
    dataIndex: 'port',
    key: 'port',
  },
  {
    title: 'STATE',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'CREATED',
    dataIndex: 'created',
    key: 'created',
  },
];

class ContainerPanel extends React.Component {
  state = {
    selectedRowKeys: [],
    selectedRow: [],
  };

  componentDidMount = () => {
    this.queryContainerList();
  };

  selectRow = record => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    this.setState({ selectedRowKeys });
  };

  onSelectedRowKeysChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  portFormatter = portList => {
    let formatPort = [];
    for (let port of portList) {
      let info = '';
      if (port['IP']) {
        info += port['IP'] + ':';
      }
      if (port['PrivatePort']) {
        info += port['PrivatePort'];
      }
      if (port['PublicPort']) {
        info += '->' + port['PublicPort'];
      }
      info += '/' + port['Type'];
      formatPort.push(info);
    }
    return formatPort.join(',');
  };

  idFormatter = id => {
    return id.slice(0, 12);
  };

  timeFormatter = timestamp => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  parseList = list => {
    let data = [];
    for (let info of list) {
      data.push({
        id: this.idFormatter(info.Id),
        name: info.Names.join(','),
        image: info.Image,
        command: info.Command,
        port: this.portFormatter(info.Ports),
        state: info.State,
        status: info.Status,
        created: this.timeFormatter(info.Created),
      });
    }
    return data;
  };

  queryContainerList = () => {
    const id = this.props.assetId;
    this.props.dispatch({
      type: 'dockerBasic/containerList',
      payload: { id },
    });
  };

  dispatchContainerCommand = (assetId, containerId, type) => {
    let dispatchType = 'dockerBasic/containerStart';
    let tip = '启动';
    if (type === 'pause') {
      dispatchType = 'dockerBasic/containerPause';
      tip = '暂停';
    } else if (type === 'stop') {
      dispatchType = 'dockerBasic/containerStop';
      tip = '停止';
    }

    this.props.dispatch({
      type: dispatchType,
      payload: {
        assetId,
        containerId,
      },
      callback: res => {
        message.destroy();
        if (res) {
          message.success(`${tip}成功`, 1);
        } else {
          message.error(`${tip}失败`, 1);
        }
        this.queryContainerList();
      },
    });
  };

  execCommand = type => {
    console.log('click');
    const length = this.state.selectedRowKeys.length;
    if (length <= 0) {
      message.warning('请选择一条数据', 1);
    } else if (length === 1) {
      message.loading(`${type}...`, 0);
      const assetId = this.props.assetId;
      const containerId = this.state.selectedRowKeys[0];
      this.dispatchContainerCommand(assetId, containerId, type);
    } else {
      message.warning('暂不支持批量操作', 1);
    }
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };

    let dataSource = [];
    if (this.props.containerInfo && this.props.containerInfo.Res) {
      dataSource = this.parseList(this.props.containerInfo.Obj);
    }

    return (
      <div>
        <Card
          extra={
            <div className={styles.btn_block}>
              <ButtonGroup>
                <Button onClick={this.execCommand.bind(this, 'start')} icon="caret-right"></Button>
                <Button onClick={this.execCommand.bind(this, 'pause')} icon="pause"></Button>
                <Button onClick={this.execCommand.bind(this, 'stop')} icon="stop"></Button>
              </ButtonGroup>
            </div>
          }
        >
          <Table
            rowKey="id"
            loading={this.props.loading}
            columns={containerColumn}
            dataSource={dataSource}
            rowSelection={rowSelection}
            onChange={this.handleTableChange}
            onRow={record => ({
              onClick: () => {
                this.selectRow(record);
              },
            })}
          />
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    containerInfo: state.dockerBasic.containerInfo,
    res: state.dockerBasic.containerInfo,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ContainerPanel);
