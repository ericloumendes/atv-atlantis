import { Router } from 'express'
import { acomodacaoController } from '../controllers/acomodacoesController';


const router = Router();


// Pegar clientes
router.get('/', acomodacaoController.show)

export default router;