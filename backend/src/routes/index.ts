import { Router } from 'express';
import clienteRoutes from './clienteRoutes'
import telefoneRoutes from './telefoneRoutes'
import enderecoRoutes from './enderecoRoutes'
import documentoRoutes from './documentoRoutes'
import acomodacoesRoutes from './acomodacaoRoutes'
import hospedagemRoutes from './hospedagemRoutes'

const router = Router();

router.use('/cliente', clienteRoutes)
router.use('/telefone', telefoneRoutes)
router.use('/endereco', enderecoRoutes)
router.use('/documento', documentoRoutes)
router.use('/acomodacoes', acomodacoesRoutes)
router.use('/hospedagem', hospedagemRoutes)

export default router