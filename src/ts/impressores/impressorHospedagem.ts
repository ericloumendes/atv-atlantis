import Impressor from "../interfaces/impressor";
import Acomodacao from "../modelos/acomodacao";
import Hospedagem from "../modelos/hospedagem";

export default class ImpressorHospedagem implements Impressor {
    private hospedagem: Hospedagem
    constructor(hospedagem: Hospedagem) {
        this.hospedagem = hospedagem
    }
    imprimir(): string {
        let descricao = `Acomodação: ${this.hospedagem.Acomodacao.NomeAcomadacao.toString()}\n`
            + `-- Data entrada: ${this.hospedagem.DataEntrada.toLocaleDateString()}\n`
            + `-- Data saída: ${this.hospedagem.DataSaida.toLocaleDateString()}\n`
            + `-- Clientes:\n`
            + this.hospedagem.Clientes.map(cliente => `- ${cliente.Nome}\n`).join('')
        return descricao
    }
}