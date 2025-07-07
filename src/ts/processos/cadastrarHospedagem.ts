import { parse } from "path"
import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import Hospedagem from "../modelos/hospedagem"
import SelecionarAcomodacao from "./selecionarAcomodacao"
import SelecionarCliente from "./selecionarCliente"

export default class CadastroHospedagem extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de uma nova hospedagem...')

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

        armazem.Hospedagens.push(hospedagem)

        console.log('Finalizando o cadastro de hospedagem...')
    }
}