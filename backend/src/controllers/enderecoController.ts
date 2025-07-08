import { Request, Response } from 'express';
import { Endereco } from '../models/endereco';

export const enderecoController = {
    show: async (req: Request, res: Response) => {
        try{
            const endereco = await Endereco.findAll();
            return res.status(200).json(endereco)
        } catch (error){
            return res.status(400).json({error: 'Error fetching endereco!', details: error.message})
        }
    },

    save: async (req: Request, res: Response) => {
        try{
            const endereco = await Endereco.create(req.body);
            return res.status(200).json({message: 'Endereco criado com sucesso!', object: endereco});
        } catch (error){
            return res.status(400).json({error: 'Error while creating endereco!', details: error.message})
        }
    },

    edit: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
              return res.status(400).json({ error: 'Invalid ID parameter' });
            }
            const [updated] = await Endereco.update(req.body, {
              where: { id: id }
            });
            if (updated) {
              const updatedEndereco = await Endereco.findOne({ where: { id: id } });
              return res.status(200).json(updatedEndereco);
            }
            return res.status(404).json({ error: 'Endereco not found' });
          } catch (error) {
            return res.status(400).json({ error: 'Error updating Endereco', details: error.message });
          }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
              return res.status(400).json({ error: 'Invalid ID parameter' });
            }
            const deleted = await Endereco.destroy({
              where: { id: id }
            });
            if (deleted) {
              return res.status(200).json(deleted);
            }
            return res.status(404).json({ error: 'Endereco not found' });
          } catch (error) {
            return res.status(400).json({ error: 'Error deleting Endereco', details: error.message });
          }
    }
}