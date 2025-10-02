import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { MailConfigService } from './mail-config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerConfigService {
    constructor(private readonly mailConfigService: MailConfigService) { }

    mailerConfig(): MailerOptions {
        return {
            transport: {
                host: this.mailConfigService.mailHost,
                port: this.mailConfigService.mailPort,
                secure: true,
                auth: {
                    user: this.mailConfigService.mailUser,
                    pass: this.mailConfigService.mailPass,
                }
            },
            defaults: {
                from: this.mailConfigService.mailFrom
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