import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db_tes', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

export default sequelize;