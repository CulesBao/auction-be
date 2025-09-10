import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

import { DatabaseConfig } from './database-config.type';
export default registerAs<DatabaseConfig>('', () => {
    return {
        type: process.env.DATABASE_TYPE || 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'password',
        name: process.env.DATABASE_NAME || 'auction_db',
        port: process.env.DATABASE_PORT
            ? parseInt(process.env.DATABASE_PORT, 10)
            : 5432,
    };
});
