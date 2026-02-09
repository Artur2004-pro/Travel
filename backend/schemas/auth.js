const { z } = require("zod");
const {
  usernameSchema,
  passwordSchema,
  emailSchema,
  codeSchema,
} = require("./common.schema");
const isEmail = require("../validators/isEmail");

const signupSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
});

const loginSchema = z
  .object({
    username: z.string().trim().min(1, "Username or email is required"),
    password: z.string().trim().min(1, "Password is required"),
  })
  .transform((data) => {
    const isMail = isEmail(data.username);
    const key = isMail ? "email" : "username";

    return {
      password: data.password,
      [key]: data.username,
    };
  });

const verifyCodeSchema = z.object({
  code: codeSchema,
  email: emailSchema,
  password: passwordSchema,
});

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

const forgotPasswordUpdateSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  code: codeSchema,
});

const resendVerificationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

module.exports = {
  signupSchema,
  loginSchema,
  verifyCodeSchema,
  forgotPasswordSchema,
  forgotPasswordUpdateSchema,
  resendVerificationSchema,
};
