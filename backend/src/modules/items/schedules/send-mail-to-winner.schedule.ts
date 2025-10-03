import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SendMailToWinnerCommand } from "../cqrs/commands/implements/send-mail-to-winner.command";

@Injectable()
export class SendMailToWinnerSchedule {
    constructor(private readonly commandBus: CommandBus) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        await this.commandBus.execute(new SendMailToWinnerCommand())
    }

}