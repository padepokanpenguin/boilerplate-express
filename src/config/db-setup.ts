
import config from './config';
import path from 'path';
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Dialect } from "sequelize";

const NAMESPACE: string = "DATABASE";

interface DatabaseConnectionSetup {
    "database": string,
    "username": string,
    "password": string,
    "host": string,
    "dialect": Dialect,
    "port": number,
    "path": Array<string>
}

export class DatabaseDriver {

    private configuration: DatabaseConnectionSetup;

    public constructor( setup: DatabaseConnectionSetup) {
        this.configuration = setup;
    }

    public authenticate(): any {
        let connection: any = null;

                console.log(`Connection to ${this.configuration.database} is initializing...`);

                let sequelize: Sequelize;
                let sequelizeOption: SequelizeOptions = {
                    "host": this.configuration.host,
                    "dialect": this.configuration.dialect,
                    "port": this.configuration.port,
                    "logging": false,
                    "models": this.configuration.path,
                    "timezone": "Asia/Jakarta",
                };

                if (this.configuration.dialect === 'postgres') {
                    sequelizeOption.dialectOptions = {
                        "trustServerCertificate": true,
                        "trustedConnection": true,
                        "encrypt": true,
                        useUTC: false,
                    }
                    if (this.configuration.dialect == "postgres") {
                        Object.assign(sequelizeOption.dialectOptions, {
                            ssl: {
                                require: true, // This will help you. But you will see nwe error
                                rejectUnauthorized: false // This line will fix new error
                            }
                        })
                    }
                }

                sequelize = new Sequelize(
                    this.configuration.database,
                    this.configuration.username,
                    this.configuration.password,
                    sequelizeOption
                );

                console.info(`Connection to ${this.configuration.database} is connecting...`);

                sequelize
                    .authenticate()
                    .then(async () => {
                        console.info(` Connection to ${this.configuration.database} has been established.`);
                    })
                    .catch(error => {
                        console.error(` Connection to ${this.configuration.database} cannot be establish: ${error}`);
                    });

                connection = sequelize;

        return connection;
    }
}


export const DatabaseConnectionSetup = (connection: string = "main"): any => {
    type DatabaseConnectionObject = keyof typeof config.database;
    const selection = connection as DatabaseConnectionObject;

    if (!config.database[selection].enable) {
        throw new Error(`WARNING: Connection ${connection} is not enabled!`);
    }

    return new DatabaseDriver(
        {
            "database": config.database[selection].database as string,
            "username": config.database[selection].username as string,
            "password": config.database[selection].password as string,
            "host": config.database[selection].uri as string,
            "port": config.database[selection].port as number,
            "dialect": config.database[selection].dialect as Dialect,
            "path": config.database[selection].path as Array<string>
        }
    ).authenticate();
}

