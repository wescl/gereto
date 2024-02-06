import styles from './NewProject.module.scss';
import ProjectForm from '../project/ProjectForm';
import { useNavigate } from 'react-router-dom'; 

function NewProject() {
    const navigate = useNavigate(); 

    function createPost(Project) {
        Project.cost = 0;
        Project.services = [];
        navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } }); 
    }

    return (
        <section className={styles.section}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar serviços</p>
            <ProjectForm handleSubmit={createPost}></ProjectForm>
            <p className='space'></p>
        </section>
    );
}

export default NewProject;
