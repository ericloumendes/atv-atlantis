import Armazem from "../dominio/armazem";
import ImpressorDocumentoId from "../impressores/impressorDocumentoId";
import ImpressorTelefoneId from "../impressores/impressorTelefoneId";
import Impressor from "../interfaces/impressor";
import Entrada from "../io/entrada";
import Documento from "../modelos/documento";
import Telefone from "../modelos/telefone";

export default class SelecionarDocumento {
    private documentos: Documento[];
    private entrada: Entrada;
    private impressor !: Impressor;

    constructor(documentos: Documento[]) {
        this.documentos = documentos
        this.entrada = new Entrada();
    }

    public selecionar(): Number {
        console.clear();
        console.log('Iniciando a listagem dos documentos...');
        
        // Exibe a lista de clientes titulares
        this.documentos.forEach((documento, id) => {
            this.impressor = new ImpressorDocumentoId(documento, id)
            console.log(this.impressor.imprimir())
        });

        // Recebe o ID do titular selecionado
        let id_selected = this.entrada.receberNumero('Qual o ID do documento?');
        
        return id_selected;
    }
}
