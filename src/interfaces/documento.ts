import { TipoDocumento } from "../enumeradores/tipoDocumento"

export default interface Documento {
    id: number
    numero: string
    tipo: TipoDocumento
    dataExpedicao: Date
}

export {}; // this makes the file a module
