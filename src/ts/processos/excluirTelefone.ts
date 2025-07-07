import Processo from "../abstracoes/processo"
import Cliente from "../modelos/cliente"
import Telefone from "../modelos/telefone"
import SelecionarTelefone from "./selecionarTelefone"

export default class ExcluirTelefone extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.log('Iniciando a exclusão de um telefone...')
        let telefone_id = new SelecionarTelefone(this.cliente.Telefones).selecionar().toString()
        let cliente_index = Number.parseInt(telefone_id)
        
        let telefone_removido = this.cliente.Telefones.splice(cliente_index, 1)

        console.log('Finalizando a exclusão de um telefone...')
    }
}