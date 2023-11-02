"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const mongoose_1 = require("mongoose");
const userProfileSchema = new mongoose_1.Schema({
    dateOfBirth: { type: Date },
    image: { type: String },
    gender: { type: String, enum: ['male', 'female'] },
    nationality: { type: String },
    passport: {
        number: { type: String },
        expirationDate: { type: Date },
    },
    address: {
        state: { type: String },
        street: { type: String },
        zip: { type: String },
        coordinates: { lat: { type: Number }, lng: { type: Number } },
    },
    age: { type: Number },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.UserProfile = (0, mongoose_1.model)('UserProfile', userProfileSchema);
