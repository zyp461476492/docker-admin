import React  from 'react';
import { connect } from 'dva';
import { Table, Button, Card } from 'antd';
import styles from './panel.css';
import ImageSearchModel from '../dialog/imageSearchDialog';
import ImagePullModel from '../dialog/imagePullDialog';

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
  state = {
    searchVisible: false,
    pullVisible: false
  };

  componentDidMount = () => {
    this.queryImageList();
  };

  queryImageList = () => {
    const id = this.props.assetId;
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
    return new Date(timestamp * 1000).toLocaleString();
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

  toggleSearchDialog = () => {
    this.setState({
      searchVisible: !this.state.searchVisible,
    });
  };

  togglePullDialog = () => {
    this.setState({
      pullVisible: !this.state.pullVisible,
    });

    if (this.state.pullVisible) {
      this.queryImageList();
    }
  };
  render() {
    let dataSource = [];
    if (this.props.imageInfo && this.props.imageInfo.Res) {
      dataSource = this.parseList(this.props.imageInfo.Obj);
    }

    return (
      <div>
        <ImageSearchModel
          assetId={this.props.assetId}
          visible={this.state.searchVisible}
          close={this.toggleSearchDialog}
        />
        <ImagePullModel
          assetId={this.props.assetId}
          visible={this.state.pullVisible}
          close={this.togglePullDialog}
        />
        <Card
          extra={
            <div className={styles.btn_block}>
              <Button icon="plus" onClick={this.togglePullDialog}>拉取</Button>
              <Button icon="edit" onClick={this.toggleSearchDialog}>
                搜索
              </Button>
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
