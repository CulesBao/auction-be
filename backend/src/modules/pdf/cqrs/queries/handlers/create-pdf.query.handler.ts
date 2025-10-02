import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CreatePdfQuery } from "../implements/create-pdf.query";
import { PdfConfigService } from "shared/services/pdf-config.service";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
const pdf = require("pdf-creator-node");

@QueryHandler(CreatePdfQuery)
export class CreatePdfQueryHandler implements IQueryHandler<CreatePdfQuery> {
    constructor(
        private readonly pdfConfigService: PdfConfigService
    ) { }

    async execute(query: CreatePdfQuery): Promise<Buffer> {
        const { htmlPath, data } = query;
        const tmpName = `pdf-${uuidv4()}.pdf`;
        const outputPath = path.join(process.cwd(), '/tmp/', tmpName);

        const html = fs.readFileSync(htmlPath, 'utf8');

        const document = {
            html,
            data,
            path: outputPath,
            type: ''
        }

        try {
            await pdf.create(document, this.pdfConfigService.pdfConfig);

            const buffer = await fs.promises.readFile(outputPath);

            await fs.promises.unlink(outputPath);

            return buffer;
        }
        catch (err) {
            throw err;
        }
    }
}