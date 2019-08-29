import React from 'react';
import { connect } from 'dva';
import { Modal, Input, Table, Tag, Badge, message } from 'antd';
import styles from './dialog.css';

const officeTagRender = isOffice => {
  return isOffice ? <Tag color="green">官方镜像</Tag> : <Tag color="red">非官方</Tag>;
};

const StarBadgeRender = star => {
  const style =
    star > 1000
      ? { backgroundColor: '#52c41a' }
      : { backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' };
  return <Badge count={star} overflowCount={9999} showZero={true} style={style} />;
};

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '获赞',
    dataIndex: 'star_count',
    key: 'star_count',
    render: StarBadgeRender,
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '类型',
    dataIndex: 'is_official',
    key: 'is_official',
    render: officeTagRender,
    onFilter: (value, record) => record.is_official === value,
    filters: [
      {
        text: '官方镜像',
        value: true,
      },
      {
        text: '非官方',
        value: false,
      },
    ],
  },
];

const { Search } = Input;

class ImageSearchModel extends React.Component {
  state = {
    term: '',
  };

  imageSearch = term => {
    if (term) {
      const assetId = this.props.assetId;
      this.props.dispatch({
        type: 'dockerBasic/imageSearch',
        payload: { assetId, term },
      });
    } else {
      message.info('请输入内容', 1);
    }
  };

  render() {
    let dataList = [];
    if (this.props.imageSearchInfo && this.props.imageSearchInfo.Res) {
      dataList = this.props.imageSearchInfo.Obj;
    }

    return (
      <Modal
        title="镜像搜索"
        width={800}
        footer={null}
        size="small"
        visible={this.props.visible}
        onCancel={this.props.close}
      >
        <Search placeholder="请输入" enterButton="搜索" size="large" onSearch={this.imageSearch} />
        <Table
          rowKey="name"
          scroll={{ y: 300 }}
          loading={this.props.loading}
          className={styles.tableContent}
          dataSource={dataList}
          columns={columns}
        />
        ;
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    imageSearchInfo: state.dockerBasic.imageSearchInfo,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ImageSearchModel);
