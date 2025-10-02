import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';

@Injectable()
export class MailerConfigService {
    constructor(private readonly apiConfigService: ApiConfigService) { }

    mailerConfig(): MailerOptions {
        return {
            transport: {
                host: this.apiConfigService.stmpConfig.host,
                port: this.apiConfigService.stmpConfig.port,
                secure: true,
                auth: {
                    user: this.apiConfigService.stmpConfig.user,
                    pass: this.apiConfigService.stmpConfig.pass
                }
            },
            defaults: {
                from: this.apiConfigService.stmpConfig.from,
            },
            template: {
                dir: path.join(__dirname, '../../templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            }
        }
    }
}