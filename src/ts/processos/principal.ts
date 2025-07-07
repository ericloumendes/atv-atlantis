import Processo from "../abstracoes/processo"
import MenuPrincipal from "../menus/menuPricipal"
import CadastroHospedagem from "./cadastrarHospedagem"
import EditarCliente from "./editarCliente"
import EditarHospedagem from "./editarHospedagem"
import ExlcuirCliente from "./excluirCliente"
import ExcluirHospedagem from "./excluirHospedagem"
import ListagemAcomodacoes from "./listagemAcomodacoes"
import TipoCadastroCliente from "./tipoCadastroCliente"
import TipoListagemClientes from "./tipoListagemClientes"
import TipoListagemHospedagem from "./tipoListagemHospedagem"

export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }
    processar(): void {
        console.clear()
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente()
                this.processo.processar()
                break
            case 2:
                this.processo = new EditarCliente()
                this.processo.processar()
                break
            case 3:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            case 4:
                this.processo = new ExlcuirCliente()
                this.processo.processar()
                break
            case 5:
                this.processo = new ListagemAcomodacoes()
                this.processo.processar()
                this.entrada.receberTexto('Pressione qualquer tecla para continuar...')
                break
            case 6:
                this.processo = new CadastroHospedagem()
                this.processo.processar()
                break
            case 7:
                this.processo = new TipoListagemHospedagem()
                this.processo.processar()
                break
            case 8:
                this.processo = new EditarHospedagem()
                this.processo.processar()
                break
            case 9:
                this.processo = new ExcluirHospedagem()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
                break
        }
    }
}