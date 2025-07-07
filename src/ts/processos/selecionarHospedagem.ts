import Armazem from "../dominio/armazem";
import ImpressorHospedagemId from "../impressores/impressorHospedagemId";
import Impressor from "../interfaces/impressor";
import Entrada from "../io/entrada";
import Hospedagem from "../modelos/hospedagem";

export default class SelecionarHospedagem {
    private hospedagem: Hospedagem[];
    private entrada: Entrada;
    private impressor !: Impressor;

    constructor() {
        this.hospedagem = Armazem.InstanciaUnica.Hospedagens
        this.entrada = new Entrada();
    }

    public selecionar(): Number {
        console.clear();
        console.log('Iniciando a listagem das hospedagens...');
        
        this.hospedagem.forEach((hospedagem, id) => {
            this.impressor = new ImpressorHospedagemId(hospedagem, id)
            console.log(this.impressor.imprimir())
        });

        // Recebe o ID do titular selecionado
        let id_selected = this.entrada.receberNumero('Qual o ID da hospedagem?');
        
        return id_selected;
    }
}