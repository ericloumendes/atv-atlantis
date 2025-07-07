import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import AcoesDocumentosCliente from "./acoesDocumentosCliente"
import CadastrarTelefoneCliente from "./cadastrarTelefoneCliente"
import CadastroEnderecoTitular from "./cadastroEnderecoTitular"
import SelecionarCliente from "./selecionarCliente"

export default class EditarCliente extends Processo {
    processar(): void {
        console.log('Iniciando o edição de um cliente...')
        let cliente_id = new SelecionarCliente().selecionar().toString()
        let cliente_index = Number.parseInt(cliente_id)
        
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        
        let armazem = Armazem.InstanciaUnica
        let cliente = armazem.Clientes[cliente_index]

        cliente.Nome = nome
        cliente.NomeSocial = nomeSocial
        cliente.DataNascimento = dataNascimento

        this.processo = new CadastroEnderecoTitular(cliente)
        this.processo.processar()

        this.processo = new AcoesDocumentosCliente(cliente)
        this.processo.processar()

        this.processo = new CadastrarTelefoneCliente(cliente)
        this.processo.processar()

        console.log('Finalizando o cadastro do cliente...')
    }
}