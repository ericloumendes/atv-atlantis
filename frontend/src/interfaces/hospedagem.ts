import Acomodacao from "./acomodacoes"
import Cliente from "./cliente"

export default interface Hospedagem {
    id: number;
    dataEntrada: Date;
    dataSaida: Date;
    clientes: Cliente[];
    acomodacao: Acomodacao;
    acomodacaoId?: number;
}
