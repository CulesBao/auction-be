import { Module } from "@nestjs/common";
import { PdfConfigService } from "shared/services/pdf-config.service";
import { CreatePdfQueryHandler } from "./cqrs/queries/handlers/create-pdf.query.handler";

const queries = [CreatePdfQueryHandler];

@Module({
  controllers: [],
  providers: [PdfConfigService, ...queries],
  exports: [...queries],
})
export class PdfModule {}
