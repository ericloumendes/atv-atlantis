import { Router } from 'express'
import { hospedagemController } from '../controllers/hospedagemController';

const router = Router();


// Pegar clientes
router.get('/', hospedagemController.show)

// Inserir clientes
router.post('/', hospedagemController.save)

// // Editar cliente
router.put('/:id', hospedagemController.edit)

// // Excluir cliente
router.delete('/:id', hospedagemController.delete)

export default router;