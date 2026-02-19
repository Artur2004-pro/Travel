const { z } = require("zod");
const { passwordSchema, usernameSchema } = require("./common.schema");

const searchSchema = z.object({
  search: z.string().nonempty("Search text required"),
});

const updatePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
});

const updateUsernameSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

const uploadAvatarSchema = z.object({
  path: z.string().min(1, "File path is required"),
});

const defaultTripVisibilitySchema = z.object({
  defaultTripVisibility: z.enum(["public", "private"]),
});

module.exports = {
  updatePasswordSchema,
  updateUsernameSchema,
  uploadAvatarSchema,
  searchSchema,
  defaultTripVisibilitySchema
};
