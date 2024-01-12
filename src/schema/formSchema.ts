import { z } from "zod";

export const validationSchema = z
  .object({
    title: z.string().min(1, { message: "title is required" }),
    description: z.string().optional(),
    tags: z.array(z.string()),
    assignee: z.string().min(1, { message: "Select one tag" }),
    startDate: z.date(),
    endDate: z.date(),
    target: z.number(),
  });

export type ValidationSchema = z.infer<typeof validationSchema>;

export interface FormComponentProps {
  tab: number;
  setTab: (args: number) => void;
}