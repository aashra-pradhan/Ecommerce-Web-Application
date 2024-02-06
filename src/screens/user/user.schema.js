import React from "react";
import { object, string, number, date } from "yup";

export const SchemaSignUp = object({
  fullname: string().required(),
  email: string().email().required(),
  password: string().required().min(8),
  contactno: string().length(10),
});
