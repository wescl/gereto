import styles from './Submit.module.scss';

function Submit(props) {
  return (
    <div className={`${styles.button}`}>
      <button className={`${styles[props.customClass]}`}>{props.text}</button>
    </div>
  );
}

export default Submit;
