import styles from './Loading.module.scss';
import { ImSpinner8 } from "react-icons/im";

function Loading({ largura }) {
    return (
        <div className={styles.loading}>
            <ImSpinner8 className={styles[largura]} />
        </div>
    );
}

export default Loading;
