import Processo from "../abstracoes/processo"
import Cliente from "../modelos/cliente"
import Telefone from "../modelos/telefone"
import SelecionarDocumento from "./selecionarDocumento"
import SelecionarTelefone from "./selecionarTelefone"

export default class ExcluirDocumento extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.log('Iniciando a exclsão de um documento...')
        let documento_id = new SelecionarDocumento(this.cliente.Documentos).selecionar().toString()
        let cliente_index = Number.parseInt(documento_id)
        
        let telefone_removido = this.cliente.Documentos.splice(cliente_index, 1)

        console.log('Finalizando a exclusão de um documento...')
    }
}