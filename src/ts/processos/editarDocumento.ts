import Processo from "../abstracoes/processo"
import Cliente from "../modelos/cliente"
import Documento from "../modelos/documento"
import SelecionarDocumento from "./selecionarDocumento"

export default class EditarDocumento extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.log('Iniciando o edição de um documento...')
        let docummento_id = new SelecionarDocumento(this.cliente.Documentos).selecionar().toString()
        let documento_index = Number.parseInt(docummento_id)
        
        let numero = this.entrada.receberTexto('Qual o número do documento?')
        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
        let documento = new Documento(numero, this.cliente.Documentos[documento_index].Tipo, dataExpedicao)

        this.cliente.Documentos[documento_index] = documento

        console.log('Finalizando o edição do documento...')
    }
}