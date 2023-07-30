import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .max(256, { message: "Tiêu đề không thể quá 256 ký tự" })
    .min(3, { message: "Tiêu đề không thể quá ngắn" }),
  content: z.any(),
  image: z.string().optional().nullish(),
  readMinute: z
    .number()
    .lte(120, { message: "Số không được lớn hơn 120" })
    .gte(2, { message: "Số không được nhỏ hơn 2" }),
  description: z
    .string()
    .max(256, { message: "Mô tả không thể quá 256 ký tự" })
    .optional()
    .nullish(),
});

export type PostValidatorType = z.infer<typeof PostValidator>;
