import styles from './detail.css';
import { Card, Row, Col } from 'antd';
import StatusTip from '../../components/status-tip/statusTip';

export default function() {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.statistics}>
          <Row type="flex" gutter={32}>
            <Col span={12}>
              <div>
                <Card bordered={false}>
                   <StatusTip 
                   type='normal'
                   title='镜像'
                   desc='镜像数量'
                   value='205'
                   />
                </Card>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <Card bordered={false}>
                <StatusTip 
                   type='normal'
                   title='容器'
                   desc='容器数量'
                   value='155'
                   />
                </Card>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <Row type="flex" gutter={16}>
            <Col span={8}>
              <div>
                <Card bordered={false}>
                <StatusTip 
                   type='success'
                   title='运行中'
                   desc='镜像数量'
                   value='3'
                   />
                </Card>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Card bordered={false}>
                <StatusTip 
                   type='warn'
                   title='已暂停'
                   desc='镜像数量'
                   value='4'
                   />
                </Card>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Card bordered={false}>
                <StatusTip 
                   type='error'
                   title='已停止'
                   desc='镜像数量'
                   value='9'
                   />
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
