import Menu from "../interfaces/menu";

export default class MenuTipoTelefone implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual ação deseja tomar? `)
        console.log(`----------------------`)
        console.log(`| 1 - Cadastrar telefone`)
        console.log(`| 2 - Editar um telefone`)
        console.log(`| 3 - Excluir um telefone`)
        console.log(`| 0 - Finalizar cadastro de telefones`)
        console.log(`----------------------`)
    }
}