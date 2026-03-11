import { useRegisterSchema } from "./register.schema";
import z from "zod"
export function useSubscriptionSchema() {
  const registerSchema = useRegisterSchema();

  const subscriptionSchema = registerSchema.pick({
    email: true,
  });

  return subscriptionSchema;
}


export type SubscriptionField =z.infer<ReturnType< typeof useSubscriptionSchema>> 