import { Request, Response } from 'express';
import { Acomodacao } from '../models/acomodacoes';

export const acomodacaoController = {
    show: async (req: Request, res: Response) => {
        try{
            const acomodacao = await Acomodacao.findAll();
            return res.status(200).json(acomodacao)
        } catch (error){
            return res.status(400).json({error: 'Error fetching acomodacao!', details: error.message})
        }
    }
}