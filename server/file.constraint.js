const ALLOWED_MIMETYPES = ["image/jpeg", "image/png", "application/pdf"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".pdf"];

export const isValidMimeType = (mimetype) => {
  return ALLOWED_MIMETYPES.includes(mimetype);
};

export const isValidExtension = (extension) => {
  return ALLOWED_EXTENSIONS.includes(extension.toLowerCase());
};
