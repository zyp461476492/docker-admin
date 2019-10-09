import React from 'react';
import style from './index.css';
import { connect } from 'dva';
import { List, Button } from 'antd';
import router from 'umi/router';

const pageSize = 5;

class HomePage extends React.Component {
  componentWillMount() {
    this.pageChange(1, pageSize);
  }

  pageChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'asset/fetch',
      payload: {
        page: page,
        limit: pageSize,
      },
    });
  };

  goConfigPage = () => {
    router.push(`/config`);
  };

  goDetailPage = id => {
    router.push(`/detail/${id}`);
  };

  render() {
    const pagination = {
      pageSize: pageSize,
      total: this.props.pagination.total,
      onChange: this.pageChange,
    };

    return (
      <div>
        <div className={style.home_header}>
          <Button style={{ margin: '5px' }} onClick={this.goConfigPage}>
            配置
          </Button>
        </div>
        <div className={style.home_body}>
          <List
            style={{ padding: 10 }}
            itemLayout="horizontal"
            loading={this.props.loading}
            dataSource={this.props.dataSource}
            pagination={pagination}
            renderItem={item => (
              <List.Item
                actions={[<Button onClick={this.goDetailPage.bind(this, item.id)}>详情</Button>]}
              >
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.assetName}</a>}
                  description={`ip: ${item.ip} port: ${item.port} version: ${item.version}`}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    visible: state.asset.visible,
    dataSource: state.asset.list,
    pagination: state.asset.pagination,
    loading: state.loading.models.asset,
  };
}

export default connect(mapStateToProps)(HomePage);
