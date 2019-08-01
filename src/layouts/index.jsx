import style from './index.css';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';

function BasicLayout(props) {
  return (
    <LocaleProvider locale={zhCN}>
      <div className={style.container}>{props.children}</div>
    </LocaleProvider>
  );
}

export default BasicLayout;
