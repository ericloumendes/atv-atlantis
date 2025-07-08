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
    enderecos: Endereco
    documentos: Documento[]
    titularId: number|null
}