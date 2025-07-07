import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import Hospedagem from "../modelos/hospedagem"
import SelecionarHospedagem from "./selecionarHospedagem"

export default class ExcluirHospedagem extends Processo {
    processar(): void {
        console.log('Iniciando a exclsão de uma hospedagem...')
        let armazem = Armazem.InstanciaUnica
        let hospedagem_id = new SelecionarHospedagem().selecionar().toString()
        let hospedagem_index = Number.parseInt(hospedagem_id)
        
        let hospedagem_removida = armazem.Hospedagens.splice(hospedagem_index, 1)

        console.log('Finalizando a exclusão de um documento...')
    }
}