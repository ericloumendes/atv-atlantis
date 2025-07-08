import Hospedagem from "../interfaces/hospedagem";
import Cliente from "../interfaces/cliente";

const BASE_URL = 'http://localhost:5000/hospedagem';

// Fetch all hospedagens
export const fetchHospedagens = async (): Promise<Hospedagem[]> => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch hospedagens");
        }

        const data = await response.json();

        // Convert date strings to Date objects
        data.forEach((hospedagem: Hospedagem) => {
            hospedagem.dataEntrada = new Date(hospedagem.dataEntrada);
            hospedagem.dataSaida = new Date(hospedagem.dataSaida);
        });

        return data;
    } catch (error) {
        console.error("Error fetching hospedagens:", error);
        return [];
    }
};

// Add a new hospedagem
export const addHospedagem = async (newHospedagem: Hospedagem): Promise<void> => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                acomodacaoId: newHospedagem.acomodacaoId,
                dataEntrada: newHospedagem.dataEntrada.toISOString().split("T")[0],
                dataSaida: newHospedagem.dataSaida.toISOString().split("T")[0],
                clientes: newHospedagem.clientes.map((c: Cliente) => c.id), // ✅ ONLY send IDs
            }),

        });

        if (!response.ok) {
            throw new Error('Error creating hospedagem');
        }

        const result = await response.json();
        console.log('Hospedagem created:', result);
    } catch (error) {
        console.error("Error adding hospedagem:", error);
    }
};

// Update an existing hospedagem
export const editHospedagem = async (id: number, updatedHospedagem: Hospedagem): Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                acomodacaoId: updatedHospedagem.acomodacaoId,
                dataEntrada: updatedHospedagem.dataEntrada.toISOString().split("T")[0],
                dataSaida: updatedHospedagem.dataSaida.toISOString().split("T")[0],
                clientes: updatedHospedagem.clientes.map((c) => c.id), // ✅ Important!
            }),
        });

        if (!response.ok) {
            throw new Error("Error updating hospedagem");
        }

        const result = await response.json();
        console.log('Hospedagem updated:', result);
    } catch (error) {
        console.error("Error updating hospedagem:", error);
    }
};


// Delete a hospedagem
export const removeHospedagem = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Error deleting hospedagem");
        }

        const result = await response.json();
        console.log("Hospedagem deleted:", result);
    } catch (error) {
        console.error("Error deleting hospedagem:", error);
    }
};
