import { Uuid } from "common/types";

export class GetWinningBidsByUserIdExportPdfQuery {
    constructor(public readonly userId: Uuid) { }
}