import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Cliente } from "./cliente";

@Table({
    tableName: 'Telefone',
    timestamps: false
})
export class Telefone extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    ddd!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    numero!: string;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    clienteId!: number;

    @BelongsTo(() => Cliente)
    cliente!: Cliente;
}
