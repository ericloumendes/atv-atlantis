import { NomeAcomadacao } from "../enumeradores/tipoAcomidacao";
import Acomodacao from "../interfaces/acomodacoes";


const ACOMODACOES_KEY = 'acomodacoes'; // Key for localStorage

// Default list of Acomodacoes to add on initial setup
const defaultAcomodacoes: Acomodacao[] = [
    {
        id: 1,
        nomeAcomadacao: NomeAcomadacao.SolteiroSimples,
        camaCasal: 0,
        camaSolteiro: 1,
        climatizacao: true,
        garagem: 0,
        suite: 1,
    },
    {
        id: 2,
        nomeAcomadacao: NomeAcomadacao.SolteiroMais,
        camaCasal: 1,
        camaSolteiro: 0,
        climatizacao: true,
        garagem: 1, 
        suite: 1,
    },
    {
        id: 3,
        nomeAcomadacao: NomeAcomadacao.CasalSimples,
        camaCasal: 1,
        camaSolteiro: 0,
        climatizacao: true,
        garagem: 1,
        suite: 1
    },
    {
        id: 4,
        nomeAcomadacao: NomeAcomadacao.FamilaSimples,
        camaCasal: 1,
        camaSolteiro: 2,
        climatizacao: true,
        garagem: 1,
        suite: 1
    },
    {
        id: 5,
        nomeAcomadacao: NomeAcomadacao.FamiliaSuper,
        camaCasal: 2,
        camaSolteiro: 6,
        climatizacao: true,
        garagem: 2,
        suite: 3
    },
    {
        id: 6,
        nomeAcomadacao: NomeAcomadacao.FamiliaMais,
        camaCasal: 1,
        camaSolteiro: 5,
        climatizacao: true,
        garagem: 2,
        suite: 2
    }
];

// Fetch all acomodacoes from localStorage
export const fetchAcomodacoes = (): Acomodacao[] => {
    const acomodacoesData = localStorage.getItem(ACOMODACOES_KEY);
    if (acomodacoesData) {
        return JSON.parse(acomodacoesData);
    }
    return []; // Return an empty array if no data
};

// Initialize Acomodacoes only once
export const initAcomodacoes = (): void => {
    const acomodacoes = fetchAcomodacoes();
    if (acomodacoes.length === 0) {
        // If no acomodacoes exist, set the default list
        localStorage.setItem(ACOMODACOES_KEY, JSON.stringify(defaultAcomodacoes));
    }
};

// Call initAcomodacoes once at the start of the app (e.g., in the entry point)
initAcomodacoes();
