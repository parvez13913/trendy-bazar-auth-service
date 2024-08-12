import { z } from "zod";
import { bloodGroup, gender } from "../../../enum/commonEnums";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: 'Last name is required',
      })
    }),
    gender: z.enum([...gender] as [string, ...string[]], { required_error: 'Gender is required', }),
    dateOfBirth: z.string({
      required_error: 'Date of birth is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }).email(),
    contactNo: z.string({
      required_error: 'Contact no is required',
    }),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string({
      required_error: 'Present address is required',
    }),
    permanentAddress: z.string({
      required_error: 'Permanent address is required',
    }),
    profileImage: z.string().optional(),
  }),
});



export const UserValidation = {
  createUserZodSchema,
};