import { Request, Response } from 'express';
import { Hospedagem } from '../models/hospedagem';  // Assuming you have a Hospedagem model
import { Cliente } from '../models/cliente';  // Import Cliente model
import { Acomodacao } from '../models/acomodacoes';  // Import Acomodacao model

export const hospedagemController = {
    // Show all hospedagens, including clientes and acomodacao
    show: async (req: Request, res: Response) => {
        try {
            const hospedagens = await Hospedagem.findAll({
                include: [
                    { model: Cliente, through: { attributes: [] } },  // Include clients via the many-to-many relation
                    Acomodacao  // Include the related Acomodacao
                ]
            });
            return res.status(200).json(hospedagens);
        } catch (error) {
            return res.status(400).json({ error: 'Error fetching hospedagens!', details: error.message });
        }
    },

    // Create a new hospedagem
    save: async (req: Request, res: Response) => {
        try {
            const { clientes, acomodacaoId, dataEntrada, dataSaida } = req.body;

            // Create the new hospedagem entry
            const hospedagem = await Hospedagem.create({
                acomodacaoId,
                dataEntrada,
                dataSaida
            });

            // Associate clients with the hospedagem
            if (clientes && clientes.length > 0) {
                await hospedagem.$set('clientes', clientes); // Associating many-to-many relationships
            }

            return res.status(200).json({ message: 'Hospedagem criada com sucesso!', object: hospedagem });
        } catch (error) {
            return res.status(400).json({ error: 'Error while creating hospedagem!', details: error.message });
        }
    },

    // Edit an existing hospedagem
edit: async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID parameter' });
        }

        const hospedagem = await Hospedagem.findByPk(id);
        if (!hospedagem) {
            return res.status(404).json({ error: 'Hospedagem not found' });
        }

        // Destructure only the fields you want to allow updates on
        const { acomodacaoId, dataEntrada, dataSaida, clientes } = req.body;

        // Update hospedagem fields
        await hospedagem.update({ acomodacaoId, dataEntrada, dataSaida });

        // Update many-to-many relationship if applicable
        if (Array.isArray(clientes)) {
            await hospedagem.$set('clientes', clientes); // clientes should be array of IDs
        }

        // Fetch the updated hospedagem with relationships
        const updatedHospedagem = await Hospedagem.findOne({
            where: { id },
            include: [
                { model: Cliente, through: { attributes: [] } },
                Acomodacao
            ]
        });

        return res.status(200).json({
            message: 'Hospedagem atualizada com sucesso',
            object: updatedHospedagem
        });

    } catch (error) {
        console.error('Error updating hospedagem:', error);
        return res.status(500).json({
            error: 'Error updating hospedagem',
            details: error.message
        });
    }
},


    // Delete a hospedagem
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'Invalid ID parameter' });
            }

            const deleted = await Hospedagem.destroy({
                where: { id: id }
            });

            if (deleted) {
                return res.status(200).json({ message: 'Hospedagem deleted successfully' });
            }

            return res.status(404).json({ error: 'Hospedagem not found' });
        } catch (error) {
            return res.status(400).json({ error: 'Error deleting hospedagem', details: error.message });
        }
    }
};
