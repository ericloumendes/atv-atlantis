import Acomodacao from "./acomodacoes"
import Cliente from "./cliente"

export default interface Hospedagem {
    id: number
    clientes: Cliente[]
    acomodacao: Acomodacao
    dataEntrada: Date
    dataSaida: Date
}