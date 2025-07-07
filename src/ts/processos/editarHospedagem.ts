import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import Hospedagem from "../modelos/hospedagem"
import SelecionarAcomodacao from "./selecionarAcomodacao"
import SelecionarCliente from "./selecionarCliente"
import SelecionarHospedagem from "./selecionarHospedagem"

export default class EditarHospedagem extends Processo {
    processar(): void {
        console.log('Iniciando o edição de uma hospedagem...')

        let hospedagem_id = new SelecionarHospedagem().selecionar().toString()
        let hospedagem_index = Number.parseInt(hospedagem_id)

        let armazem = Armazem.InstanciaUnica

        let dataEntrada = this.entrada.receberData('Qual a data de entrada?')
        let dataSaida = this.entrada.receberData('Qual a data de saída?')
        let acomodacao = new SelecionarAcomodacao().selecionar()
        let clientes = []
        while (true) {
            let select_cliente_id = new SelecionarCliente().selecionar().toString()
            clientes.push(armazem.Clientes[parseInt(select_cliente_id)])

            let continuar = this.entrada.receberTexto('Deseja cadastrar mais clientes? (S/N)').toUpperCase()
            if (continuar != 'S') {
                break
            }
        }

        let hospedagem = new Hospedagem(clientes, acomodacao, dataEntrada, dataSaida)

        armazem.Hospedagens[hospedagem_index] = hospedagem

        console.log('Finalizando o edição da hospedagem...')
    }
}