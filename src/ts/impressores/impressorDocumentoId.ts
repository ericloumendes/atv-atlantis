import Impressor from "../interfaces/impressor";
import Documento from "../modelos/documento";

export default class ImpressorDocumentoId implements Impressor {
    private documento: Documento
    private id: number

    constructor(documento: Documento, id: number) {
        this.documento = documento
        this.id = id
    }

    imprimir(): string {
        let impressao = `****************************\n`
            + `| ID: ${this.id}\n`  
            + `| Tipo: ${this.documento.Tipo}\n`
            + `| Data expedição: ${this.documento.DataExpedicao.toLocaleDateString()}\n`
            + `| Número: ${this.documento.Numero}\n`
            + `****************************\n`
        return impressao
    }

}