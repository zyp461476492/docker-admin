import React from 'react';
import { connect } from 'dva';
import styles from './panel.css';
import { Table, Button, Card } from 'antd';

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
  componentDidMount = () => {
    const id = this.props.assetId;
    this.props.dispatch({
      type: 'dockerBasic/containerList',
      payload: { id },
    });
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

  render() {
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
                <Button>L</Button>
                <Button>M</Button>
                <Button>R</Button>
              </ButtonGroup>
            </div>
          }
        >
          <Table
            rowKey="id"
            loading={this.props.loading}
            columns={containerColumn}
            dataSource={dataSource}
          />
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    containerInfo: state.dockerBasic.containerInfo,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ContainerPanel);
