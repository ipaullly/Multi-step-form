import { z } from "zod";

export const validationSchema = z
  .object({
    title: z.string().min(1, { message: "title is required" }),
    description: z.string().optional(),
    tags: z.array(z.string()).nonempty({
      message: "Select at least one tag",
    }),
    assignee: z.string().min(1, { message: "Select an assignee" }),
    startDate: z.string().datetime({ message: "Please select start date." }),
    endDate: z.string().datetime({ message: "Please select end date." }),
    target: z
      .string()
      .min(1, { message: "Target is required" }),
      // .transform((val) => removeNonNumeric(val)),
  });

export type ValidationSchema = z.infer<typeof validationSchema>;

export interface FormComponentProps {
  tab: number;
  setTab: (args: number) => void;
}