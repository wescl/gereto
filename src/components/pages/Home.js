import styles from './Home.module.scss'
import LinkButton from '../layout/LinkButton'
import logo from '../../assets/logo.png';

function Home() {
    return (
        <section className={styles.section}>
            <div className={styles.animation_img}>
                <img src={logo} alt='img'></img>
            </div>
            <h1>Bem vindo ao <span>Gereto</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/newproject' text="Criar Projeto"></LinkButton>
            <br></br>
        </section>
    )
}

export default Home