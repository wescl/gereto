import { FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.scss';
import { FaBlogger } from "react-icons/fa";

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul>
                <li>
                    <a href="https://www.linkedin.com/in/zwescley/" target="_blank" rel="noreferrer">
                        <FaLinkedin className={styles.linkedinIcon} />
                    </a>
                </li>
                <li>
                    <a href="https://wescley.netlify.app/" target="_blank" rel="noreferrer">
                        <FaBlogger className={styles.blog} />
                    </a>
                </li>
            </ul>
            <div className={styles.developedBy}>
                <strong>@zwescley</strong>
            </div>
        </footer>
    );
}

export default Footer;
