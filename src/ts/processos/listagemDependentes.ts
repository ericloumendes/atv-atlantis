import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import SelecionarClienteTitular from "./selecionarClienteTitular";

export default class ListagemDependentes extends Processo {
    private clientes!: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
    }
    processar(): void {
        this.clientes = new SelecionarClienteTitular().selecionar().Dependentes
        console.clear()
        console.log('Iniciando a listagem dos clientes dependentes...')
        this.clientes.forEach(cliente => {
            if (!this.titular(cliente)) {
                this.impressor = new ImpressaorCliente(cliente)
                console.log(this.impressor.imprimir())
            }
        })
    }
    private titular(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular == undefined) {
            verificacao = true
        }
        return verificacao
    }
}