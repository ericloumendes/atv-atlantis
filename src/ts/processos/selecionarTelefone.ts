import Armazem from "../dominio/armazem";
import ImpressorTelefoneId from "../impressores/impressorTelefoneId";
import Impressor from "../interfaces/impressor";
import Entrada from "../io/entrada";
import Telefone from "../modelos/telefone";

export default class SelecionarTelefone {
    private telefones: Telefone[];
    private entrada: Entrada;
    private impressor !: Impressor;

    constructor(telefones: Telefone[]) {
        this.telefones = telefones
        this.entrada = new Entrada();
    }

    public selecionar(): Number {
        console.clear();
        console.log('Iniciando a listagem dos telefones...');
        
        // Exibe a lista de clientes titulares
        this.telefones.forEach((telefone, id) => {
            this.impressor = new ImpressorTelefoneId(telefone, id)
            console.log(this.impressor.imprimir())
        });

        // Recebe o ID do titular selecionado
        let id_selected = this.entrada.receberNumero('Qual o ID do telefone?');
        
        return id_selected;
    }
}
