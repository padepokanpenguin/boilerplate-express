import path from 'path';
import { Dialect } from 'sequelize';

export default {
    
    server: {
        hostname: process.env.SERVER_HOSTNAME ?? 'localhost',
        port: process.env.SERVER_PORT ?? 3000,
        app: process.env.APP_NAME ?? 'My App',
        env: process.env.APP_ENV ?? 'development'
    },

    database: {
        main: {
        "dialect": (process.env.DB_MAIN_CONNECTION ?? "postgres") as Dialect,
        "uri": process.env.DB_MAIN_HOSTNAME ?? "127.0.0.1",
        "port": parseInt(process.env.DB_MAIN_PORT ?? "1433"),
        "database": process.env.DB_MAIN_DATABASE ?? '',
        "username": process.env.DB_MAIN_USERNAME ?? 'sa',
        "password": process.env.DB_MAIN_PASSWORD ?? 'root',
        "orm_driver": process.env.DB_ORM_DRIVER ?? 'sequelize',
        "path": [
            path.join(__dirname, "../model/entity/public"),
        ],
        "enable": true,
        }
    }
}