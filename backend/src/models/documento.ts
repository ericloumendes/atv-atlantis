import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Cliente } from "./cliente";

@Table({
    tableName: 'Documento',
    timestamps: false
})
export class Documento extends Model {
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
    numero!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    tipo!: String;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    dataExpedicao!: Date;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    clienteId!: number;

    @BelongsTo(() => Cliente)
    cliente!: Cliente;
}
