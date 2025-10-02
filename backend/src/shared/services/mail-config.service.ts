import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailConfigService {
    constructor(private readonly configService: ConfigService) { }

    get mailHost(): string {
        return this.configService.get<string>("MAIL_HOST", "smtp.gmail.com");
    }

    get mailPort(): number {
        return this.configService.get<number>("MAIL_PORT", 465);
    }

    get mailUser(): string {
        return this.configService.get<string>("MAIL_USER", "");
    }

    get mailPass(): string {
        return this.configService.get<string>("MAIL_PASS", "");
    }

    get mailFrom(): string {
        return this.configService.get<string>("MAIL_FROM", '"No Reply" <no-reply@auction.com>');
    }
}