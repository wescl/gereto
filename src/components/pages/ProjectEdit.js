import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';
import styles from './ProjectEdit.module.scss';
import Modal from '../layout/Modal';
import Input from '../form/Input';
import Message from '../layout/Message';
import Loading from '../layout/Loading';

function ProjectEdit() {
    const [projeto, setProjeto] = useState(null);
    const { id } = useParams();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddServiceModalOpen, setAddServiceModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        budget: 0,
        cost: 0,
        description: "",
    });
    const [loading, setLoading] = useState(false);

    const openDeleteModal = (serviceId) => {
        setServiceToDelete(serviceId);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setServiceToDelete(null);
        setDeleteModalOpen(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [errorMessage]);

    useEffect(() => {
        const obterProjeto = async () => {
            try {
                const response = await fetch(`https://api-gereto.onrender.com/api/obter-projeto/${id}`);
                const data = await response.json();
                setProjeto(data);

                setFormData({
                    name: data.name,
                    budget: data.budget,
                    cost: data.cost,
                    description: data.description,
                });
            } catch (error) {
                console.error('Erro ao obter projeto:', error);
            }
        };

        obterProjeto();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!formData.name || formData.budget <= 0) {
                setErrorMessage('Por favor, preencha todos os campos.');
                setLoading(false);
                return;
            }

            const response = await fetch(`https://api-gereto.onrender.com/api/atualizar-projeto/${id}`, {

                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...projeto,
                    ...formData,
                }),
            });

            const data = await response.json();
            obterProjetoAtualizado();
            setLoading(false);
            closeEditModal();
        } catch (error) {
            console.error('Erro ao atualizar projeto:', error);
            setLoading(false);
        }
    };

    const obterProjetoAtualizado = async () => {
        try {
            const response = await fetch(`https://api-gereto.onrender.com/api/obter-projeto/${id}`);
            const data = await response.json();
            setProjeto(data);

            setFormData({
                name: data.name,
                budget: data.budget,
                cost: data.cost,
                description: data.description,
            });

            console.log('Projeto Atualizado:', data);
        } catch (error) {
            console.error('Erro ao obter projeto atualizado:', error);
        }
    };

    const handleAdicionarServicoForm = async (serviceData) => {
        try {
            setLoading(true);
            if (
                !serviceData.name ||
                serviceData.cost <= 0 ||
                serviceData.description.trim() === ""
            ) {
                setErrorMessage("Por favor, preencha todos os campos do serviço.");
                setLoading(false);
                return false;
            }

            if (serviceData.cost > formData.budget - formData.cost) {
                setErrorMessage(
                    "O custo do serviço não pode ser maior que o saldo liberado."
                );
                setLoading(false);
                return false;
            }

            const response = await fetch(
                `https://api-gereto.onrender.com/api/adicionar-servico/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(serviceData),
                }
            );

            const data = await response.json();
            console.log(data);

            setProjeto((prevProjeto) => ({
                ...prevProjeto,
                services: [
                    ...prevProjeto.services,
                    { ...serviceData, id: data.serviceId },
                ],
                cost: prevProjeto.cost + serviceData.cost,
                budget: prevProjeto.budget - serviceData.cost,
            }));

            obterProjetoAtualizado();
            closeAddServiceModal();
            setLoading(false);
            return true;
        } catch (error) {
            console.error("Erro ao adicionar serviço:", error);
            setLoading(false);
            return false;
        }
    };


    const handleRemoverServico = async (serviceId) => {
        try {
            openDeleteModal(serviceId);
        } catch (error) {
            console.error('Erro ao remover serviço:', error);
        }
    };

    const confirmDeleteService = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://api-gereto.onrender.com/api/remover-servico/${id}/${serviceToDelete}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            console.log('Data returned from delete API:', data);

            const servicoRemovido = projeto.services.find((servico) => servico.id === serviceToDelete);

            setProjeto((prevProjeto) => ({
                ...prevProjeto,
                services: prevProjeto.services.filter((servico) => servico.id !== serviceToDelete),
                cost: prevProjeto.cost - (servicoRemovido ? servicoRemovido.cost : 0),
                budget: prevProjeto.budget + (servicoRemovido ? servicoRemovido.cost : 0),
            }));

            obterProjetoAtualizado();
            closeDeleteModal();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Erro ao remover serviço:', error);
        }
    };

    const openEditModal = () => setEditModalOpen(true);
    const closeEditModal = () => setEditModalOpen(false);
    const openAddServiceModal = () => setAddServiceModalOpen(true);
    const closeAddServiceModal = () => setAddServiceModalOpen(false);

    if (!projeto) {
        return <div><Loading largura="grande" /></div>;
    }

    return (
        <div className={styles.edit_container}>
            {errorMessage && <Message message={errorMessage} customClass="error" />}

            <div className={styles.info_project}>
                <h2>{projeto.name}</h2>

                <p className={styles.budget}><strong>Orçamento: </strong>R${projeto.budget}</p>

                <p className={`${styles.cost} ${projeto.budget - projeto.cost <= 0 ? styles.redText : ''}`}>
                    <strong>Liberado: </strong>R$ {projeto.budget - projeto.cost}
                </p>

                <p className={styles.description}><strong>Descrição: </strong>{projeto.description}</p>

                <button className={styles.modal_button} onClick={openEditModal}>
                    Editar Projeto <MdEdit />
                </button>
            </div>

            <div className={styles.info_project}>
                {projeto.services && projeto.services.length > 0 ? (
                    <div className={styles.project_service_list}>
                        {projeto.services.map((servico) => (
                            <div key={servico.id || servico.name}>
                                <ServiceCard
                                    id={servico.id}
                                    name={servico.name}
                                    cost={servico.cost}
                                    description={servico.description}
                                    handleRemove={() => handleRemoverServico(servico.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum serviço adicionado!</p>
                )}

                <button className={styles.modal_button} onClick={openAddServiceModal}>
                    Adicionar Serviço <FaPlus />
                </button>
            </div>

            <Modal isOpen={isAddServiceModalOpen} onClose={closeAddServiceModal}>
                <h1>Adicionar Serviço</h1>
                <ServiceForm
                    handleSubmit={handleAdicionarServicoForm}
                    btnText={loading ? <Loading largura="medio" /> : "Adicionar"}
                />
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <h1>Editar Projeto</h1>
                <form>
                    <Input
                        label="Nome do Projeto"
                        name="name"
                        handleOnChange={handleChange}
                        value={formData.name}
                    />

                    <Input
                        label="Orçamento"
                        name="budget"
                        handleOnChange={handleChange}
                        value={formData.budget}
                    />

                    <Input
                        label="Descrição do Projeto"
                        name="description"
                        placeholder="Digite a descrição do projeto"
                        handleOnChange={handleChange}
                        value={formData.description}
                        isTextarea
                    />

                    <button type="button" onClick={handleSubmit}>
                        {loading ? <Loading largura="medio" /> : "Atualizar"}
                    </button>

                    <br></br>
                    <br></br>
                </form>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
                <h1>Deseja excluir este serviço?</h1>
                <button className={styles.confirm} onClick={confirmDeleteService}>{loading ? <Loading largura="medio" /> : "Excluir"}</button>
            </Modal>

            <p className='space'></p>
        </div>
    );
}

export default ProjectEdit;
