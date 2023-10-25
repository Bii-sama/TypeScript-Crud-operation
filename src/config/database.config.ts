import { Sequelize } from "sequelize";

const db = new Sequelize('app', '', '',{
    storage: './notes.sqlite',
    dialect: 'sqlite',
    logging: true
})

export default db