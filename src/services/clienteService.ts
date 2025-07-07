import Cliente from "../interfaces/cliente";

const CLIENTES_KEY = 'clientes'; // Key for localStorage

// Fetch all clients from localStorage
export const fetchClientes = (): Cliente[] => {
    const clientesData = localStorage.getItem(CLIENTES_KEY);
    if (clientesData) {
        const parsedClientes = JSON.parse(clientesData);
        
        // Convert date strings to Date objects
        parsedClientes.forEach((cliente: Cliente) => {
            cliente.dataNascimento = new Date(cliente.dataNascimento);
            cliente.dataCadastro = new Date(cliente.dataCadastro);
            cliente.documentos.forEach(doc => {
                doc.dataExpedicao = new Date(doc.dataExpedicao);
            });
        });

        return parsedClientes;
    }
    return []; // Return an empty array if no data
};

// Add a new client to localStorage
export const addCliente = (newCliente: Cliente): void => {
    const clientes = fetchClientes();
    if (clientes.length > 0) {
        newCliente.id = clientes[clientes.length - 1].id + 1;
    }
    clientes.push(newCliente);
    localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes)); // Save updated clients array
};

// Edit an existing client in localStorage
export const editCliente = (id: number, updatedCliente: Cliente): void => {
    const clientes = fetchClientes();
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);
    if (clienteIndex === -1) {
        throw new Error('Cliente not found');
    }
    clientes[clienteIndex] = updatedCliente;
    localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes)); // Save updated clients array
};

// Remove a client from localStorage
export const removeCliente = (id: number): void => {
    let clientes = fetchClientes();
    clientes = clientes.filter(cliente => cliente.id !== id);
    clientes = clientes.filter(cliente => cliente.titular !== id)
    localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes)); // Save updated clients array
};
