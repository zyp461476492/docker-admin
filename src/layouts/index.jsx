import style from './index.css';

function BasicLayout(props) {
  return (
    <div className={style.container}>
      {props.children}
    </div>
  );
}

export default BasicLayout;
