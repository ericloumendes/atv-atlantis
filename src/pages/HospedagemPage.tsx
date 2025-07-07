import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Form } from 'react-bootstrap';
import NavbarComponent from '../components/navbar';
import { fetchClientes } from '../services/clienteService';
import { fetchHospedagens, addHospedagem, editHospedagem, removeHospedagem } from '../services/hospedagemService';
import Cliente from '../interfaces/cliente';
import Hospedagem from '../interfaces/hospedagem';
import Acomodacao from '../interfaces/acomodacoes';
import { fetchAcomodacoes } from '../services/acomodacoesService';

const HospedagemPage: React.FC = () => {
    const [hospedagens, setHospedagens] = useState<Hospedagem[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [hospedagemFormData, setHospedagemFormData] = useState<Hospedagem>({
        id: 0,
        clientes: [],
        acomodacao: {} as Acomodacao,
        dataEntrada: new Date(),
        dataSaida: new Date(),
    });
    const [hospedagemToDelete, setHospedagemToDelete] = useState<number | null>(null);

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);

    useEffect(() => {
        const fetchedClientes = fetchClientes();
        setClientes(fetchedClientes);

        const fetchedAcomodacoes = fetchAcomodacoes();
        setAcomodacoes(fetchedAcomodacoes);

        if (fetchedAcomodacoes.length > 0) {
            setHospedagemFormData((prevState) => ({
                ...prevState,
                acomodacao: fetchedAcomodacoes[0], // Set the first acomodacao as the default value
            }));
        }

        const fetchedHospedagens = fetchHospedagens();
        setHospedagens(fetchedHospedagens);
    }, []);

    const handleAddHospedagem = () => {
        resetFormData();
        setShowAddModal(true);
    };

    const handleSaveAddHospedagem = () => {
        const newHospedagem: Hospedagem = { ...hospedagemFormData, id: hospedagens.length + 1 };
        addHospedagem(newHospedagem);
        setHospedagens([...hospedagens, newHospedagem]);
        setShowAddModal(false);
        resetFormData();
    };

    const handleEditHospedagem = (id: number) => {
        const hospedagemToEdit = hospedagens.find(hospedagem => hospedagem.id === id);
        if (hospedagemToEdit) {
            setHospedagemFormData(hospedagemToEdit);
            setShowEditModal(true);
        }
    };

    const handleSaveEditHospedagem = () => {
        const updatedHospedagem = { ...hospedagemFormData };
        editHospedagem(updatedHospedagem.id, updatedHospedagem);
        setHospedagens(hospedagens.map(hospedagem => hospedagem.id === updatedHospedagem.id ? updatedHospedagem : hospedagem));
        setShowEditModal(false);
        resetFormData();
    };

    const handleDeleteHospedagem = (id: number) => {
        setHospedagemToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDeleteHospedagem = () => {
        if (hospedagemToDelete !== null) {
            removeHospedagem(hospedagemToDelete);
            setHospedagens(hospedagens.filter(hospedagem => hospedagem.id !== hospedagemToDelete));
            setShowDeleteModal(false);
        }
    };

    const resetFormData = () => {
        setHospedagemFormData({
            id: 0,
            clientes: [],
            acomodacao: acomodacoes.length > 0 ? acomodacoes[0] : {} as Acomodacao,
            dataEntrada: new Date(),
            dataSaida: new Date(),
        });
    };

    const handleAddClienteToHospedagem = () => {
        setHospedagemFormData(prevState => ({
            ...prevState,
            clientes: [
                ...prevState.clientes,
                { 
                    id: -1, 
                    nome: '', 
                    nomeSocial: '', 
                    dataNascimento: new Date(), 
                    dataCadastro: new Date(),
                    telefones: [],
                    endereco: { rua: '', cidade: '', bairro: '', estado: '', pais: '', codigoPostal: '' },
                    documentos: [],
                    dependentes: [],
                    titular: null 
                } 
            ],
        }));
    };

    const handleRemoveClienteFromHospedagem = (index: number) => {
        const updatedClientes = [...hospedagemFormData.clientes];
        updatedClientes.splice(index, 1);
        setHospedagemFormData({ ...hospedagemFormData, clientes: updatedClientes });
    };

const handleChangeCliente = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const selectedClientId = Number(e.target.value);
    const updatedClientes = [...hospedagemFormData.clientes];
    
    const selectedCliente = clientes.find(cliente => cliente.id === selectedClientId);

    if (selectedCliente) {
        updatedClientes[index] = selectedCliente;
    }

    setHospedagemFormData({ ...hospedagemFormData, clientes: updatedClientes });
};


    return (
        <div>
            <NavbarComponent />
            <div className="container mt-4">
                <h3>Hospedagens</h3>
                <Button variant="primary" className="mb-3" onClick={handleAddHospedagem}>
                    Adicionar Hospedagem
                </Button>
                <Card className="shadow-sm">
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Clientes</th>
                                    <th>Acomodação</th>
                                    <th>Data de Entrada</th>
                                    <th>Data de Saída</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hospedagens.map(hospedagem => (
                                    <tr key={hospedagem.id}>
                                        <td>{hospedagem.id}</td>
                                        <td>{hospedagem.clientes.map(cliente => cliente.nome).join(", ")}</td>
                                        <td>{hospedagem.acomodacao.nomeAcomadacao}</td>
                                        <td>{hospedagem.dataEntrada.toLocaleDateString('pt-BR')}</td>
                                        <td>{hospedagem.dataSaida.toLocaleDateString('pt-BR')}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={() => handleEditHospedagem(hospedagem.id)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeleteHospedagem(hospedagem.id)}
                                            >
                                                Excluir
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>

            {/* Add Hospedagem Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Hospedagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formClientes">
                            <Form.Label>Clientes</Form.Label>
                            <div>
                                {hospedagemFormData.clientes.map((cliente, index) => (
                                    <div key={index}>
                                        <Form.Control
                                            as="select"
                                            value={cliente.id}
                                            onChange={(e) => handleChangeCliente(e as unknown as React.ChangeEvent<HTMLSelectElement>, index)}
                                        >
                                            <option value={-1}>Selecione um Cliente</option>
                                            {clientes.map(c => (
                                                <option key={c.id} value={c.id}>{c.nome}</option>
                                            ))}
                                        </Form.Control>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleRemoveClienteFromHospedagem(index)}
                                            style={{ marginTop: '10px' }}
                                        >
                                            Remover
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="primary" onClick={handleAddClienteToHospedagem}>
                                Adicionar Cliente
                            </Button>
                        </Form.Group>

                        <Form.Group controlId="formAcomodacao">
                            <Form.Label>Acomodação</Form.Label>
                            <Form.Control
                                as="select"
                                value={hospedagemFormData.acomodacao.id}
                                onChange={(e) => {
                                    const acomodacao = acomodacoes.find(acomodacao => acomodacao.id === Number(e.target.value));
                                    setHospedagemFormData({ ...hospedagemFormData, acomodacao: acomodacao! });
                                }}
                            >
                                {acomodacoes.map(acomodacao => (
                                    <option key={acomodacao.id} value={acomodacao.id}>
                                        {acomodacao.nomeAcomadacao}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDataEntrada">
                            <Form.Label>Data de Entrada</Form.Label>
                            <Form.Control
                                type="date"
                                value={hospedagemFormData.dataEntrada.toISOString().split('T')[0]}
                                onChange={(e) => setHospedagemFormData({ ...hospedagemFormData, dataEntrada: new Date(e.target.value) })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDataSaida">
                            <Form.Label>Data de Saída</Form.Label>
                            <Form.Control
                                type="date"
                                value={hospedagemFormData.dataSaida.toISOString().split('T')[0]}
                                onChange={(e) => setHospedagemFormData({ ...hospedagemFormData, dataSaida: new Date(e.target.value) })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveAddHospedagem}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Hospedagem Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Hospedagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Same fields as Add Hospedagem Modal */}
                    <Form>
                        <Form.Group controlId="formClientes">
                            <Form.Label>Clientes</Form.Label>
                            <div>
                                {hospedagemFormData.clientes.map((cliente, index) => (
                                    <div key={index}>
                                        <Form.Control
                                            as="select"
                                            value={cliente.id}
                                            onChange={(e) => handleChangeCliente(e as unknown as React.ChangeEvent<HTMLSelectElement>, index)}
                                        >
                                            <option value={-1}>Selecione um Cliente</option>
                                            {clientes.map(c => (
                                                <option key={c.id} value={c.id}>{c.nome}</option>
                                            ))}
                                        </Form.Control>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleRemoveClienteFromHospedagem(index)}
                                            style={{ marginTop: '10px' }}
                                        >
                                            Remover
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="primary" onClick={handleAddClienteToHospedagem}>
                                Adicionar Cliente
                            </Button>
                        </Form.Group>

                        <Form.Group controlId="formAcomodacao">
                            <Form.Label>Acomodação</Form.Label>
                            <Form.Control
                                as="select"
                                value={hospedagemFormData.acomodacao.id}
                                onChange={(e) => {
                                    const acomodacao = acomodacoes.find(acomodacao => acomodacao.id === Number(e.target.value));
                                    setHospedagemFormData({ ...hospedagemFormData, acomodacao: acomodacao! });
                                }}
                            >
                                {acomodacoes.map(acomodacao => (
                                    <option key={acomodacao.id} value={acomodacao.id}>
                                        {acomodacao.nomeAcomadacao}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDataEntrada">
                            <Form.Label>Data de Entrada</Form.Label>
                            <Form.Control
                                type="date"
                                value={hospedagemFormData.dataEntrada.toISOString().split('T')[0]}
                                onChange={(e) => setHospedagemFormData({ ...hospedagemFormData, dataEntrada: new Date(e.target.value) })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDataSaida">
                            <Form.Label>Data de Saída</Form.Label>
                            <Form.Control
                                type="date"
                                value={hospedagemFormData.dataSaida.toISOString().split('T')[0]}
                                onChange={(e) => setHospedagemFormData({ ...hospedagemFormData, dataSaida: new Date(e.target.value) })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveEditHospedagem}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Hospedagem Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tem certeza que deseja excluir esta hospedagem?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDeleteHospedagem}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HospedagemPage;
