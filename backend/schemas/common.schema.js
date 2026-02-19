const { z } = require("zod");

const usernameSchema = z.string();
const passwordSchema = z.string().min(6, "Password is busy");
const emailSchema = z.email("Invalid email");
const codeSchema = z.string().length(6, "Invalid code");
const idSchema = z.string().min(20, "Invalid Id");
const fileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  mimetype: z.string(),
  size: z.number().positive(),
  path: z.string(),
});

const multerFiles = z.object({
  files: z.array(fileSchema).min(1, "At least one image is required"),
});

const multerFile = z.object({
  file: fileSchema,
});

const id = z.object({
  id: idSchema,
});

module.exports = {
  usernameSchema,
  passwordSchema,
  emailSchema,
  codeSchema,
  idSchema,
  fileSchema,
  id,
  multerFiles,
  multerFile,
};
