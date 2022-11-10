import { Sequelize } from "sequelize";

const db = new Sequelize("dispatch_db", "postgres", "1234", {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
});

export const dbTest = new Sequelize("dispatch_db_test", "postgres", "1234", {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
});

export default process.env.NODE_ENV === 'test' ? dbTest : db;



