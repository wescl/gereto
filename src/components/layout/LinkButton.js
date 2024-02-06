import { Link } from "react-router-dom";
import styles from './LinkButton.module.scss'

function LinkButton({ to, text }) {
    return (
        <Link to={to} className={styles.linkButton}>
            {text}
        </Link>
    )
}

export default LinkButton;