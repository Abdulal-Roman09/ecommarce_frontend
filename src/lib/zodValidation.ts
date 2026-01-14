import { ZodObject } from "zod";

export const zodValidatior = <T>(payload: T, schema: ZodObject) => {
    const validatedPayload = schema.safeParse(payload);

    if (!validatedPayload.success) {
        const errors: Record<string, string> = {};

        validatedPayload.error.issues.forEach(issue => {
            const field = issue.path[0] as string;
            if (!errors[field]) {
                errors[field] = issue.message;
            }
        });

        return {
            success: false,
            message: null,
            errors,
        };
    }

    return {
        success: true,
        data: validatedPayload.data,
    };
};
