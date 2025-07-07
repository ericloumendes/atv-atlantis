import Processo from "../abstracoes/processo"
import MenuTipoTelefone from "../menus/menuTipoTelefone"
import Cliente from "../modelos/cliente"
import CadastroTelefoneCliente from "./cadastroTelefoneCliente"
import EditarTelefone from "./editarTelefone"
import ExcluirTelefone from "./excluirTelefone"

export default class CadastrarTelefoneCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuTipoTelefone()
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de telefones...')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.processo = new CadastroTelefoneCliente(this.cliente)
                    this.processo.processar()
                    break
                case 2:
                    this.processo = new EditarTelefone(this.cliente)
                    this.processo.processar()
                    break
                case 3:
                    this.processo = new ExcluirTelefone(this.cliente)
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