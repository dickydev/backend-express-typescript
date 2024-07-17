import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

export interface UserAttributes {
    id: number;
    username: string;
    password: string;
    role: 'KARYAWAN' | 'ADMIN' | 'SUPER ADMIN';
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public role!: 'KARYAWAN' | 'ADMIN' | 'SUPER ADMIN';
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('KARYAWAN', 'ADMIN', 'SUPER ADMIN'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'mst_user',
    }
);

export default User;
