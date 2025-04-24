import z from "zod";

//User
export const SignupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email().min(7),
  password: z.string().min(3),
});

export const SigninSchema = z.object({
  email: z.string().email().min(7),
  password: z.string().min(3),
});

//Zap
export const CreateZapSchema = z.object({
  // userId: z.string(),
  availabletriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});
