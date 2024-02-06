import Message from "../layout/Message";
import { useLocation } from "react-router-dom";
import styles from './Projects.module.scss';
import { useState, useEffect } from "react";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [editProject, setEditProject] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    let message = '';

    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        fetch('https://api-gereto.onrender.com/api/listar-projetos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch((err) => console.error(err));
    }, []);

    function removeProject(id) {
        setLoading(true);
        if (confirmDelete === id) {
            fetch(`https://api-gereto.onrender.com/api/excluir-projeto/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((resp) => {
                    if (!resp.ok) {
                        setLoading(false);
                        throw new Error(`Erro ao excluir projeto: ${resp.statusText}`);
                    }
                    setLoading(false);
                    return resp.json();
                })
                .then(() => {
                    setProjects(projects.filter((project) => project.id !== id));
                    setRemoveLoading(true);
                    setProjectMessage('Projeto removido com sucesso!');
                    setConfirmDelete(null);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setProjectMessage('Erro ao remover o projeto. Tente novamente.');
                    setConfirmDelete(null);
                    setLoading(false);
                });
        } else {
            setConfirmDelete(id);
            setLoading(false);
        }
    }

    function projectEdit(id) {
        console.log(`Editar projeto com ID: ${id}`);
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title}>
                <h1>Projetos</h1>
            </div>
            {message && <Message customClass='success' message="Projeto criado com sucesso!" />}
            <div className={styles.project_list}>
                {projects.map((project) => (
                    <div key={project.id} className={styles.project}>
                        <ProjectCard
                            name={project.name}
                            budget={project.budget}
                            category={project.category}
                            description={project.description}
                            id={project.id}
                            key={project.id}
                            handleRemove={() => removeProject(project.id)}
                            handleEdit={() => projectEdit(project.id)}
                        />
                    </div>
                ))}
                {!removeLoading && <Loading largura="grande" />}
                {removeLoading && projects.length === 0 && (
                    <div className={styles.no_projects}>
                        <span>Você ainda não criou nenhum projeto!</span>
                        <p></p><br></br><br></br>
                        <LinkButton to='/newproject' text="Criar Projeto"></LinkButton>
                    </div>
                )}
                {confirmDelete !== null && (
                    <div className={styles.confirmation_modal}>
                        <div className={styles.box}>
                            <p>Deseja excluir este projeto?</p>

                            {loading ? (
                                <button onClick={() => removeProject(confirmDelete)}><Loading largura="medio"/>ㅤ</button>
                            ) : (
                                <button onClick={() => removeProject(confirmDelete)}>Remover</button>
                            )}

                            <button onClick={() => setConfirmDelete(null)}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>

            <p className="space"></p>
        </div>
    )
}

export default Projects;
