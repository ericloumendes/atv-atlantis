import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";
import Entrada from "../io/entrada";
import ImpressorClienteId from "../impressores/impressorClienteId";
import Impressor from "../interfaces/impressor";

export default class SelecionarClienteTitular {
    private clientes: Cliente[];
    private entrada: Entrada;
    private impressor !: Impressor;

    constructor() {
        this.clientes = Armazem.InstanciaUnica.Clientes;
        this.entrada = new Entrada();
    }

    public selecionar(): Cliente {
        console.clear();
        console.log('Iniciando a listagem dos clientes titulares...');
        
        // Exibe a lista de clientes titulares
        this.clientes.forEach((cliente, id) => {
            if (this.titular(cliente)) {
                this.impressor = new ImpressorClienteId(cliente, id)
                console.log(this.impressor.imprimir())
            }
        });

        // Recebe o ID do titular selecionado
        let id_selected = this.entrada.receberNumero('Qual o ID do titular?');
        
        return this.clientes[id_selected];
    }

    private titular(cliente: Cliente): boolean {
        // Retorna verdadeiro se o cliente for um titular
        return cliente.Titular == undefined;
    }
}
