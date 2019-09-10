import style from './index.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

function BasicLayout(props) {
  return (
    <ConfigProvider  locale={zhCN}>
      <div className={style.container}>{props.children}</div>
    </ConfigProvider >
  );
}

export default BasicLayout;
