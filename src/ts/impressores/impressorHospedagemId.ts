import Impressor from "../interfaces/impressor"
import Hospedagem from "../modelos/hospedagem"

export default class ImpressorHospedagemId implements Impressor {
    private hospedagem: Hospedagem
    private id: number
    constructor(hospedagem: Hospedagem, id: number) {
        this.hospedagem = hospedagem
        this.id = id
    }
    imprimir(): string {
        let descricao = `ID: ${this.id}\n`
            + `Acomodação: ${this.hospedagem.Acomodacao.NomeAcomadacao.toString()}\n`
            + `-- Data entrada: ${this.hospedagem.DataEntrada.toLocaleDateString()}\n`
            + `-- Data saída: ${this.hospedagem.DataSaida.toLocaleDateString()}\n`
            + `-- Clientes:\n`
            + this.hospedagem.Clientes.map(cliente => `- ${cliente.Nome}\n`).join('')
        return descricao
    }
}