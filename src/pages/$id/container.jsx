import React from 'react';
import { connect } from 'dva';
// import styles from './common.css';
// import { Table, Button, Card} from 'antd';

class ContainerPanel extends React.Component {}

function mapStateToProps(state) {
  return {
    containerInfo: state.dockerBasic.containerInfo,
    loading: state.loading.models.dockerBasic,
  };
}

export default connect(mapStateToProps)(ContainerPanel);
