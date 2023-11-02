"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const service_interface_1 = require("./service.interface");
const serviceSchema = new mongoose_1.Schema({
    service: { type: String, enum: Object.values(service_interface_1.SERVICE_TYPE), required: true },
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String },
    startDate: { type: Date, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number },
    location: { type: String },
    time: { type: String },
    description: { type: String },
    country: { type: String, required: true },
    image: { type: String, default: null },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Service = (0, mongoose_1.model)('Service', serviceSchema);
