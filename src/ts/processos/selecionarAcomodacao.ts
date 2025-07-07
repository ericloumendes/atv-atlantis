import Armazem from "../dominio/armazem";
import ImpressorAcomodacaoId from "../impressores/impressorAcomodacaoId";
import Impressor from "../interfaces/impressor";
import Entrada from "../io/entrada";
import Acomodacao from "../modelos/acomodacao";

export default class SelecionarAcomodacao {
    private acomodacoes: Acomodacao[];
    private entrada: Entrada;
    private impressor !: Impressor;

    constructor() {
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes;
        this.entrada = new Entrada();
    }

    public selecionar(): Acomodacao {
        console.clear();
        console.log('Iniciando a listagem das acomodações ofertadas...');
        
        this.acomodacoes.forEach((acomodacao, id) => {
            this.impressor = new ImpressorAcomodacaoId(acomodacao, id)
            console.log(this.impressor.imprimir())
        });

        let id_selected = this.entrada.receberNumero('Qual o ID da acomodação?');
        
        return this.acomodacoes[id_selected];
    }
}