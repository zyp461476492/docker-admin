import style from './status.css';
import { Tooltip } from 'antd';

const StatusTip = (props) => {
  let fontStyle = style.normal;
  switch (props.type) {
    case 'success':
      fontStyle = style.success;
      break;
    case 'warn':
      fontStyle = style.warn;
      break;
    case 'error':
      fontStyle = style.error;
      break;
    default:
  }
  return (
    <div className={style.tip}>
      <Tooltip title={props.desc}>
        <span>{props.title}</span>
      </Tooltip>
      <p className={fontStyle}>{props.value}</p>
    </div>
  );
}

export default StatusTip;
