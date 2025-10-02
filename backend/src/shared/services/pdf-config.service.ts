import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PdfConfigService {
    constructor(private readonly configService: ConfigService) { }

    get pdfConfig() {
        return {
            format: this.configService.get<string>("PDF_FORMAT", "A4"),
            orientation: this.configService.get<string>("PDF_ORIENTATION", "portrait"),
            border: this.configService.get<string>("PDF_BORDER", "10mm"),
            header: {
                height: this.configService.get<string>("PDF_HEADER_HEIGHT", "20mm"),
            },
            footer: {
                height: this.configService.get<string>("PDF_FOOTER_HEIGHT", "20mm"),
            },
        }
    }
}
