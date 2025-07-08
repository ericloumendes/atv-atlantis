import { Request, Response } from 'express';
import { Telefone } from '../models/telefone';

export const telefoneController = {
    show: async (req: Request, res: Response) => {
        try{
            const telefones = await Telefone.findAll();
            return res.status(200).json(telefones)
        } catch (error){
            return res.status(400).json({error: 'Error fetching telefones!', details: error.message})
        }
    },

    save: async (req: Request, res: Response) => {
        try{
            const telefone = await Telefone.create(req.body);
            return res.status(200).json({message: 'Telefone criado com sucesso!', object: telefone});
        } catch (error){
            return res.status(400).json({error: 'Error while creating telefone!', details: error.message})
        }
    },

    edit: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
              return res.status(400).json({ error: 'Invalid ID parameter' });
            }
            const [updated] = await Telefone.update(req.body, {
              where: { id: id }
            });
            if (updated) {
              const updatedTelefone = await Telefone.findOne({ where: { id: id } });
              return res.status(200).json(updatedTelefone);
            }
            return res.status(404).json({ error: 'Telefone not found' });
          } catch (error) {
            return res.status(400).json({ error: 'Error updating Telefone', details: error.message });
          }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
              return res.status(400).json({ error: 'Invalid ID parameter' });
            }
            const deleted = await Telefone.destroy({
              where: { id: id }
            });
            if (deleted) {
              return res.status(200).json(deleted);
            }
            return res.status(404).json({ error: 'Telefone not found' });
          } catch (error) {
            return res.status(400).json({ error: 'Error deleting Telefone', details: error.message });
          }
    }
}