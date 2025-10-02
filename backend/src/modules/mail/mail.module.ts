import { Module } from '@nestjs/common';
import { SendMailWithTemplateQueryHandler } from './cqrs/queries/handlers/send-mail-with-template.query.handler';

const queryHandlers = [SendMailWithTemplateQueryHandler];

@Module({
  controllers: [],
  providers: [...queryHandlers],
  exports: [...queryHandlers],
})
export class MailModule { }
