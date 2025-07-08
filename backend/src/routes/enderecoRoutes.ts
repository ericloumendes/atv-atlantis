import { Router } from 'express'
import { enderecoController } from '../controllers/enderecoController';

const router = Router();


// Pegar clientes
router.get('/', enderecoController.show)

// Inserir clientes
router.post('/', enderecoController.save)

// // Editar cliente
router.put('/:id', enderecoController.edit)

// // Excluir cliente
router.delete('/:id', enderecoController.delete)

export default router;