import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SendMailWithTemplate } from "../implements/send-mail-with-template.query";
import { MailerService } from "@nestjs-modules/mailer";

@QueryHandler(SendMailWithTemplate)
export class SendMailWithTemplateQueryHandler implements IQueryHandler<SendMailWithTemplate> {
    constructor(private readonly mailerService: MailerService) { }

    async execute(query: SendMailWithTemplate): Promise<void> {
        const { to, subject, templateFilePath, data } = query;

        await this.mailerService.sendMail({
            to,
            subject,
            template: templateFilePath,
            context: data,
        });
    }
}