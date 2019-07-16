import style from './index.css';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';

function BasicLayout(props) {
  return (
    <LocaleProvider locale={zhCN} className={style.container}>
      {props.children}
    </LocaleProvider>
  );
}

export default BasicLayout;
