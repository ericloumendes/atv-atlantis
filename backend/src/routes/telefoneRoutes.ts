import { Router } from 'express'
import { telefoneController } from '../controllers/telefoneController';

const router = Router();


// Pegar clientes
router.get('/', telefoneController.show)

// Inserir clientes
router.post('/', telefoneController.save)

// // Editar cliente
router.put('/:id', telefoneController.edit)

// // Excluir cliente
router.delete('/:id', telefoneController.delete)

export default router;