import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorClienteId from "../impressores/impressorClienteId";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import SelecionarClienteTitular from "./selecionarClienteTitular";

export default class AtrelarClienteTitular extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }
    processar(): void {
        this.cliente.Titular = new SelecionarClienteTitular().selecionar()
        let dependentes = this.cliente.Titular.Dependentes
        dependentes.push(this.cliente);
        this.cliente.Titular.Dependentes = dependentes;
    }
}