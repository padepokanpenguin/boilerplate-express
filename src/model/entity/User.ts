import { DataTypes } from 'sequelize';
import { Column, Model, Sequelize, Table } from 'sequelize-typescript';

@Table({
    schema: 'public',
    tableName: 'users',
    timestamps: true,
    underscored: true,
})
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()")
    })
    id!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataTypes.DATE,
    })
    email_verified!: Date;

    @Column({
        type: DataTypes.BOOLEAN,
    })
    is_two_factor_enabled!: boolean;
}

export default User;
