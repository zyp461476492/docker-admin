import React from 'react';
import { Icon, Input, InputNumber, Select } from 'antd';
import styles from './input.css';

const InputGroup = Input.Group;
const { Option } = Select;

class ContainerNetworkInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      type: 'tcp',
      dockerPort: value.dockerPort || 80,
      hostPort: value.hostPort,
    };
  }

  handleDockerPortChange = value => {
    const dockerPort = value;
    if (!('value' in this.props)) {
      this.setState({ dockerPort });
    }
    this.triggerChange({ dockerPort });
  };

  handleHostPortChange = value => {
    const hostPort = value;
    if (!('value' in this.props)) {
      this.setState({ hostPort });
    }
    this.triggerChange({ hostPort });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue,
      });
    }
  };

  render() {
    const { type, dockerPort, hostPort } = this.state;
    const removeShow = this.props.removeShow;
    let removeIcon = <div></div>;
    console.log(styles.dynamicDeleteButton);
    if (removeShow) {
      removeIcon = (
        <Icon
        className={styles.icon}
          type="minus-circle-o"
          onClick={() => this.props.remove(this.props.k)}
        />
      );
    }
    return (
      <InputGroup compact>
        <Select value={type} disabled={true}>
          <Option value="tcp">TCP</Option>
        </Select>
        <InputNumber
          value={dockerPort}
          max={65535}
          min={1}
          onChange={this.handleDockerPortChange}
        />
        <InputNumber value={hostPort} max={65535} min={1} onChange={this.handleHostPortChange} />
        <div className={styles.dynamicDeleteButton}>{removeIcon}</div>
      </InputGroup>
    );
  }
}

export default ContainerNetworkInput;
