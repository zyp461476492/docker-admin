import style from './index.css';
// import zhCN from 'antd/es/locale-provider/zh_CN';
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
