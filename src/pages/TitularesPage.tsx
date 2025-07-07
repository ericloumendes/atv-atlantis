import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Form } from 'react-bootstrap';
import NavbarComponent from '../components/navbar';
import { fetchClientes, addCliente, editCliente, removeCliente } from '../services/clienteService'; 
import Cliente from '../interfaces/cliente';
import { TipoDocumento } from '../enumeradores/tipoDocumento';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clienteFormData, setClienteFormData] = useState<Cliente>({
        id: 0,
        nome: '',
        nomeSocial: '',
        dataNascimento: new Date(),
        dataCadastro: new Date(),
        telefones: [{ id: 1, ddd: 11, numero: '123456789' }],
        endereco: { rua: '', cidade: '', bairro: '', estado: '', pais: '', codigoPostal: '' },
        documentos: [{ id: 1, numero: '', tipo: TipoDocumento.CPF, dataExpedicao: new Date() }],
        titular: null
    });
    const [clientToDelete, setClientToDelete] = useState<number | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchedClientes = fetchClientes();
        const filteredClientes = fetchedClientes.filter(cliente => cliente.titular === null);
        setClientes(filteredClientes);
    }, []);

    const handleAddCliente = () => {
        resetFormData();
        setShowAddModal(true);
    };

    const handleSaveAddCliente = () => {
        const newCliente: Cliente = { ...clienteFormData, id: clientes.length + 1 };
        addCliente(newCliente);
        setClientes([...clientes, newCliente]);
        setShowAddModal(false);
        resetFormData();
    };

    const handleEditCliente = (id: number) => {
        const clienteToEdit = clientes.find(cliente => cliente.id === id);
        if (clienteToEdit) {
            const updatedCliente = {
                ...clienteToEdit,
                dataNascimento: new Date(clienteToEdit.dataNascimento),
                dataCadastro: new Date(clienteToEdit.dataCadastro),
                documentos: clienteToEdit.documentos.map(doc => ({
                    ...doc,
                    dataExpedicao: new Date(doc.dataExpedicao)
                }))
            };

            setClienteFormData(updatedCliente);
            setShowEditModal(true);
        }
    };

    const handleSaveEditCliente = () => {
        const updatedCliente = { ...clienteFormData };
        editCliente(updatedCliente.id, updatedCliente);
        setClientes(clientes.map(cliente => cliente.id === updatedCliente.id ? updatedCliente : cliente));
        setShowEditModal(false);
        resetFormData();
    };

    const handleDeleteCliente = (id: number) => {
        setClientToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDeleteCliente = () => {
        if (clientToDelete !== null) {
            removeCliente(clientToDelete);
            setClientes(clientes.filter(cliente => cliente.id !== clientToDelete));
            setShowDeleteModal(false);
        }
    };

    const resetFormData = () => {
        setClienteFormData({
            id: 0,
            nome: '',
            nomeSocial: '',
            dataNascimento: new Date(),
            dataCadastro: new Date(),
            telefones: [{ id: 1, ddd: 11, numero: '123456789' }],
            endereco: { rua: '', cidade: '', bairro: '', estado: '', pais: '', codigoPostal: '' },
            documentos: [{ id: 1, numero: '', tipo: TipoDocumento.CPF, dataExpedicao: new Date() }],
            titular: null
        });
    };

    const handleAddTelefone = () => {
        const newTelefone = { id: clienteFormData.telefones.length + 1, ddd: 11, numero: '' };
        setClienteFormData({ ...clienteFormData, telefones: [...clienteFormData.telefones, newTelefone] });
    };

    const handleRemoveTelefone = (id: number) => {
        const updatedTelefones = clienteFormData.telefones.filter(t => t.id !== id);
        setClienteFormData({ ...clienteFormData, telefones: updatedTelefones });
    };

    const handleAddDocumento = () => {
        const newDocumento = { id: clienteFormData.documentos.length + 1, numero: '', tipo: TipoDocumento.CPF, dataExpedicao: new Date() };
        setClienteFormData({ ...clienteFormData, documentos: [...clienteFormData.documentos, newDocumento] });
    };

    const handleRemoveDocumento = (id: number) => {
        const updatedDocumentos = clienteFormData.documentos.filter(d => d.id !== id);
        setClienteFormData({ ...clienteFormData, documentos: updatedDocumentos });
    };

    const handleViewClienteDetails = (id: number) => {
        navigate(`/dependentes/${id}`);
    };

    return (
        <div>
            <NavbarComponent />
            <div className="container mt-4">
                <h3>Clientes titulares</h3>
                <Button variant="primary" className="mb-3" onClick={handleAddCliente}>
                    Adicionar Cliente
                </Button>
                <Card className="shadow-sm">
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Nome Social</th>
                                    <th>Data de Nascimento</th>
                                    <th>Data de Cadastro</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.id}</td>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.nomeSocial}</td>
                                        <td>{cliente.dataNascimento.toLocaleDateString('pt-BR')}</td>
                                        <td>{cliente.dataCadastro.toLocaleDateString('pt-BR')}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={() => handleEditCliente(cliente.id)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeleteCliente(cliente.id)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Excluir
                                            </Button>
                                            <Button
                                                variant="info"
                                                onClick={() => handleViewClienteDetails(cliente.id)}
                                            >
                                                Dependentes
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>

            {/* Add Cliente Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                value={clienteFormData.nome}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, nome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNomeSocial">
                            <Form.Label>Nome Social</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome Social"
                                value={clienteFormData.nomeSocial}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, nomeSocial: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDataNascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                value={clienteFormData.dataNascimento.toISOString().split('T')[0]}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, dataNascimento: new Date(e.target.value) })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDataCadastro">
                            <Form.Label>Data de Cadastro</Form.Label>
                            <Form.Control
                                type="date"
                                value={clienteFormData.dataCadastro.toISOString().split('T')[0]}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, dataCadastro: new Date(e.target.value) })}
                            />
                        </Form.Group>

                        <h5 className='mt-3'>Telefones</h5>

                        {/* Multiple Telefone Inputs */}
                        {clienteFormData.telefones.map((telefone, index) => (
                            <div key={telefone.id}>
                                <Form.Group controlId={`formTelefone-${telefone.id}`}>
                                    <Form.Label>Telefone {index + 1}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Telefone"
                                        value={telefone.numero}
                                        onChange={(e) => {
                                            const updatedTelefones = [...clienteFormData.telefones];
                                            updatedTelefones[index].numero = e.target.value;
                                            setClienteFormData({ ...clienteFormData, telefones: updatedTelefones });
                                        }}
                                    />
                                    {index > 0 && (
                                        <Button variant="danger" onClick={() => handleRemoveTelefone(telefone.id)} style={{ marginTop: '5px' }}>
                                            Remover Telefone
                                        </Button>
                                    )}
                                </Form.Group>
                            </div>
                        ))}
                        <Button variant="secondary" className='mt-2' onClick={handleAddTelefone}>
                            Adicionar Telefone
                        </Button>

                        <h5 className='mt-3'>Documentos</h5>

                        {/* Multiple Documento Inputs */}
                        {clienteFormData.documentos.map((documento, index) => (
                            <div key={documento.id}>
                                <Form.Group controlId={`formDocumento-${documento.id}`}>
                                    <p className='mt-3'>Documento {index + 1}</p>
                                    <Form.Label>Número do documento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Número do Documento"
                                        value={documento.numero}
                                        onChange={(e) => {
                                            const updatedDocumentos = [...clienteFormData.documentos];
                                            updatedDocumentos[index].numero = e.target.value;
                                            setClienteFormData({ ...clienteFormData, documentos: updatedDocumentos });
                                        }}
                                    />
                                    <Form.Label>Tipo do documento</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={documento.tipo}
                                        onChange={(e) => {
                                            const updatedDocumentos = [...clienteFormData.documentos];
                                            updatedDocumentos[index].tipo = e.target.value as TipoDocumento;
                                            setClienteFormData({ ...clienteFormData, documentos: updatedDocumentos });
                                        }}
                                    >
                                        <option value={TipoDocumento.CPF}>CPF</option>
                                        <option value={TipoDocumento.RG}>RG</option>
                                        <option value={TipoDocumento.Passaporte}>Passaporte</option>
                                    </Form.Control>
                                    <Form.Label>Data de expedição</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={documento.dataExpedicao.toISOString().split('T')[0]}
                                        onChange={(e) => {
                                            const updatedDocumentos = [...clienteFormData.documentos];
                                            updatedDocumentos[index].dataExpedicao = new Date(e.target.value);
                                            setClienteFormData({ ...clienteFormData, documentos: updatedDocumentos });
                                        }}
                                    />
                                    {index > 0 && (
                                        <Button variant="danger" onClick={() => handleRemoveDocumento(documento.id)} style={{ marginTop: '5px' }}>
                                            Remover Documento
                                        </Button>
                                    )}
                                </Form.Group>
                            </div>
                        ))}
                        <Button variant="secondary" className='mt-2' onClick={handleAddDocumento}>
                            Adicionar Documento
                        </Button>

                        {/* Endereco */}
                        <Form.Group controlId="formEndereco" className='mt-3'>
                            <h5>Endereço</h5>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Rua"
                                value={clienteFormData.endereco.rua}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, rua: e.target.value } })}
                            />
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Bairro"
                                value={clienteFormData.endereco.bairro}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, bairro: e.target.value } })}
                            />
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cidade"
                                value={clienteFormData.endereco.cidade}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, cidade: e.target.value } })}
                            />
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Estado"
                                value={clienteFormData.endereco.estado}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, estado: e.target.value } })}
                            />
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="País"
                                value={clienteFormData.endereco.pais}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, pais: e.target.value } })}
                            />
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CEP"
                                value={clienteFormData.endereco.codigoPostal}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, codigoPostal: e.target.value } })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveAddCliente}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Cliente Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                value={clienteFormData.nome}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, nome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNomeSocial">
                            <Form.Label>Nome Social</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome Social"
                                value={clienteFormData.nomeSocial}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, nomeSocial: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDataNascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                value={clienteFormData.dataNascimento.toISOString().split('T')[0]}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, dataNascimento: new Date(e.target.value) })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDataCadastro">
                            <Form.Label>Data de Cadastro</Form.Label>
                            <Form.Control
                                type="date"
                                value={clienteFormData.dataCadastro.toISOString().split('T')[0]}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, dataCadastro: new Date(e.target.value) })}
                            />
                        </Form.Group>

                        <h5 className='mt-3'>Telefones</h5>

                        {/* Multiple Telefone Inputs */}
                        {clienteFormData.telefones.map((telefone, index) => (
                            <div key={telefone.id}>
                                <Form.Group controlId={`formTelefone-${telefone.id}`}>
                                    <Form.Label>Telefone {index + 1}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Telefone"
                                        value={telefone.numero}
                                        onChange={(e) => {
                                            const updatedTelefones = [...clienteFormData.telefones];
                                            updatedTelefones[index].numero = e.target.value;
                                            setClienteFormData({ ...clienteFormData, telefones: updatedTelefones });
                                        }}
                                    />
                                    {index > 0 && (
                                        <Button variant="danger" onClick={() => handleRemoveTelefone(telefone.id)} style={{ marginTop: '5px' }}>
                                            Remover Telefone
                                        </Button>
                                    )}
                                </Form.Group>
                            </div>
                        ))}
                        <Button variant="secondary" className='mt-2' onClick={handleAddTelefone}>
                            Adicionar Telefone
                        </Button>

                        <h5 className='mt-3'>Documentos</h5>

                        {/* Multiple Documento Inputs */}
                        {clienteFormData.documentos.map((documento, index) => (
                            <div key={documento.id}>
                                <Form.Group controlId={`formDocumento-${documento.id}`}>
                                    <p className='mt-3'>Documento {index + 1}</p>
                                    <Form.Label>Número do documento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Número do Documento"
                                        value={documento.numero}
                                        onChange={(e) => {
                                            const updatedDocumentos = [...clienteFormData.documentos];
                                            updatedDocumentos[index].numero = e.target.value;
                                            setClienteFormData({ ...clienteFormData, documentos: updatedDocumentos });
                                        }}
                                    />
                                    <Form.Label>Tipo do documento</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={documento.tipo}
                                        onChange={(e) => {
                                            const updatedDocumentos = [...clienteFormData.documentos];
                                            updatedDocumentos[index].tipo = e.target.value as TipoDocumento;
                                            setClienteFormData({ ...clienteFormData, documentos: updatedDocumentos });
                                        }}
                                    >
                                        <option value={TipoDocumento.CPF}>CPF</option>
                                        <option value={TipoDocumento.RG}>RG</option>
                                        <option value={TipoDocumento.Passaporte}>Passaporte</option>
                                    </Form.Control>
                                    <Form.Label>Data de Expedição</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={documento.dataExpedicao.toISOString().split('T')[0]}
                                        onChange={(e) => {
                                            const updatedDocumentos = [...clienteFormData.documentos];
                                            updatedDocumentos[index].dataExpedicao = new Date(e.target.value);
                                            setClienteFormData({ ...clienteFormData, documentos: updatedDocumentos });
                                        }}
                                    />
                                    {index > 0 && (
                                        <Button variant="danger" onClick={() => handleRemoveDocumento(documento.id)} style={{ marginTop: '5px' }}>
                                            Remover Documento
                                        </Button>
                                    )}
                                </Form.Group>
                            </div>
                        ))}
                        <Button variant="secondary" className='mt-2' onClick={handleAddDocumento}>
                            Adicionar Documento
                        </Button>

                        {/* Endereco */}
                        <Form.Group controlId="formEndereco" className='mt-3'>
                            <h5>Endereço</h5>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Rua"
                                value={clienteFormData.endereco.rua}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, rua: e.target.value } })}
                            />
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Bairro"
                                value={clienteFormData.endereco.bairro}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, bairro: e.target.value } })}
                            />
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cidade"
                                value={clienteFormData.endereco.cidade}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, cidade: e.target.value } })}
                            />
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Estado"
                                value={clienteFormData.endereco.estado}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, estado: e.target.value } })}
                            />
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="País"
                                value={clienteFormData.endereco.pais}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, pais: e.target.value } })}
                            />
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CEP"
                                value={clienteFormData.endereco.codigoPostal}
                                onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: { ...clienteFormData.endereco, codigoPostal: e.target.value } })}
                            />
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveEditCliente}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Cliente Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tem certeza que deseja excluir este cliente?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDeleteCliente}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MainPage;
