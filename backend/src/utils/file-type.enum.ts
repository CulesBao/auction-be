export enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  PDF = "pdf",
  OTHER = "other",
}
export function getFileType(fileName: string): FileType {
  const extension = fileName.toLowerCase().split(".").pop();

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"];

  if (imageExtensions.includes(extension || "")) {
    return FileType.IMAGE;
  }

  if (videoExtensions.includes(extension || "")) {
    return FileType.VIDEO;
  }

  if (extension === "pdf") {
    return FileType.PDF;
  }

  return FileType.OTHER;
}
