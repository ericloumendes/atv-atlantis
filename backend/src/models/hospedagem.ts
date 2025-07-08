import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Acomodacao } from "./acomodacoes";
import { Cliente } from "./cliente";

// Junction table model
@Table({
    tableName: 'Hospedagem',
    timestamps: false
})
export class Hospedagem extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @ForeignKey(() => Acomodacao)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    acomodacaoId!: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    dataEntrada!: Date;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    dataSaida!: Date;

    // Relationships
    @BelongsToMany(() => Cliente, () => ClienteHospedagem)
    clientes!: Cliente[];

    @BelongsTo(() => Acomodacao)
    acomodacao!: Acomodacao;
}

// Junction table for Cliente and Hospedagem
@Table({
    tableName: 'ClienteHospedagem',
    timestamps: false
})

export class ClienteHospedagem extends Model {
    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    clienteId!: number;

    @ForeignKey(() => Hospedagem)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    hospedagemId!: number;
}
