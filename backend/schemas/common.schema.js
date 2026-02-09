const { z } = require("zod");

const usernameSchema = z.string();
const passwordSchema = z.string().min(6, "Password is busy");
const emailSchema = z.email("Invalid email");
const codeSchema = z.string().length(6, "Invalid code");
const idSchema = z.string().min(20, "Invalid Id");

module.exports = {
  usernameSchema,
  passwordSchema,
  emailSchema,
  codeSchema,
  idSchema,
};
