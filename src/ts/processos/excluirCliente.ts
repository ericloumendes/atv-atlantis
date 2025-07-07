import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import Cliente from "../modelos/cliente"
import SelecionarCliente from "./selecionarCliente"

export default class ExlcuirCliente extends Processo {
    processar(): void {
        console.clear()
        console.log('Iniciando a exclusão de clientes...')
        let cliente_id = new SelecionarCliente().selecionar().toString()
        let cliente_index = Number.parseInt(cliente_id)
        let armazem = Armazem.InstanciaUnica
        let cliente_removido = armazem.Clientes.splice(cliente_index, 1)
        let id = 0
        if (!this.titular(cliente_removido[0])) {
            let cliente_titular = cliente_removido[0].Titular
            cliente_titular.Dependentes.forEach(e => {
                if (e == cliente_removido[0]) {
                    cliente_titular.Dependentes.splice(id, 1)
                    id += 1
                }
            })
        }
    }

    private titular(cliente: Cliente): boolean {
        // Retorna verdadeiro se o cliente for um titular
        return cliente.Titular == undefined;
    }
}