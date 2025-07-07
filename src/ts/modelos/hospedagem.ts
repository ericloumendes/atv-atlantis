import Acomodacao from "./acomodacao"
import Cliente from "./cliente"

export default class Hospedagem {
    private clientes: Cliente[]
    private acomodacao: Acomodacao
    private dataEntrada: Date
    private dataSaida: Date

    constructor(clientes: Cliente[], acomodacao: Acomodacao, dataEntrada: Date, dataSaida: Date) {
        this.clientes = clientes
        this.acomodacao = acomodacao
        this.dataEntrada = dataEntrada
        this.dataSaida = dataSaida
    }

    public get Clientes() { return this.clientes }
    public get Acomodacao() { return this.acomodacao }
    public get DataEntrada() { return this.dataEntrada }
    public get DataSaida() { return this.dataSaida }

    public set Cliente(clientes: Cliente[]) { this.clientes = clientes }
    public set Acomodacao(acomodacao: Acomodacao) { this.acomodacao = acomodacao }
    public set DataEntrada(dataEntrada: Date) { this.dataEntrada = dataEntrada }
    public set DataSaida(dataSaida: Date) { this.dataSaida = dataSaida }
}