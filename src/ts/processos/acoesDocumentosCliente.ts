import Processo from "../abstracoes/processo"
import MenuAcoesDocumentos from "../menus/menuAcoesDocumentos"
import MenuTipoTelefone from "../menus/menuTipoTelefone"
import Cliente from "../modelos/cliente"
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente"
import CadastroTelefoneCliente from "./cadastroTelefoneCliente"
import EditarDocumento from "./editarDocumento"
import EditarTelefone from "./editarTelefone"
import ExcluirDocumento from "./excluirDocumento"
import ExcluirTelefone from "./excluirTelefone"

export default class AcoesDocumentosCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuAcoesDocumentos()
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de documentos...')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.processo = new CadastrarDocumentosCliente(this.cliente)
                    this.processo.processar()
                    break
                case 2:
                    this.processo = new EditarDocumento(this.cliente)
                    this.processo.processar()
                    break
                case 3:
                    this.processo = new ExcluirDocumento(this.cliente)
                    this.processo.processar()
                    break
                case 0:
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}