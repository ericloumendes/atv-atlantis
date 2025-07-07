import Processo from "../abstracoes/processo"
import MenuTipoHospedagem from "../menus/menuTipoHospedagem"
import ListagemHospedagens from "./listagemHospedagens"
import ListagemHospedagensClientes from "./listagemHospedagensClientes"

export default class TipoListagemHospedagem extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoHospedagem()
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o listagem de hospedagens...')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.processo = new ListagemHospedagens()
                    this.processo.processar()
                    this.entrada.receberTexto('Pressione qualquer tecla para continuar...')
                    break
                case 2:
                    this.processo = new ListagemHospedagensClientes()
                    this.processo.processar()
                    this.entrada.receberTexto('Pressione qualquer tecla para continuar...')
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