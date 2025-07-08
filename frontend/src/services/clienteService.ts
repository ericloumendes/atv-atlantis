import Cliente from "../interfaces/cliente";
import Documento from "../interfaces/documento";
import Telefone from "../interfaces/telefone";
import Endereco from "../interfaces/endereco";

// The base URL for your backend API
const BASE_URL = 'http://localhost:5000/cliente';

// Fetch all clients from the backend
export const fetchClientes = async (): Promise<Cliente[]> => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch clientes');
        }
        const data = await response.json();
        
        // Convert date strings to Date objects for correct handling
        data.forEach((cliente: Cliente) => {
            cliente.dataNascimento = new Date(cliente.dataNascimento);
            cliente.dataCadastro = new Date(cliente.dataCadastro);
            cliente.documentos.forEach((doc: Documento) => {
                doc.dataExpedicao = new Date(doc.dataExpedicao);
            });
        });

        return data;
    } catch (error) {
        console.error('Error fetching clientes:', error);
        return [];
    }
};

// Add a new client to the backend
export const addCliente = async (newCliente: Cliente): Promise<void> => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCliente),
        });

        if (!response.ok) {
            throw new Error('Error creating cliente');
        }

        const result = await response.json();
        const clienteId = result.object.id;  // Assuming the backend responds with the newly created cliente's ID
        
        console.log(newCliente)

        // Call the functions to add telefone, documentos, and endereco after creating the cliente
        await handleAddTelefone(clienteId, newCliente.telefones);
        await handleAddDocumento(clienteId, newCliente.documentos);
        await handleAddEndereco(clienteId, newCliente.enderecos);

        console.log(result.message); // Handle success or further processing
    } catch (error) {
        console.error('Error while creating cliente:', error);
    }
};

// Handle adding or removing telefones
const handleAddTelefone = async (clienteId: number, telefones: Telefone[]) => {
    try {
        for (const telefone of telefones) {
            if (telefone.id > 0) {
                // Update existing telefone
                const response = await fetch(`http://localhost:5000/telefone/${telefone.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clienteId: clienteId,
                        ddd: telefone.ddd,
                        numero: telefone.numero,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error updating telefone');
                }
            } else {
                // Add new telefone
                const response = await fetch('http://localhost:5000/telefone', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clienteId: clienteId,
                        ddd: telefone.ddd,
                        numero: telefone.numero,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error adding telefone');
                }
            }
        }
    } catch (error) {
        console.error('Error handling telefone:', error);
    }
};

// Handle adding or removing documentos
const handleAddDocumento = async (clienteId: number, documentos: Documento[]) => {
    try {
        for (const documento of documentos) {
            if (documento.id > 0) {
                // Update existing documento
                const response = await fetch(`http://localhost:5000/documento/${documento.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clienteId: clienteId,
                        numero: documento.numero,
                        tipo: documento.tipo,
                        dataExpedicao: documento.dataExpedicao.toISOString().split('T')[0],
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error updating documento');
                }
            } else {
                // Add new documento
                const response = await fetch('http://localhost:5000/documento', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clienteId: clienteId,
                        numero: documento.numero,
                        tipo: documento.tipo,
                        dataExpedicao: documento.dataExpedicao.toISOString().split('T')[0],
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error adding documento');
                }
            }
        }
    } catch (error) {
        console.error('Error handling documento:', error);
    }
};

// Handle adding or removing endereco
const handleAddEndereco = async (clienteId: number, endereco: Endereco) => {
    if (endereco.id > 0){
        const response = await fetch(`http://localhost:5000/endereco/${endereco.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    clienteId: clienteId,
                    rua: endereco.rua,
                    cidade: endereco.cidade,
                    bairro: endereco.bairro,
                    estado: endereco.estado,
                    pais: endereco.pais,
                    codigoPostal: endereco.codigoPostal,
                }),
        });

        if (!response.ok) {
            throw new Error('Error updating endereco');
        }
    }
    else{

            const addResponse = await fetch('http://localhost:5000/endereco', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clienteId: clienteId,
                    rua: endereco.rua,
                    cidade: endereco.cidade,
                    bairro: endereco.bairro,
                    estado: endereco.estado,
                    pais: endereco.pais,
                    codigoPostal: endereco.codigoPostal,
                }),
            });

            if (!addResponse.ok) {
                throw new Error('Error adding endereco');
            }
        }
    };

// Edit an existing client in the backend
export const editCliente = async (id: number, updatedCliente: Cliente): Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCliente),
        });

        if (!response.ok) {
            throw new Error('Error updating cliente');
        }

        const result = await response.json();
        console.log(result); // Handle success or further processing

        // Handle updating telefone, documento, and endereco after editing
        await handleAddTelefone(id, updatedCliente.telefones);
        await handleAddDocumento(id, updatedCliente.documentos);
        await handleAddEndereco(id, updatedCliente.enderecos);

    } catch (error) {
        console.error('Error updating cliente:', error);
    }
};

// Remove a client from the backend
export const removeCliente = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error deleting cliente');
        }

        const result = await response.json();
        console.log('Cliente deleted:', result); // Handle success or further processing
    } catch (error) {
        console.error('Error deleting cliente:', error);
    }
};
