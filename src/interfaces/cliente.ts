import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";

export default interface Cliente {
    id: number;
    nome: string
    nomeSocial: string
    dataNascimento: Date
    dataCadastro: Date
    telefones: Telefone[]
    endereco: Endereco
    documentos: Documento[]
    titular: number|null
}