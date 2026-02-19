const { z } = require("zod");

const hashtagSchema = z
  .string()
  .min(2, "Hashtag is too short")
  .regex(/^#/, "Hashtag must start with #");

module.exports = {
  addSchema: z.object({
    title: z.string().nonempty("Missing title"),
    content: z.string().nonempty("Missing content"),
    hashtags: hashtagSchema.optional(),
  }),
  updateSchema: z.object({
    title: z.string().nonempty("Missing title"),
    content: z.string().nonempty("Missing content"),
  }),
  deletePhotoSchema: z.object({
    filename: z.string().nonempty("Missing filename")    
  })
};
