import Impressor from "../interfaces/impressor"
import Telefone from "../modelos/telefone"

export default class ImpressorTelefoneId implements Impressor {
    private telefone: Telefone
    private impressor!: Impressor
    private id: number

    constructor(telefone: Telefone, id: number) {
        this.telefone = telefone
        this.id = id
    }
    imprimir(): string {
        let impressao = `****************************\n`
            + `| ID: ${this.id}\n`        
            + `| Número: (${this.telefone.Ddd}) ${this.telefone.Numero}\n`
            
        impressao = impressao + `\n****************************`
        return impressao
    }

}