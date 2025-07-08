import { NomeAcomadacao } from "../enumeradores/tipoAcomidacao"

export default interface Acomodacao {
    id: number,
    nomeAcomadacao: NomeAcomadacao
    camaSolteiro: Number
    camaCasal: Number
    suite: Number
    climatizacao: Boolean
    garagem: Number
}