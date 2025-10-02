import type { Provider } from "@nestjs/common";
import { Global, Module } from "@nestjs/common";

import { ApiConfigService } from "./services/api-config.service";
import { PdfConfigService } from "./services/pdf-config.service";
import { MailerConfigService } from "./services/mailer-config.service";

const providers: Provider[] = [ApiConfigService, PdfConfigService, MailerConfigService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule { }
