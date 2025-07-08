import Acomodacao from "../interfaces/acomodacoes";

// The base URL for your backend API
const BASE_URL = 'http://localhost:5000/acomodacoes';

// Fetch all acomodacoes from the backend
export const fetchAcomodacoes = async (): Promise<Acomodacao[]> => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch acomodacoes');
        }
        const data: Acomodacao[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching acomodacoes:', error);
        return []; // Return an empty array if fetching fails
    }
};
