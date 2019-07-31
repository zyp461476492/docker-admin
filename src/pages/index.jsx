import React from 'react';
import { connect } from 'dva';
import {
  Tooltip,
  Card,
  Row,
  Col,
  Table,
  Tag,
  Button,
  Form,
  Modal,
  Input,
  message,
  InputNumber,
} from 'antd';
import style from './index.css';
import { showTip } from '../utils/common';

const columns = [
  {
    title: '资源名称',
    dataIndex: 'assetName',
    key: 'assetName',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '端口',
    dataIndex: 'port',
    key: 'port',
  },
  {
    title: 'API版本',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: status => {
      const syncTag = <Tag color="green">在线</Tag>;
      const failTag = <Tag color="red">离线</Tag>;
      return status === '1' ? syncTag : failTag;
    },
  },
];

const mockData = [];

for (let i = 0; i < 15; i++) {
  let obj = {
    key: i + 1,
    assetName: 'docker-test' + i,
    ip: '192.168.1.1' + i,
    port: '220' + i,
    apiVersion: '1.048',
    status: i % 2 === 0 ? '1' : '0',
  };
  mockData.push(obj);
}

function StatusTip(props) {
  return (
    <div className={style.tip}>
      <Tooltip title={props.desc}>
        <span>{props.title}</span>
      </Tooltip>
      <p>{props.value}</p>
    </div>
  );
}

const DockerAssetForm = Form.create({ name: 'xxx' })(
  class extends React.Component {
    render() {
      const { visible, title, onCancel, onCreate, form, loading } = this.props;
      const { getFieldDecorator } = form;
      const labelCol = { span: 4 };

      return (
        <Modal 
        visible={visible} 
        title={title} okText="提交" 
        onCancel={onCancel} 
        onOk={onCreate}
        confirmLoading={loading}>
          <Form labelAlign="right" labelCol={labelCol}>
            <Form.Item label="名称">
              {getFieldDecorator('assetName', {
                rules: [{ required: true, message: '请输入资源名称' }],
              })(<Input className={style.form_input} />)}
            </Form.Item>
            <Form.Item label="IP">
              {getFieldDecorator('ip', {
                rules: [{ required: true, message: '请输入IP' }],
              })(<Input className={style.form_input} />)}
            </Form.Item>
            <Form.Item label="端口">
              {getFieldDecorator('port', {
                rules: [{ required: true, message: '请输入端口' }],
              })(<InputNumber className={style.form_input} min={0} max={65535} />)}
            </Form.Item>
            <Form.Item label="API">
              {getFieldDecorator('version', {
                rules: [{ required: true, message: '请输入API版本' }],
              })(<Input className={style.form_input} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class DockerAssetList extends React.Component {
  state = {
    visible: false,
    selectedRowKeys: [],
    selectedRow: [],
  };

  componentWillReceiveProps = () => {
    showTip(message, this.props.messageInfo);
  };

  handlerAddForm = () => {};

  handlerModifyForm = data => {
    console.log(this.state.selectedRowKeys);
  };

  handlerDelete = () => {
    if (this.state.selectedRowKeys.length <= 0) {
      message.warning('请选择待删除的数据', 1);
    } else {
      this.props.dispatch({
        type: 'asset/remove',
        payload: {
          keys: this.state.selectedRowKeys,
        },
      });
    }
  };

  showModal = () => {
    this.props.dispatch({
      type: 'asset/showDialog',
    });
  };

  handleCancel = () => {
    this.props.dispatch({
      type: 'asset/closeDialog',
    });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'asset/add',
        payload: {
          asset: values,
        },
      });
      form.resetFields();
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

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleTableChange = pagination => {
    this.props.dispatch({
      type: 'asset/fetch',
      payload: {
        page: pagination.current,
        limit: pagination.pageSize,
      },
    });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    const onlineTip = StatusTip({
      title: '在线数量',
      desc: '同步时可以访问到的资源数量',
      value: 100,
    });
    const offlineTip = StatusTip({
      title: '离线数量',
      desc: '同步时无法访问资源的数量',
      value: 100,
    });
    const syncDateTip = StatusTip({
      title: '同步时间',
      desc: '最新同步时间',
      value: new Date().toLocaleString(),
    });
    return (
      <div>
        <div className={style.container_header}>
          <Row type="flex">
            <Col span={8}>
              <Card bordered={false}>{onlineTip}</Card>
              <em />
            </Col>
            <Col span={8}>
              <Card bordered={false}>{offlineTip}</Card>
              <em />
            </Col>
            <Col span={8}>
              <Card bordered={false}>{syncDateTip}</Card>
            </Col>
          </Row>
        </div>
        <div className={style.container_body}>
          <Card bordered={false}>
            <Row>
              <Col span={24}>
                <Card
                  size="small"
                  bordered={false}
                  extra={
                    <div className={style.btn_block}>
                      <Button icon="plus" onClick={this.showModal}>
                        新增
                      </Button>
                      <DockerAssetForm
                        wrappedComponentRef={this.saveFormRef}
                        title="新增docker资源"
                        visible={this.props.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        loading={this.props.loading}
                      />
                      <Button icon="edit">修改</Button>
                      <Button icon="delete" type="danger" onClick={this.handlerDelete}>
                        删除
                      </Button>
                      <Button icon="info-circle">详情</Button>
                    </div>
                  }
                >
                  <Table
                    loading={this.props.loading}
                    rowKey="id"
                    rowSelection={rowSelection}
                    pagination={this.props.pagination}
                    columns={columns}
                    dataSource={this.props.dataSource}
                    onChange={this.handleTableChange}
                    onRow={record => ({
                      onClick: () => {
                        this.selectRow(record);
                      },
                    })}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    visible: state.asset.visible,
    dataSource: state.asset.list,
    pagination: state.asset.pagination,
    loading: state.loading.models.asset,
    messageInfo: state.asset.messageInfo,
  };
}

export default connect(mapStateToProps)(DockerAssetList);
