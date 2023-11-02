"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const coordinatesSchema = zod_1.z.object({
    lat: zod_1.z.number(),
    lng: zod_1.z.number(),
});
const addressSchema = zod_1.z.object({
    state: zod_1.z.string(),
    street: zod_1.z.string(),
    zip: zod_1.z.string(),
    coordinates: coordinatesSchema,
});
const profileUpdateValidation = zod_1.z.object({
    body: zod_1.z
        .object({
        dateOfBirth: zod_1.z.string().datetime().optional(),
        image: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        nationality: zod_1.z.string().optional(),
        passport: zod_1.z.object({
            number: zod_1.z.string(),
            expirationDate: zod_1.z.string().datetime()
        }).optional(),
        address: addressSchema.deepPartial(),
        age: zod_1.z.number().optional(),
        user: zod_1.z.string().optional(),
    })
        .catchall(zod_1.z
        .unknown()
        .refine(() => false, {
        message: 'Validation Failed: Invalid body data, please see api documentation',
    })),
});
exports.default = {
    profileUpdateValidation,
};
