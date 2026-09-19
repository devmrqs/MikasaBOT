import { z } from "zod";

const textBlockSchema = z.object({
  type: z.literal("text"),
  content: z.string().min(1).max(4000),
});

const separatorBlockSchema = z.object({
  type: z.literal("separator"),
});

const blockSchema = z.discriminatedUnion("type", [
  textBlockSchema,
  separatorBlockSchema,
]);

export const createMessageSchema = z.object({
  channelId: z.string().min(1),
  blocks: z.array(blockSchema).min(1).max(20),
  accentColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;
