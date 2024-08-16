import { z } from "zod";
import { bloodGroup, gender } from "../../../enum/commonEnums";

const createSellerZodSchema = z.object({
  password: z.string({
    required_error: 'Password is required',
  }),
  seller: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: 'Last name is required',
      })
    }),

    gender: z.enum([...gender] as [string, ...string[]],
      {
        required_error: 'Gender is required',
      }),

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
  }),
});



export const UserValidation = {
  createSellerZodSchema,
};