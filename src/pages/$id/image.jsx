import React from 'react';
import { connect } from 'dva';
import styles from './common.css';
import { Result, Skeleton, Table, Button, Card } from 'antd';
import Basic from '../../components/basicTabPanel/tabPanel';

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
              <Button icon="plus" onClick={this.test}>
                拉取
              </Button>
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

class DockerImagePage extends React.Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.dispatch({
      type: 'dockerBasic/imageList',
      payload: { id },
    });
  };

  render() {
    let context = <Skeleton active />;
    if (this.props.imageInfo && this.props.imageInfo.Res) {
      context = (
        <ImagePanel
          assetId={this.props.match.params.id}
          imageInfo={this.props.imageInfo}
          loading={this.props.loading}
          dispatch={this.props.dispatch}
        />
      );
    } else if (this.props.imageInfo && !this.props.imageInfo.Res) {
      context = (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />
      );
    }

    return <Basic title="Docker" subTitle="镜像" content={context} loading={this.props.loading} />;
  }
}

function mapStateToProps(state) {
  return {
    imageInfo: state.dockerBasic.imageInfo,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(DockerImagePage);
