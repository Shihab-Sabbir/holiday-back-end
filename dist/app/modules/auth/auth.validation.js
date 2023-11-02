"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createUserSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.object({
            firstName: zod_1.z.string().min(1, { message: 'First name is required' }),
            lastName: zod_1.z.string().min(1, { message: 'Last name is required' }),
        }),
        phone_number: zod_1.z.string().min(1, { message: 'Phone number is required' }),
        email: zod_1.z.string().email({ message: 'Valid email address is required' }),
        // dateOfBirth: z.string().datetime({ message: 'Date of birth is required' }),
        // image: z.string().optional(),
        // gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
        // nationality: z.string().min(1, { message: 'Nationality is required' }),
        // passport: z.object({
        //   number: z.string().optional(),
        //   expirationDate: z.string().datetime().optional(),
        // }).optional(),
        // role: z.enum(userRoleValues, { required_error: 'Valid user role is required' }), 
        password: zod_1.z.string().min(8, { message: 'Password must be at least 8 characters long' }),
        // address: z.object({
        //   state: z.string().min(1, { message: 'State is required' }),
        //   street: z.string().min(1, { message: 'Street address is required' }),
        //   zip: z.string().min(1, { message: 'ZIP code is required' }),
        //   coordinates: z.array(
        //     z.object({
        //       lat: z.number(),
        //       lng: z.number(),
        //     })
        //   ).optional(),
        // }),
        // age: z.number({ required_error: 'Age is required' }),
    })
        .catchall(zod_1.z
        .unknown()
        .refine(() => false, {
        message: 'Zod Validation Failed: Invalid body data, please see api documentation',
    })),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.default = {
    createUserSchema, loginZodSchema, refreshTokenZodSchema
};
