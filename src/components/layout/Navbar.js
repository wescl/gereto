import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss';
import classNames from 'classnames';

function Navbar() {
    const location = useLocation();
    const navbarItems = [
        { path: '/', label: 'home' },
        { path: '/newproject', label: 'Novo' },
        { path: '/projects', label: 'Projetos' },
    ];

    return (
        <nav className={styles.navbar}>
            <ul>
                {navbarItems.map((item, index) => (
                    <li
                        key={item.path}
                        className={classNames({
                            [styles.active]: location.pathname === item.path,
                            [styles.home]: index === 0,
                        })}
                    >
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
