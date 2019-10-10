import React from 'react';
import { connect } from 'dva';
import {
  Tooltip,
  Card,
  Row,
  Col,
  Table,
  Button,
  Form,
  Modal,
  Input,
  message,
  InputNumber,
} from 'antd';
import router from 'umi/router';
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
];

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
          title={title}
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={loading}
        >
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

  handleTableChange = pagination => {
    this.props.dispatch({
      type: 'asset/fetch',
      payload: {
        page: pagination.current,
        limit: pagination.pageSize,
      },
    });
  };

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
          keys: this.state.selectedRowKeys.join(','),
        },
      });
    }
  };

  handlerDetail = () => {
    if (this.state.selectedRowKeys.length <= 0) {
      message.warning('请选择一条数据', 1);
    } else {
      // 进入 detail 页
      router.push(`/detail/${this.state.selectedRowKeys[0]}`);
    }
  };

  showModal = () => {
    this.props.dispatch({
      type: 'asset/showDialog',
    });
    const { form } = this.formRef.props;
    form.resetFields();
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

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    const mainTip = StatusTip({
      title: '配置',
      desc: '管理基础资源',
      value: '基础资源配置',
    });
    return (
      <div>
        <div className={style.container_header}>
          <Row type="flex">
            <Col span={24}>
              <Card bordered={false}>{mainTip}</Card>
              <em />
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
                      <Button icon="delete" type="danger" onClick={this.handlerDelete}>
                        删除
                      </Button>
                      <Button icon="info-circle" onClick={this.handlerDetail}>
                        详情
                      </Button>
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
  return {
    visible: state.asset.visible,
    dataSource: state.asset.list,
    pagination: state.asset.pagination,
    loading: state.loading.models.asset,
    messageInfo: state.asset.messageInfo,
  };
}

export default connect(mapStateToProps)(DockerAssetList);
