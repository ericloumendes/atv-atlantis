import { Router } from 'express'
import { clienteController } from '../controllers/clienteController';

const router = Router();


// Pegar clientes
router.get('/', clienteController.show)

// Inserir clientes
router.post('/', clienteController.save)

// // Editar cliente
router.put('/:id', clienteController.edit)

// // Excluir cliente
router.delete('/:id', clienteController.delete)

export default router;