import React from 'react';
import { connect } from 'dva';
import styles from './common.css';
import { Table, Button, Card } from 'antd';

const imageColumn = [
  {
    title: 'REPOSITORY',
    dataIndex: 'repo',
    key: 'repo',
  },
  {
    title: 'TAG',
    dataIndex: 'tag',
    key: 'tag',
  },
  {
    title: 'IMAGE ID ',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'CREATED',
    dataIndex: 'created',
    key: 'created',
  },
  {
    title: 'SIZE',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: 'OPERATE',
    dataIndex: 'operate',
    key: 'operate',
    render: (text, record, index) => {
      return (
        <div>
          <Button icon="delete" type="danger">
            删除
          </Button>
          <Button icon="delete">历史</Button>
        </div>
      );
    },
  },
];

class ImagePanel extends React.Component {
  test = () => {
    const id = this.props.id;
    this.props.dispatch({
      type: 'dockerBasic/imageList',
      payload: { id },
    });
  };

  tagsFormatter = tags => {
    let formatTags = [];
    for (let tag of tags) {
      formatTags.push(tag.split(':')[1]);
    }
    return formatTags.join(',');
  };

  idFormatter = id => {
    return id.split(':')[1].slice(0, 12);
  };

  timeFormatter = timestamp => {
    return new Date(timestamp).toLocaleString();
  };

  sizeFormatter = size => {
    return Math.round(size / (1000 * 1000)) + 'MB';
  };

  parseList = list => {
    let data = [];
    for (let info of list) {
      let repo = info.RepoTags[0].split(':')[0];
      data.push({
        repo: repo,
        tag: this.tagsFormatter(info.RepoTags),
        id: this.idFormatter(info.Id),
        created: this.timeFormatter(info.Created),
        size: this.sizeFormatter(info.Size),
      });
    }
    return data;
  };

  render() {
    let dataSource = [];
    if (this.props.imageInfo && this.props.imageInfo.Res) {
      dataSource = this.parseList(this.props.imageInfo.Obj);
    }

    return (
      <div>
        <Card
          extra={
            <div className={styles.btn_block}>
              <Button icon="plus" onClick={this.test}>拉取</Button>
              <Button icon="edit">搜索</Button>
            </div>
          }
        >
          <Table
            rowKey="id"
            loading={this.props.loading}
            columns={imageColumn}
            dataSource={dataSource}
          />
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    imageInfo: state.dockerBasic.imageInfo,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ImagePanel);
