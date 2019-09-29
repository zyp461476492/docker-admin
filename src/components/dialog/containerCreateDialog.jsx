import React from 'react';
import { connect } from 'dva';
import { Button, Icon, Alert, Modal, Form, Input, message } from 'antd';
import ContainerNetworkInput from '../containerNetworkInput/containerNetworkInput';

let id = 0;

class ContainerFormPanel extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one network config
    if (keys.length < 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item label={index === 0 ? '端口映射' : ''} required={false} key={k}>
        {getFieldDecorator(`portMap${k}`, {
          initialValue: { type: 'tcp', dockerPort: 0, hostPort: 0 },
          rules: [{ required: true, message: '请输入端口映射' }],
        })(<ContainerNetworkInput remove={this.remove} k={k} removeShow={keys.length >= 1} />)}
      </Form.Item>
    ));
    return (
      <Form layout="vertical">
        <Form.Item label="容器名称">
          {getFieldDecorator('containerName', {
            rules: [{ required: true, message: '请输入容器名称' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="镜像名称">
          {getFieldDecorator('imageName', {
            rules: [{ required: true, message: '请输入镜像名称' }],
          })(<Input />)}
        </Form.Item>
        {formItems}
        <Form.Item>
          <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
            <Icon type="plus" /> 新增端口映射关系
          </Button>
        </Form.Item>
        <Form.Item label="端口填写说明">
          <Alert message="[ docker容器端口 ]: [ 对外暴露端口 ]" type="info" />
        </Form.Item>
      </Form>
    );
  }
}

const WrappedContainerForm = Form.create({ name: 'containerForm' })(ContainerFormPanel);

class ContainerCreateModel extends React.Component {
  formRef = null;

  submit = e => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'dockerBasic/containerCreate',
        payload: {
          assetId: this.props.assetId,
          containerName: values.containerName,
          imageName: values.imageName,
        },
        callback: response => {
          if (response.Res) {
            message.success(`容器[${response.Obj.Id}]成功`);
            this.props.close();
          } else {
            message.error(`新增容器失败，原因:${response.Info}`);
          }
        },
      });
    });
  };

  render() {
    return (
      <Modal
        title="新增容器"
        visible={this.props.visible}
        onOk={this.submit}
        onCancel={this.props.close}
        confirmLoading={this.props.loading}
        destroyOnClose={true}
        afterClose={this.props.refreshInfo}
      >
        <WrappedContainerForm wrappedComponentRef={form => (this.formRef = form)} />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ContainerCreateModel);
