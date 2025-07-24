import z from "zod";

export const taskSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2,{
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters.",
    }),
    email: z.email(),
    img_url: z.string().optional().nullable(),
    created_at: z.string().optional(),

})