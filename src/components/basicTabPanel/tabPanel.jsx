import React from 'react';
import styles from './panel.css';
import { PageHeader, Row, Col } from 'antd';

export default class Basic extends React.Component {
  render() {
    return (
      <Row className={styles.container}>
        <Col span={24}>
          <PageHeader onBack={() => null} title={this.props.title} subTitle={this.props.subTitle} />
        </Col>
        <Col className={styles.block} span={24}>
          {this.props.content}
        </Col>
      </Row>
    );
  }
}
