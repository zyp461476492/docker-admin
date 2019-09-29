import React from 'react';
import { connect } from 'dva';
import { message, Table, Button, Card } from 'antd';
import styles from './panel.css';
import ImageSearchModel from '../dialog/imageSearchDialog';
import ImagePullModel from '../dialog/imagePullDialog';
import ImageHistroyDialog from '../dialog/imageHistroyDialog';

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
];

class ImagePanel extends React.Component {
  state = {
    searchVisible: false,
    pullVisible: false,
    historyVisible: false,
    selectedRowKeys: [],
    selectedRow: [],
  };

  queryBasicInfo = () => {
    const id = this.props.assetId;
    this.props.dispatch({
      type: 'dockerBasic/dockerInfo',
      payload: { id },
    });
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

  componentDidMount = () => {
    this.queryImageList();
  };

  queryImageList = () => {
    const id = this.props.assetId;
    this.clearSelect();
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
    return Math.round(size / (1024 * 1024)) + 'MB';
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

  toggleHistoryDialog = () => {
    this.setState({
      historyVisible: !this.state.historyVisible,
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

  imageDel = () => {
    const length = this.state.selectedRowKeys.length;
    if (length <= 0) {
      message.warning('请选择一条数据', 1);
    } else if (length === 1) {
      const assetId = this.props.assetId;
      const imageId = this.state.selectedRowKeys[0];
      console.log(`assetId:${assetId} imageId ${imageId}`);
      message.loading('删除中...');
      this.props.dispatch({
        type: 'dockerBasic/imageDel',
        payload: {
          assetId,
          imageId,
        },
        callback: res => {
          message.destroy();
          if (res) {
            message.success(`删除成功`, 1);
          } else {
            message.error(`删除失败`, 1);
          }
          this.queryBasicInfo();
          this.clearSelect();
        },
      });
    } else {
      message.warning('暂不支持批量操作', 1);
    }
  };

  imageHistory = () => {
    const length = this.state.selectedRowKeys.length;
    if (length === 1) {
      const assetId = this.props.assetId;
      const imageId = this.state.selectedRowKeys[0];
      this.props.dispatch({
        type: 'dockerBasic/imageHistory',
        payload: {
          assetId,
          imageId,
        }
      });
      this.toggleHistoryDialog();
    } else {
      message.warning('请选择一条数据', 1);
    }
  };

  clearSelect = () => {
    this.setState({
      selectedRow: [],
      selectedRowKeys: []
    });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };

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
        <ImageHistroyDialog visible={this.state.historyVisible} close={this.toggleHistoryDialog} />
        <ImagePullModel
          assetId={this.props.assetId}
          visible={this.state.pullVisible}
          close={this.togglePullDialog}
        />
        <Card
          extra={
            <div className={styles.btn_block}>
              <Button icon="plus" onClick={this.togglePullDialog}>
                拉取
              </Button>
              <Button icon="edit" onClick={this.toggleSearchDialog}>
                搜索
              </Button>
              <Button icon="delete" type="danger" onClick={this.imageDel}>
                删除
              </Button>
              <Button icon="history" onClick={this.imageHistory}>
                历史
              </Button>
            </div>
          }
        >
          <Table
            rowKey="id"
            loading={this.props.loading}
            columns={imageColumn}
            dataSource={dataSource}
            rowSelection={rowSelection}
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
    imageInfo: state.dockerBasic.imageInfo,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ImagePanel);
