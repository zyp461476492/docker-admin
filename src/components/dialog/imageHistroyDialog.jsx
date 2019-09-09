import React from 'react';
import { connect } from 'dva';
import { Modal, Table, Tooltip } from 'antd';
import styles from './dialog.css';

const rowKey = record => {
  return record.Created + Math.random();
};

const idRender = id => {
  let str = id;
  if (str.includes(':')) {
    str = id.split(':')[1].substring(0, 6);
  }
  return str;
};

const timeRender = timestamp => {
  const time = new Date(timestamp * 1000).toLocaleString();
  return time;
};

const sizeRender = size => {
  const mb = Math.round(size / (1000 * 1000)) + 'MB';
  return mb;
};

const createdByRender = command => {
  let str = command.substring(0, 10) + '...';
  return (
    <Tooltip title={<p>{command}</p>}>
      <p>{str}</p>
    </Tooltip>
  );
};

const commentRender = comment => {
  const str = comment === "" ? '无' : comment;
  return str;
};

const columns = [
  {
    title: 'ID',
    dataIndex: 'Id',
    key: 'Id',
    render: idRender,
  },
  {
    title: 'CREATED',
    dataIndex: 'Created',
    key: 'Created',
    render: timeRender,
  },
  {
    title: 'CREATEDBY',
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
    render: createdByRender,
  },
  {
    title: 'SIZE',
    dataIndex: 'Size',
    key: 'Size',
    render: sizeRender,
  },
  {
    title: 'COMMENT',
    dataIndex: 'Comment',
    key: 'Comment',
    render: commentRender
  },
];

class ImageHistoryModel extends React.Component {
  render() {
    let dataList = [];
    if (this.props.imageHistory && this.props.imageHistory.Res) {
      dataList = this.props.imageHistory.Obj;
    }

    return (
      <Modal
        title="镜像历史记录"
        width={800}
        footer={null}
        size="small"
        visible={this.props.visible}
        onCancel={this.props.close}
      >
        <Table
          rowKey={rowKey}
          scroll={{ y: 300 }}
          loading={this.props.loading}
          className={styles.tableContent}
          dataSource={dataList}
          columns={columns}
        />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    imageHistory: state.dockerBasic.imageHistory,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ImageHistoryModel);
