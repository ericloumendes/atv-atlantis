import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Telefone } from "./telefone";
import { Documento } from "./documento";
import { Endereco } from "./endereco";
import { ClienteHospedagem, Hospedagem } from "./hospedagem";

@Table({
    tableName: 'Cliente',
    timestamps: false
})
export class Cliente extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    nome!: string;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    nomeSocial!: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    dataNascimento!: Date;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    dataCadastro!: Date;

    @HasMany(() => Telefone)
    telefones!: Telefone[];

    @HasMany(() => Documento)
    documentos!: Documento[];

    @HasOne(() => Endereco)
    enderecos!: Endereco;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    titularId!: number

    @BelongsToMany(() => Hospedagem, () => ClienteHospedagem)
    hospedagens!: Hospedagem[];
}
