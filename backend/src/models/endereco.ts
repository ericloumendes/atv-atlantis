import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Cliente } from "./cliente";

@Table({
    tableName: 'Endereco',
    timestamps: false
})
export class Endereco extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    rua!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    bairro!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    cidade!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    estado!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    pais!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    codigoPostal!: string;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    clienteId!: number;

    @BelongsTo(() => Cliente)
    cliente!: Cliente;
}
