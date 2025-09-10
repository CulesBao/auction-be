import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database-config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService<DatabaseConfig>) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: this.configService.get('type', { infer: true }),
            host: this.configService.get('host', { infer: true }),
            port: this.configService.get('port', { infer: true }),
            username: this.configService.get('username', { infer: true }),
            password: this.configService.get('password', { infer: true }),
            database: this.configService.get('name', { infer: true }),
            logging: true,
            entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        } as TypeOrmModuleOptions;
    }
}
