import Processo from "../abstracoes/processo"
import Cliente from "../modelos/cliente"
import Telefone from "../modelos/telefone"
import SelecionarTelefone from "./selecionarTelefone"

export default class EditarTelefone extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.log('Iniciando o edição de um telefone...')
        let telefone_id = new SelecionarTelefone(this.cliente.Telefones).selecionar().toString()
        let cliente_index = Number.parseInt(telefone_id)
        
        let ddd = this.entrada.receberTexto('Qual o DDD do telefone?')
        let numero = this.entrada.receberTexto('Qual o número do telefone?')
        let telefone = new Telefone(ddd, numero)
        
        this.cliente.Telefones[cliente_index] = telefone

        console.log('Finalizando o edição de telefone...')
    }
}