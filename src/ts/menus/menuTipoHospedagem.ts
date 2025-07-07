import Menu from "../interfaces/menu";

export default class MenuTipoHospedagem implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Listagem de hospedagens: `)
        console.log(`----------------------`)
        console.log(`| 1 - Listar todas as hospedagens `)
        console.log(`| 2 - Listar hospedagens de um usuário`)
        console.log(`----------------------`)
        console.log(`| 0 - Voltar`)
        console.log(`----------------------`)
    }
}