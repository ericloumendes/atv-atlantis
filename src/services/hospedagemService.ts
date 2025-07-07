import Hospedagem from "../interfaces/hospedagem";
import { fetchAcomodacoes } from "./acomodacoesService";
import { fetchClientes } from './clienteService'; // Importing the Cliente service

const HOSPEDAGEM_KEY = 'hospedagens'; // Key for localStorage

// Fetch all hospedagens from localStorage
export const fetchHospedagens = (): Hospedagem[] => {
    const hospedagensData = localStorage.getItem(HOSPEDAGEM_KEY);
    if (hospedagensData) {
        const parsedHospedagens = JSON.parse(hospedagensData);

        // Convert date strings to Date objects
        parsedHospedagens.forEach((hospedagem: Hospedagem) => {
            hospedagem.dataEntrada = new Date(hospedagem.dataEntrada);
            hospedagem.dataSaida = new Date(hospedagem.dataSaida);
        });

        return parsedHospedagens;
    }
    return []; // Return an empty array if no data
};

// Add a new hospedagem to localStorage
export const addHospedagem = (newHospedagem: Hospedagem): void => {
    const hospedagens = fetchHospedagens();
    
    if (hospedagens.length > 0) {
        newHospedagem.id = hospedagens[hospedagens.length - 1].id + 1;
    } else {
        newHospedagem.id = 1; // If there are no existing hospedagens, start from 1
    }
    
    // Validation for associated Clientes and Acomodacao
    const validClientes = newHospedagem.clientes.every(cliente => {
        const clientes = fetchClientes();
        return clientes.some(existingCliente => existingCliente.id === cliente.id);
    });

    const validAcomodacao = fetchAcomodacoes().some(acomodacao => acomodacao.id === newHospedagem.acomodacao.id);

    if (!validClientes || !validAcomodacao) {
        throw new Error('Invalid Clientes or Acomodacao');
    }

    hospedagens.push(newHospedagem);
    localStorage.setItem(HOSPEDAGEM_KEY, JSON.stringify(hospedagens)); // Save updated hospedagens array
};

// Edit an existing hospedagem in localStorage
export const editHospedagem = (id: number, updatedHospedagem: Hospedagem): void => {
    const hospedagens = fetchHospedagens();
    const hospedagemIndex = hospedagens.findIndex(hospedagem => hospedagem.id === id);
    
    if (hospedagemIndex === -1) {
        throw new Error('Hospedagem not found');
    }

    // Validation for associated Clientes and Acomodacao
    const validClientes = updatedHospedagem.clientes.every(cliente => {
        const clientes = fetchClientes();
        return clientes.some(existingCliente => existingCliente.id === cliente.id);
    });

    const validAcomodacao = fetchAcomodacoes().some(acomodacao => acomodacao.id === updatedHospedagem.acomodacao.id);

    if (!validClientes || !validAcomodacao) {
        throw new Error('Invalid Clientes or Acomodacao');
    }

    hospedagens[hospedagemIndex] = updatedHospedagem;
    localStorage.setItem(HOSPEDAGEM_KEY, JSON.stringify(hospedagens)); // Save updated hospedagens array
};

// Remove a hospedagem from localStorage
export const removeHospedagem = (id: number): void => {
    let hospedagens = fetchHospedagens();
    hospedagens = hospedagens.filter(hospedagem => hospedagem.id !== id);
    localStorage.setItem(HOSPEDAGEM_KEY, JSON.stringify(hospedagens)); // Save updated hospedagens array
};
