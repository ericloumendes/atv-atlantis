import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'Acomodacao',
    timestamps: false
})
export class Acomodacao extends Model {
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
    nomeAcomadacao!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    camaSolteiro!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    camaCasal!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    suite!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    climatizacao!: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    garagem!: number;
}
