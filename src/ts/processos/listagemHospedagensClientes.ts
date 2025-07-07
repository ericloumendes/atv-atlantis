import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import ImpressorHospedagem from "../impressores/impressorHospedagem"
import Impressor from "../interfaces/impressor"
import Hospedagem from "../modelos/hospedagem"
import SelecionarCliente from "./selecionarCliente"

export default class ListagemHospedagensClientes extends Processo {
    private hospedagens: Hospedagem[]
    private impressor!: Impressor
    constructor() {
        super()
        this.hospedagens = Armazem.InstanciaUnica.Hospedagens
    }
    processar(): void {
        console.clear()

        let cliente = new SelecionarCliente().selecionar().toString()
        this.hospedagens = Armazem.InstanciaUnica.Hospedagens.filter(hospedagem => hospedagem.Clientes.includes(Armazem.InstanciaUnica.Clientes[Number.parseInt(cliente)]))

        console.clear()

        console.log('Iniciando a listagem das hospedagens...')
        this.hospedagens.forEach(hospedagem => {
            this.impressor = new ImpressorHospedagem(hospedagem)
            console.log(this.impressor.imprimir())
        })
    }
}