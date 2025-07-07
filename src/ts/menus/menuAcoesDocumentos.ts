import Menu from "../interfaces/menu";

export default class MenuAcoesDocumentos implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual ação deseja tomar? `)
        console.log(`----------------------`)
        console.log(`| 1 - Cadastrar documento`)
        console.log(`| 2 - Editar um documento`)
        console.log(`| 3 - Excluir um documento`)
        console.log(`| 0 - Finalizar cadastro de documentos`)
        console.log(`----------------------`)
    }
}