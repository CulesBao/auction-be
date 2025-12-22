import { Uuid } from "common/types";

export interface MediaAdapterInterface {
  getPresignedUrl(request: {
    bucket: string;
    userId: Uuid;
    fileName: string;
  }): Promise<{
    userId: Uuid;
    fileName: string;
    expiredAt: Date;
    presignedUrl: string;
  }>;
}
