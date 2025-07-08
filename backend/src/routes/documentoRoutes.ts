import { Router } from 'express'
import { documentoController } from '../controllers/documentoController';


const router = Router();


// Pegar clientes
router.get('/', documentoController.show)

// Inserir clientes
router.post('/', documentoController.save)

// // Editar cliente
router.put('/:id', documentoController.edit)

// // Excluir cliente
router.delete('/:id', documentoController.delete)

export default router;