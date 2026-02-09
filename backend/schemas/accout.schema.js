const { z } = require("zod");
const { idSchema, passwordSchema, usernameSchema } = require("./common.schema");

const configureAccountSchema = z.object({
  id: idSchema,
});

const searchSchema = z.object({
  search: z.string().nonempty("Search text required"),
});

const getSpecAccountSchema = z.object({
  id: idSchema,
});

const roleSchema = z.object({
  id: idSchema,
});

const updatePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
});

const updateUsername = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

const uploadAvatarSchema = z
  .object({
    path: z.string().min(1, "File path is required"),
  })
  .transform((data) => ({
    ...data,
    filePath: data.path,
  }));


// module.exports = 