import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import ImpressorDocumentos from "./impressorDocumentos";
import ImpressorEndereco from "./impressorEndereco";

export default class ImpressorClienteId implements Impressor {
    private cliente: Cliente
    private impressor!: Impressor
    private id: number

    constructor(cliente: Cliente, id: number) {
        this.cliente = cliente
        this.id = id
    }

    imprimir(): string {
        let impressao = `****************************\n`
            + `| ID: ${this.id}\n`        
            + `| Nome: ${this.cliente.Nome}\n`
            + `| Nome social: ${this.cliente.NomeSocial}\n`
            + `| Data de nascimento: ${this.cliente.DataNascimento.toLocaleDateString()}\n`
            + `| Data de cadastro: ${this.cliente.DataCadastro.toLocaleDateString()}`
            
        impressao = impressao + `\n****************************`
        return impressao
    }

}