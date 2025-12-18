import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Injectable } from "@nestjs/common";
import { ApiConfigService } from "./api-config.service";
import { join } from "path";

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
          pass: this.apiConfigService.stmpConfig.pass,
        },
      },
      defaults: {
        from: `Auction App <${this.apiConfigService.stmpConfig.from}>`,
      },
      template: {
        dir: join(process.cwd(), "src", "templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
