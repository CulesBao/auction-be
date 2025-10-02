import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CreatePdfQuery } from "../implements/create-pdf.query";
import { PdfConfigService } from "shared/services/pdf-config.service";
import fs from 'fs';
const pdf = require("pdf-creator-node");

@QueryHandler(CreatePdfQuery)
export class CreatePdfQueryHandler implements IQueryHandler<CreatePdfQuery> {
    constructor(
        private readonly pdfConfigService: PdfConfigService
    ) { }

    async execute(query: CreatePdfQuery): Promise<void> {
        const { htmlPath, data, outputPath } = query;

        const html = fs.readFileSync(htmlPath, 'utf8');

        const document = {
            html,
            data,
            path: outputPath,
            type: ''
        }

        try {
            pdf.create(document, this.pdfConfigService.pdfConfig);
        }
        catch (err) {
            throw err;
        }
    }
}