import { Request, Response } from 'express';
import { Documento } from '../models/documento';

export const documentoController = {
    show: async (req: Request, res: Response) => {
        try{
            const documento = await Documento.findAll();
            return res.status(200).json(documento)
        } catch (error){
            return res.status(400).json({error: 'Error fetching documento!', details: error.message})
        }
    },

    save: async (req: Request, res: Response) => {
        try{
            const documento = await Documento.create(req.body);
            return res.status(200).json({message: 'Documento criado com sucesso!', object: documento});
        } catch (error){
            return res.status(400).json({error: 'Error while creating documento!', details: error.message})
        }
    },

    edit: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
              return res.status(400).json({ error: 'Invalid ID parameter' });
            }
            const [updated] = await Documento.update(req.body, {
              where: { id: id }
            });
            if (updated) {
              const updatedDocumento = await Documento.findOne({ where: { id: id } });
              return res.status(200).json(updatedDocumento);
            }
            return res.status(404).json({ error: 'Documento not found' });
          } catch (error) {
            return res.status(400).json({ error: 'Error updating Documento', details: error.message });
          }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
              return res.status(400).json({ error: 'Invalid ID parameter' });
            }
            const deleted = await Documento.destroy({
              where: { id: id }
            });
            if (deleted) {
              return res.status(200).json(deleted);
            }
            return res.status(404).json({ error: 'Documento not found' });
          } catch (error) {
            return res.status(400).json({ error: 'Error deleting Documento', details: error.message });
          }
    }
}