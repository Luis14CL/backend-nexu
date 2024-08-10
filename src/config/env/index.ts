import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        MONGODB_URI: string;
        MONGODB_DB_MAIN: string;
    };
    secret: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://adminnexu:4qCmpnpkcYiHb5OD@cluster0.y8455.mongodb.net/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'nexu',
    },
    secret: process.env.SECRET || '@QEGTUI',
};


const config: {
    [name: string]: IConfig
} = {
    development
};

export default config[NODE_ENV];
